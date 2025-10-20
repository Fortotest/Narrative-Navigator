'use server';

import { doc, setDoc, getDoc, collection, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import type { FirebaseUser, WatchlistItem } from '@/types';
import { db } from './client';

export const createUserProfileDocument = async (user: FirebaseUser) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = user;
    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return userRef;
};

export const getWatchlist = async (userId: string): Promise<string[]> => {
  try {
    const watchlistCol = collection(db, 'users', userId, 'watchlist');
    const watchlistSnapshot = await getDocs(watchlistCol);
    return watchlistSnapshot.docs.map((doc) => doc.id);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return [];
  }
};

export const addToWatchlist = async (userId: string, coinId: string) => {
  const watchlistRef = doc(db, 'users', userId, 'watchlist', coinId);
  await setDoc(watchlistRef, { coinId, addedAt: serverTimestamp() });
};

export const removeFromWatchlist = async (userId: string, coinId:string) => {
  const watchlistRef = doc(db, 'users', userId, 'watchlist', coinId);
  await deleteDoc(watchlistRef);
}
