const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Pokemon = require('./Pokemon.js')
const Tipo = require('./Tipo.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemon', Pokemon)
router.use('/tipo', Tipo)


module.exports = router;
