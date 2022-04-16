const PokemonesDAO = require('../models/dao/PokemonesDAO')

class pokemonesController {
  constructor (db) {
    this.PokemonesDAO = new PokemonesDAO(db)
    this.renderHomeWithpokemones = this.renderHomeWithpokemones.bind(this)
    this.renderSinglepokemones = this.renderSinglepokemones.bind(this)
    this.renderpokemonesCreationForm = this.renderpokemonesCreationForm.bind(this)
    this.renderpokemonesUpdateForm = this.renderpokemonesUpdateForm.bind(this)
    this.insertAndRenderpokemones = this.insertAndRenderpokemones.bind(this)
    this.updateAndRenderpokemones = this.updateAndRenderpokemones.bind(this)
    this.deletepokemonesAndRenderResponse = this.deletepokemonesAndRenderResponse.bind(this)
  }

  async renderHomeWithpokemones (req, res) {
    const pokemones = await this.PokemonesDAO.getAll()
    res.render('home', {
      pokemones
    })
  }

  async renderSinglepokemones (req, res) {
    const id = req.params.id

    try {
      const pokemones = await this.PokemonesDAO.getById(id)

      if (!pokemones) {
        res.status(404).render('404')
        return
      }

      res.render('pokemones', {
        id,
        pokemon: pokemones.pokemon,
        category: pokemones.category,
        foto: pokemones.foto,
        ruta: pokemones.ruta
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderpokemonesCreationForm (req, res) {
    res.render('pokemones-form')
  }

  async renderpokemonesUpdateForm (req, res) {
    const id = req.params.id

    try {
      const pokemones = await this.PokemonesDAO.getById(id)

      if (!pokemones) {
        res.status(404).render('404')
        return
      }

      res.render('pokemones-form', {
        id,
        pokemon: pokemones.pokemon,
        category: pokemones.category,
        foto: pokemones.foto
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderpokemones (req, res) {
    const pokemon = req.body.pokemon
    const category = req.body.category
    const foto = req.body.foto
    const ruta = req.body.ruta

    const pokemones = { pokemon, category, foto, ruta }

    try {
      const id = await this.PokemonesDAO.create(pokemones)

      res.redirect(`/pokemones/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderpokemones (req, res) {
    const id = req.params.id
    const pokemon = req.body.pokemon
    const category = req.body.category
    const foto = req.body.foto
    const ruta = req.body.ruta

    try {
      const pokemones = { pokemon, category, foto, ruta, id }

      await this.PokemonesDAO.update(pokemones)

      res.redirect(`/pokemones/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deletepokemonesAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const pokemones = await this.PokemonesDAO.getById(id)

      if (!pokemones) {
        res.status(404).render('404')
        return
      }

      await this.PokemonesDAO.delete(id)

      res.render('pokemones-deleted', {
        id,
        pokemon: pokemones.pokemon
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = pokemonesController
