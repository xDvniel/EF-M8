const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const SECRET_KEY = 'clave_super_secreta_123';

const users = [];

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    const existe = users.find(u => u.username === username);

    if (existe) {
      return res.status(409).json({ error: 'Usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      username,
      password: hashedPassword
    });

    console.log('Usuarios:', users);

    res.status(201).json({ mensaje: 'Usuario registrado' });

  } catch (error) {
    res.status(500).json({ error: 'Error en registro' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: 'Error en login' });
  }
});

function verificarToken(req, res, next) {
  const auth = req.headers['authorization'];

  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido' });
  }
}

app.get('/perfil', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Acceso correcto',
    usuario: req.usuario
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});