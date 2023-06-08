// Server menjalankan programnya
require('dotenv').config();
// Import Module Hapi
const Hapi = require('@hapi/hapi');
// memanggil ke folder api/songs
const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validator/songs');
// Memanggil ke folder api/albums
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validator/albums');
// Init
const init = async () => {
  const songsService = new SongsService();
  const albumsService = new AlbumsService();
// Hapi server
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
// register
  await server.register([
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
  ]);
// Kode berjalan
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();