// API ALBUMS
const ClientError = require('../../exceptions/ClientError');
// Function ALbumsHandler
class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    // Agar method mengarah pada instance di folder services/postgres/AlbumsService.js
    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }
  // Post
  async postAlbumHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload); // validasi
      const {
        name, year,
      } = request.payload;
      const albumId = await this._service.addAlbum({
        name, year,
      });
      // Jika Album Sukses Ditambahkan
      const response = h.response({
        status: 'success',
        message: 'Album Berhasil Ditambahkan',
        data: {
          albumId,
        },
      });
      // Jika data Tidak ditemukan
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
      // Ketika Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Oops! Ada masalah teknis di server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
// Get
  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = await this._service.getAlbumById(id);
      return {
        status: 'success',
        data: {
          album,
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
      // Server ketika ERROR!
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
  async putAlbumByIdHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload);
      const { id } = request.params;
      await this._service.editAlbumById(id, request.payload);
      return {
        status: 'success',
        message: 'Album Berhasil Diperbarui',
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
      // Server ketika ERROR!
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
  async deleteAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteAlbumById(id);
      return {
        status: 'success',
        message: 'Album Berhasil Dihapus',
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
      // Server ketika ERROR!
      const response = h.response({
        status: 'error',
        message: 'Oops! Ada masalah teknis di server kami.',
      }); // maka error akan mengarah ke code 500
      response.code(500);
      console.error(error);
      return response;
    }
  }
}
// Export Module AlbumsHandler
module.exports = AlbumsHandler;