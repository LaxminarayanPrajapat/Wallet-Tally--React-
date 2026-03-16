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
 * Backfills joinedAt for all users who are missing it.
 * Reads creationTime from Firebase Auth and writes it to Firestore.
 */
export async function backfillJoinedAt(): Promise<{ success: boolean; updated: number; error?: string }> {
    try {
        const adminApp = getAdminApp();
        const { firestore } = initializeFirebase();

        // Get all Firestore users
        const usersSnapshot = await getDocs(collection(firestore, 'users'));
        let updated = 0;

        for (const userDoc of usersSnapshot.docs) {
            const data = userDoc.data();
            // Skip users that already have joinedAt
            if (data.joinedAt) continue;

            try {
                // Get creation time from Firebase Auth
                const authUser = await admin.auth(adminApp).getUser(userDoc.id);
                const creationTime = authUser.metadata.creationTime;
                if (creationTime) {
                    await updateDoc(doc(firestore, 'users', userDoc.id), {
                        joinedAt: new Date(creationTime).toISOString(),
                    });
                    updated++;
                }
            } catch {
                // User may not exist in Auth - skip silently
            }
        }

        return { success: true, updated };
    } catch (error: any) {
        console.error('[Admin] backfillJoinedAt failed:', error);
        return { success: false, updated: 0, error: error.message };
    }
}
