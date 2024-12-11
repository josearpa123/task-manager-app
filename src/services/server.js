const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const cors = require("cors");

app.use(cors()); // Habilitar CORS
app.use(bodyParser.json()); // Para poder leer el cuerpo JSON

// Conexión a MongoDB
const uri = "mongodb://admin:admin123@localhost:27017"; // Cambia esto si tu URI de MongoDB es diferente
const client = new MongoClient(uri);

// Función para conectar a la base de datos
async function connectToDatabase() {
  try {
    await client.connect();  // Intentar la conexión sin verificar si ya está conectado
    return client.db("mongodb"); // Retorna la base de datos conectada
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    throw error;
  }
}

// Ruta de login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Usuario predefinido (ahora con contraseña hasheada)
  const predefinedUser = {
    email: "test@example.com",
    password: await bcrypt.hash("123456", 10)  // Contraseña "123456" hasheada
  };

  try {
    // Verificar si el correo corresponde al usuario predefinido
    if (email === predefinedUser.email) {
      const isPasswordValid = await bcrypt.compare(password, predefinedUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
      return res.status(200).json({ message: "Inicio de sesión exitoso", token: "predefined-user-token" });
    }

    // Conexión a la base de datos
    const database = await connectToDatabase();
    const users = database.collection("users");

    // Verificar usuario en la base de datos
    const user = await users.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso", token: "db-user-token" });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Ruta de registro
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validación de entradas
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Conexión a la base de datos
    const database = await connectToDatabase();
    const users = database.collection("users");

    // Verificar si el correo ya está registrado
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = {
      name,
      email,
      password: hashedPassword,
      created_at: new Date()
    };

    // Insertar el usuario en la colección
    const result = await users.insertOne(newUser);

    // Enviar respuesta exitosa
    res.status(201).json({ message: "Usuario registrado con éxito", userId: result.insertedId });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
});

// Configuración del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});