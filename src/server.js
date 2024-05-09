// server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json()); // Soporte para JSON
app.use(express.urlencoded({ extended: true })); // Soporte para formularios

// Ejemplo de base de datos de usuarios en memoria (no para producción)
const users = [
  {
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10), // Cifrado de la contraseña
  },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).send('Usuario o contraseña incorrecta.');
  }

  // Comparar la contraseña ingresada con la almacenada (cifrada)
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send('Usuario o contraseña incorrecta.');
  }

  // Si es válido, puedes iniciar una sesión, devolver un token, etc.
  res.send('Inicio de sesión exitoso');
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
