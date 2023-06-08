// Import Modul JOI
const Joi = require('joi');
// Name
const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});
// Exports
module.exports = { SongPayloadSchema };