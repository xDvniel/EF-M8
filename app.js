const express = require('express');
const { engine } = require('express-handlebars');
require('dotenv').config();

const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/', viewRoutes);

app.get('/', (req, res) => {
  res.send('KanbanPro API funcionando');
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor en http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar la BD:', error);
  });