'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { createUserProfileDocument } from '@/lib/firebase/firestore';
import type { FirebaseUser } from '@/types';
import { Spinner } from '@/components/ui/spinner';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await createUserProfileDocument(user);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { user, loading };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
