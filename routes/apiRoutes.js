const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const tableroController = require('../controllers/tableroController');
const listaController = require('../controllers/listaController');
const tarjetaController = require('../controllers/tarjetaController');

router.use(authMiddleware);

router.get('/tableros', tableroController.getTableros);
router.post('/tableros', tableroController.createTablero);
router.put('/tableros/:id', tableroController.updateTablero);
router.delete('/tableros/:id', tableroController.deleteTablero);

router.post('/tableros/:tableroId/listas', listaController.createLista);
router.put('/listas/:id', listaController.updateLista);
router.delete('/listas/:id', listaController.deleteLista);

router.post('/listas/:listaId/tarjetas', tarjetaController.createTarjeta);
router.put('/tarjetas/:id', tarjetaController.updateTarjeta);
router.delete('/tarjetas/:id', tarjetaController.deleteTarjeta);

module.exports = router;