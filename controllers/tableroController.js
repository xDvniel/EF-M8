const { Tablero, Lista, Tarjeta } = require('../models');

exports.getTableros = async (req, res) => {
  try {
    const tableros = await Tablero.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Lista,
          include: [Tarjeta]
        }
      ]
    });

    res.json(tableros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tableros', detalle: error.message });
  }
};

exports.createTablero = async (req, res) => {
  try {
    const { nombre } = req.body;

    const tablero = await Tablero.create({
      nombre,
      userId: req.user.id
    });

    res.status(201).json(tablero);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tablero', detalle: error.message });
  }
};

exports.updateTablero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const tablero = await Tablero.findOne({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!tablero) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }

    tablero.nombre = nombre;
    await tablero.save();

    res.json(tablero);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tablero', detalle: error.message });
  }
};

exports.deleteTablero = async (req, res) => {
  try {
    const { id } = req.params;

    const tablero = await Tablero.findOne({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!tablero) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }

    await tablero.destroy();

    res.json({ message: 'Tablero eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tablero', detalle: error.message });
  }
};