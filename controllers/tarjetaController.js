const { Tarjeta, Lista, Tablero } = require('../models');

exports.createTarjeta = async (req, res) => {
  try {
    const { listaId } = req.params;
    const { titulo, descripcion } = req.body;

    const lista = await Lista.findByPk(listaId);

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

    const tarjeta = await Tarjeta.create({
      titulo,
      descripcion,
      listaId
    });

    res.status(201).json(tarjeta);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tarjeta', detalle: error.message });
  }
};

exports.updateTarjeta = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    const tarjeta = await Tarjeta.findByPk(id, {
      include: {
        model: Lista
      }
    });

    if (!tarjeta) {
      return res.status(404).json({ error: 'Tarjeta no encontrada' });
    }

    const tablero = await Tablero.findOne({
      where: {
        id: tarjeta.Lista.tableroId,
        userId: req.user.id
      }
    });

    if (!tablero) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    tarjeta.titulo = titulo;
    tarjeta.descripcion = descripcion;
    await tarjeta.save();

    res.json(tarjeta);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tarjeta', detalle: error.message });
  }
};

exports.deleteTarjeta = async (req, res) => {
  try {
    const { id } = req.params;

    const tarjeta = await Tarjeta.findByPk(id, {
      include: {
        model: Lista
      }
    });

    if (!tarjeta) {
      return res.status(404).json({ error: 'Tarjeta no encontrada' });
    }

    const tablero = await Tablero.findOne({
      where: {
        id: tarjeta.Lista.tableroId,
        userId: req.user.id
      }
    });

    if (!tablero) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    await tarjeta.destroy();

    res.json({ message: 'Tarjeta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tarjeta', detalle: error.message });
  }
};