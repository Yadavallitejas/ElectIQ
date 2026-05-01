import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * The initialized Firebase application instance.
 */
export const app = initializeApp(firebaseConfig);

/**
 * Firebase Authentication instance for managing users.
 */
export const auth = getAuth(app);

/**
 * Firestore Database instance for reading and writing data.
 */
export const db = getFirestore(app);

/**
 * Saves the analyzed document to the user's history collection.
 */
export const saveAnalysis = async (userId, inputText, result) => {
  if (!userId) throw new Error("User must be logged in to save history.");
  
  const scansRef = collection(db, `analyses/${userId}/scans`);
  const docRef = await addDoc(scansRef, {
    inputText: inputText.substring(0, 500),
    result: result,
    documentTitle: result.title || "Untitled Notice",
    createdAt: serverTimestamp()
  });
  
  return docRef.id;
};
