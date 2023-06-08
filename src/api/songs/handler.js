// Handler SOngs

const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    // Agar method mengarah pada instance di folder services/postgres/SongsService.js
    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }
// POST
  async postSongHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {
        title, year, genre, performer, duration, albumId,
      } = request.payload;
      // Proses menambahkan data
      const songId = await this._service.addSong({
        title, year, genre, performer, duration, albumId,
      });
      const response = h.response({
        status: 'success',
        message: 'Lagu Berhasil Ditambahkan',
        data: {
          songId,
        },
      });
      // Jika Data tidak ditemukan
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server Ketika ERROR!
      const response = h.response({
        status: 'error',
        message: 'Oops! Ada masalah teknis di server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
// GET
  async getSongsHandler() {
    const songs = await this._service.getSongs();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }
// Get BYID
  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const song = await this._service.getSongById(id);
      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server Ketika ERROR!
      const response = h.response({
        status: 'error',
        message: 'Oops! Ada masalah teknis di server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
// PUT
  async putSongByIdHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const { id } = request.params;
      await this._service.editSongById(id, request.payload);
      return {
        status: 'success',
        message: 'Lagu Berhasil Diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server Ketika ERROR!
      const response = h.response({
        status: 'error',
        message: 'Oops! Ada masalah teknis di server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
// DELETE
  async deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteSongById(id);
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server Ketika ERROR!
      const response = h.response({
        status: 'error',
        message: 'Oops! Ada masalah teknis di server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}
// Export Module SongsHandler
module.exports = SongsHandler;