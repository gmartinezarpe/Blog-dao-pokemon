class PokemonesDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, pokemon, category, foto, ruta FROM pokemones')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, pokemon, category, foto, ruta FROM pokemones WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (pokemones) {
    const response = await this.db.query('INSERT INTO pokemones (pokemon, category, foto, ruta) VALUES (?, ?, ?, ?)', [pokemones.pokemon, pokemones.category, pokemones.foto, pokemones.ruta])
    const result = response[0]
    return result.insertId
  }

  async update (pokemones) {
    const response = await this.db.query('UPDATE pokemones SET pokemon = ?, category = ?, foto = ?, ruta = ? WHERE id = ?', [pokemones.pokemon, pokemones.category, pokemones.foto, pokemones.ruta, pokemones.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM pokemones WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = PokemonesDAO
