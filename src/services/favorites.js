import { db } from '../firebase/config';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

export const addFavorite = async (userId, country) => {
  try {
    await setDoc(doc(db, 'users', userId, 'favorites', country.cca3), {
      name: country.name.common,
      flag: country.flags.png,
      code: country.cca3,
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
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};