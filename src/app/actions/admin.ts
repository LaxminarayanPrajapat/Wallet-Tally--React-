'use server';

import * as admin from 'firebase-admin';

/**
 * Initializes Firebase Admin SDK.
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
        const adminApp = getAdminApp();
        const adminDb = admin.firestore(adminApp);

        // 1. Cascade delete all Firestore subcollections + user doc
        const batch = adminDb.batch();
        const subcollections = ['transactions', 'categories', 'budgets', 'feedback'];

        for (const colName of subcollections) {
            const snap = await adminDb.collection('users').doc(userId).collection(colName).get();
            snap.docs.forEach(d => batch.delete(d.ref));
        }

        batch.delete(adminDb.collection('users').doc(userId));
        await batch.commit();

        // 2. Delete from Firebase Auth
        try {
            await admin.auth(adminApp).deleteUser(userId);
        } catch (authErr: any) {
            if (authErr.code !== 'auth/user-not-found') {
                console.error('[Admin] Auth deletion failed:', authErr.message);
            }
        }

        return { success: true };
    } catch (error: any) {
        console.error('[Admin] deleteUserCompletely failed:', error);
        return { success: false, error: error.message };
    }
}

