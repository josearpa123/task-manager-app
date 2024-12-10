const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const cors = require("cors");

app.use(cors());  // Habilitar CORS
app.use(bodyParser.json());  // Para poder leer el cuerpo JSON

// Conexión a MongoDB
const uri = "mongodb://admin:admin123@localhost:27017"; // Cambia esto si tu URI de MongoDB es diferente
const client = new MongoClient(uri);

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación simple
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Conectar a MongoDB
    await client.connect();
    const database = client.db("mongodb"); // Nombre de la base de datos
    const users = database.collection("users"); // Nombre de la colección

    // Crear el usuario
    const newUser = { name, email, password: hashedPassword, created_at: new Date() };

    // Insertar el usuario en la colección
    const result = await users.insertOne(newUser);

    // Enviar respuesta exitosa
    res.status(201).json({ message: "Usuario registrado con éxito", userId: result.insertedId });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  } finally {
    await client.close();
  }
});

// Configuración del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
