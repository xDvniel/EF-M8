const { Lista, Tablero } = require('../models');

exports.createLista = async (req, res) => {
  try {
    const { tableroId } = req.params;
    const { nombre } = req.body;

    const tablero = await Tablero.findOne({
      where: {
        id: tableroId,
        userId: req.user.id
      }
    });

    if (!tablero) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }

    const lista = await Lista.create({
      nombre,
      tableroId
    });

    res.status(201).json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear lista', detalle: error.message });
  }
};

exports.updateLista = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const lista = await Lista.findByPk(id);

    if (!lista) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    const tablero = await Tablero.findOne({
      where: {
        id: lista.tableroId,
        userId: req.user.id
      }
    });

    if (!tablero) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    lista.nombre = nombre;
    await lista.save();

    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar lista', detalle: error.message });
  }
};

exports.deleteLista = async (req, res) => {
  try {
    const { id } = req.params;

    const lista = await Lista.findByPk(id);

    if (!lista) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    const tablero = await Tablero.findOne({
      where: {
        id: lista.tableroId,
        userId: req.user.id
      }
    });

    if (!tablero) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    await lista.destroy();

    res.json({ message: 'Lista eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar lista', detalle: error.message });
  }
};