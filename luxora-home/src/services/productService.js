import { collection, getDocs, getDoc, doc, query, where, orderBy, limit, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const PRODUCTS_COLLECTION = 'products';

export const productService = {
  /**
   * Fetch all products with optional filters
   */
  getProducts: async (filters = {}) => {
    try {
      let q = collection(db, PRODUCTS_COLLECTION);
      const constraints = [];

      if (filters.category) {
        constraints.push(where('category', '==', filters.category));
      }
      if (filters.isFeatured) {
        constraints.push(where('isFeatured', '==', true));
      }
      if (filters.isBestSeller) {
        constraints.push(where('isBestSeller', '==', true));
      }

      // Add constraints if they exist
      if (constraints.length > 0) {
        q = query(q, ...constraints);
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Fetch a single product by ID
   */
  getProductById: async (id) => {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  },

  /**
   * Fetch a single product by slug
   */
  getProductBySlug: async (slug) => {
    try {
      const q = query(collection(db, PRODUCTS_COLLECTION), where('slug', '==', slug), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data()
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      throw error;
    }
  }
};
