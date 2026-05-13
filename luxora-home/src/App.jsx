import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AppRouter from './routes/AppRouter';
import { auth, db } from './firebase/config';
import { useAuthStore } from './store/useAuthStore';
import { seedProductsToFirestore } from './utils/seedData';

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    // Seed mock data
    seedProductsToFirestore().catch(console.error);

    // Auth listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || userData.displayName,
              role: userData.role || 'customer',
              ...userData
            });
          } else {
            // Fallback if no firestore document
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              role: 'customer'
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
