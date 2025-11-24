const express = require('express');
const router = express.Router()
const bicicletasController = require('../controllers/bicicletasController')

// Lista todas las bicicletas
router.get('/', bicicletasController.index)

// Ruta para la creación de bicicletas
router.get('/new', bicicletasController.new)
router.post('/', bicicletasController.create)

// Muestra 1 bicicleta en base a su id
router.get('/:id', bicicletasController.show)

// Rutas para actualizar datos
router.get('/:id/edit', bicicletasController.edit)
router.put('/:id', bicicletasController.update)

// Ruta para eliminar
router.delete('/:id', bicicletasController.delete)

module.exports = router

