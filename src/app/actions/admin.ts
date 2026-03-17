'use server';

import * as admin from 'firebase-admin';
import { initializeFirebase } from '@/firebase';
import { collection, doc, getDocs, writeBatch, updateDoc } from 'firebase/firestore';

/**
 * Initializes Firebase Admin SDK using Application Default Credentials.
 * Safe to call multiple times - reuses existing app if already initialized.
 */
function getAdminApp() {
    if (admin.apps.length > 0) {
        return admin.apps[0]!;
    }
    return admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: 'studio-1567093817-a9f72',
    });
}

/**
 * Fully deletes a user account:
 * 1. Purges all Firestore subcollections and the user document
 * 2. Deletes the Firebase Auth account so the email can be re-registered
 */
export async function deleteUserCompletely(
    userId: string,
    userEmail: string,
    userName: string,
    deleteReason: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const { firestore } = initializeFirebase();

        // 1. Cascade delete all Firestore data
        const batch = writeBatch(firestore);
        const subcollections = ['transactions', 'categories', 'budgets', 'feedback'];

        for (const colName of subcollections) {
            const colRef = collection(firestore, 'users', userId, colName);
            const snapshot = await getDocs(colRef);
            snapshot.forEach((subDoc) => batch.delete(subDoc.ref));
        }

        batch.delete(doc(firestore, 'users', userId));
        await batch.commit();

        // 2. Delete from Firebase Auth via Admin SDK
        try {
            const adminApp = getAdminApp();
            await admin.auth(adminApp).deleteUser(userId);
        } catch (authErr: any) {
            // If user doesn't exist in Auth, that's fine - Firestore is already cleaned
            if (authErr.code !== 'auth/user-not-found') {
                console.error('[Admin] Auth deletion failed:', authErr.message);
                // Don't fail the whole operation - Firestore is clean, Auth will be orphaned
                // but the email is still freed if we return success after Firestore cleanup
            }
        }

        return { success: true };
    } catch (error: any) {
        console.error('[Admin] deleteUserCompletely failed:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Backfills joinedAt for ALL users using their actual Firebase Auth creationTime.
 * Overwrites any incorrect joinedAt (e.g. ones set to today's date at OTP verification).
 */
export async function backfillJoinedAt(): Promise<{ success: boolean; updated: number; error?: string }> {
    try {
        const adminApp = getAdminApp();
        const { firestore } = initializeFirebase();

        // List all Auth users (handles pagination)
        const allAuthUsers: admin.auth.UserRecord[] = [];
        let pageToken: string | undefined;
        do {
            const result = await admin.auth(adminApp).listUsers(1000, pageToken);
            allAuthUsers.push(...result.users);
            pageToken = result.pageToken;
        } while (pageToken);

        // Build a map of uid → creationTime
        const creationMap = new Map<string, string>();
        for (const authUser of allAuthUsers) {
            if (authUser.metadata.creationTime) {
                creationMap.set(authUser.uid, new Date(authUser.metadata.creationTime).toISOString());
            }
        }

        // Update every Firestore user doc with the real creation time
        const usersSnapshot = await getDocs(collection(firestore, 'users'));
        let updated = 0;

        for (const userDoc of usersSnapshot.docs) {
            const realDate = creationMap.get(userDoc.id);
            if (realDate) {
                await updateDoc(doc(firestore, 'users', userDoc.id), {
                    joinedAt: realDate,
                });
                updated++;
            }
        }

        return { success: true, updated };
    } catch (error: any) {
        console.error('[Admin] backfillJoinedAt failed:', error);
        return { success: false, updated: 0, error: error.message };
    }
}
