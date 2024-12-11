const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(bodyParser.json());

// Configuración de JWT
const JWT_SECRET = "clave_secreta"; // Usa una clave secreta fuerte y guárdala en variables de entorno

// Conexión a MongoDB
const uri = "mongodb://admin:admin123@localhost:27017";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db("mongodb");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    throw error;
  }
}

// Middleware para verificar el token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Acceso denegado" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = user;
    next();
  });
}

// Ruta de login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const database = await connectToDatabase();
    const users = database.collection("users");

    const user = await users.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Ruta de registro
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const database = await connectToDatabase();
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      created_at: new Date(),
    };

    const result = await users.insertOne(newUser);

    res.status(201).json({ message: "Usuario registrado con éxito", userId: result.insertedId });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
});

// Ruta para obtener información del usuario autenticado
app.get("/user", authenticateToken, async (req, res) => {
  try {
    const database = await connectToDatabase();
    const users = database.collection("users");

    const user = await users.findOne({ _id: new ObjectId(req.user.userId) });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const { name, email } = user;
    res.status(200).json({ name, email });
  } catch (error) {
    console.error("Error al obtener información del usuario:", error);
    res.status(500).json({ message: "Error al obtener información del usuario" });
  }
});

// Configuración del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
