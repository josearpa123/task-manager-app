// src/services/firebase.js

import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";  // Ruta al archivo de configuración

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Ahora puedes usar Firebase, como Firestore, Auth, etc.