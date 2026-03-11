import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  Auth
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  onSnapshot, 
  query, 
  deleteDoc,
  Firestore,
  serverTimestamp,
  addDoc,
  getDocs,
  where,
  orderBy,
  limit
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Singleton pattern for Firebase initialization
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Link services to the initialized app to ensure they share the same registry
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

// Session functions
export const createSession = async (sessionData: any) => {
  const sessionsRef = collection(db, "sessions");
  await addDoc(sessionsRef, {
    ...sessionData,
    createdAt: serverTimestamp(),
    lastMessageAt: serverTimestamp()
  });
};

export const updateSession = async (sessionId: string, data: any) => {
  await updateDoc(doc(db, "sessions", sessionId), {
    ...data,
    lastMessageAt: serverTimestamp()
  });
};

export const getUserSessions = async (userId: string) => {
  const q = query(
    collection(db, "sessions"),
    where("userId", "==", userId),
    orderBy("lastMessageAt", "desc"),
    limit(20)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Message functions
export const saveMessage = async (sessionId: string, message: any) => {
  const messagesRef = collection(db, "sessions", sessionId, "messages");
  await addDoc(messagesRef, {
    ...message,
    createdAt: serverTimestamp()
  });
};

export const subscribeToMessages = (sessionId: string, callback: (messages: any[]) => void) => {
  const q = query(
    collection(db, "sessions", sessionId, "messages"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};

export { 
  onAuthStateChanged, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  onSnapshot, 
  query, 
  deleteDoc,
  serverTimestamp,
  addDoc,
  getDocs,
  where,
  orderBy,
  limit
};