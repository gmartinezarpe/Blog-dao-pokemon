const express = require('express')
const PokemonesController = require('./controllers/PokemonesController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const pokemonesController = new PokemonesController(sqlClient)

// Routes
router.get('/', pokemonesController.renderHomeWithpokemones)
router.get('/about', pageController.renderAbout)

router.get('/pokemones/create', pokemonesController.renderpokemonesCreationForm)
router.post('/pokemones/create', pokemonesController.insertAndRenderpokemones)

router.get('/pokemones/:id', pokemonesController.renderSinglepokemones)

router.get('/pokemones/:id/update', pokemonesController.renderpokemonesUpdateForm)
router.post('/pokemones/:id/update', pokemonesController.updateAndRenderpokemones)

router.post('/pokemones/:id/delete', pokemonesController.deletepokemonesAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
