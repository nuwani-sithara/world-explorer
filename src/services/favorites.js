import { db } from '../firebase/config';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { getCountryByCode } from './api'; // Import your API function

export const addFavorite = async (userId, countryCode) => {
  try {
    // We only store the country code in Firebase
    await setDoc(doc(db, 'users', userId, 'favorites', countryCode), {
      code: countryCode,
      addedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error adding favorite:", error);
    return false;
  }
};

export const removeFavorite = async (userId, countryCode) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'favorites', countryCode));
    return true;
  } catch (error) {
    console.error("Error removing favorite:", error);
    return false;
  }
};

export const getFavorites = async (userId) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users', userId, 'favorites'));
    return querySnapshot.docs.map(doc => doc.data().code); // Return array of country codes
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};