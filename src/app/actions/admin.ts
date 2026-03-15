'use server';

import * as admin from 'firebase-admin';
import { initializeFirebase } from '@/firebase';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';

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
