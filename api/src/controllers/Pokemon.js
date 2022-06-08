const axios = require('axios')
const { Pokemon, Tipo } = require('../db.js')



const getPokeApi = async () => {
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")
    const subApiUrl = apiUrl.data.results.map(el => axios.get(el.url))
    let apiResponse = await axios.all(subApiUrl)
    let poke = apiResponse.map(el => el.data)
    let apiPokeInfo = poke.map(el => {
        return {
            id: el.id,
            nombre: el.name,
            vida: el.stats[0].base_stat,
            fuerza: el.stats[1].base_stat,
            defensa: el.stats[2].base_stat,
            velocidad: el.stats[5].base_stat,
            altura: el.height,
            peso: el.weight,
            imagen: el.sprites.other.dream_world.front_default,
            tipo: el.types.map(el => el.type.name)
        }
    })

    return apiPokeInfo
}

const getPokeDb = async () => {
    return await Pokemon.findAll({
        include: {
            model: Tipo,
            attributes: ['name'],
            through: {
                attributes: []
            },
        }
    })
}



const getAll = async () => {

    const api = await getPokeApi()
    const db = await getPokeDb()
    const totalPoke = [...api, ...db]
    return totalPoke
}

const getAllPoke = async (req, res) => {
    const {name} = req.query
    let allInfo = await getAll();

    if (name) {
        let filtrado = await allInfo.filter(el => el.nombre.toLowerCase().includes(name.toLowerCase()))
        filtrado.length
            ? res.status(200).send(filtrado)
            : res.status(404).send({info: 'No se encontro el poke'})
    } else {
        res.status(200).send(allInfo)
    }
}

const getPokeId = async (req, res) => {
    const { id } = req.params
    let allInfo = await getAll()

    if (id) {
        let filtrado = await allInfo.filter(el => el.id.toString() === id)
        filtrado.length
            ? res.status(200).send(filtrado)
            : res.status(404).send({info: 'No se encontro el poke'})
    }
}

const deletePokemon = async (req, res) =>{

    try {
        const { id } = req.params;
        const siSta = await Pokemon.findByPk(id)
        console.log(siSta)
    if (siSta) {
        await Pokemon.destroy({ where: id })
        return res.status(200).send({info: 'Borrado Correcto'})
    } else {
        res.status(404).send({info: 'Ese id no existe'})
    }

    } catch (error) {
        console.error(error)
    }

}

const createPoke = async (req, res) => {
    const {
        id,
        nombre,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        createInBd,
        tipo,
        imagen
    } = req.body

    const existe = await Pokemon.findOne({ where: { nombre: nombre } });
    if (existe) return res.json({ info: "El poke ya existe" });

    let pokeCreated = await Pokemon.create({
        nombre,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        imagen,
        createInBd,
    })

    let tipoDb = await Tipo.findAll({
        where: {
            name: tipo
        }
    })

    pokeCreated.addTipo(tipoDb)
    res.send({info: 'Creado exitosamente'})
}



module.exports = {
    getAllPoke,
    getPokeId,
    createPoke,
    deletePokemon,

}
