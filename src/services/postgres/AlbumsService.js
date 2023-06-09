// Services Albums
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
// Class Name
class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }
  // Tambah data
  async addAlbum({
    name, year,
  }) {
    const id = `album-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };
// query
    const result = await this._pool.query(query);
// Jika GAGAL
    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }
// show
    return result.rows[0].id;
  }
// GET
  async getAlbums() {
    const result = await this._pool.query('SELECT id, name, year FROM albums');
    return result.rows;
  }
// GETBYID
  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    //query
    const result = await this._pool.query(query);
// Album Tidak Ditemukan
    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    return result.rows[0];
  }
// Mengedit
  async editAlbumById(id, {
    name, year,
  }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };
// Query
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }
// Menghapus 
  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };
// query
    const result = await this._pool.query(query);
    // Jika Gagal
    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }
}
// Exports
module.exports = AlbumsService;