const { Router } = require('express')
const router = Router()

const { getTipo } = require('../controllers/Tipo.js')

router.get('/', getTipo)

module.exports = router
