const { Router } = require('express')
const router = Router()
const {getAllPoke, getPokeId, createPoke, deletePokemon} = require('../controllers/Pokemon')



router.get('/', getAllPoke)
router.get('/:id', getPokeId)

router.post('/', createPoke)

router.delete('/:id', deletePokemon)





module.exports = router
