// Import Modul JOI
const Joi = require('joi');
// Name
const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().required(),
});
// exports
module.exports = { AlbumPayloadSchema };