// src/services/auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Inicializar Firebase Auth y Firestore
const auth = getAuth();
const db = getFirestore();

// Crear un nuevo usuario
export const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Puedes guardar información adicional del usuario en Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email
    });

    return user;
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
};

// Iniciar sesión de un usuario
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error iniciando sesión:", error);
    throw error;
  }
};
