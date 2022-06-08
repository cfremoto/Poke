const axios = require('axios')
const { Tipo } = require('../db.js')

const getTipo = async (req, res) => {

    try {

        const api = await axios.get("https://pokeapi.co/api/v2/type")
        const typesApi = api.data.results.map(type => type.name)
        typesApi.forEach(type => {
            Tipo.findOrCreate({ where: { name: type } })
        })
        const allTypes = await Tipo.findAll()
        res.send(allTypes)

    } catch (error) {
        res.status(404).send({error: error})
    }

}

module.exports = {getTipo}
