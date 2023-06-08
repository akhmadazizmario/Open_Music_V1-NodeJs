// Validator Album
const { AlbumPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');
// Name
const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
// exports
module.exports = AlbumsValidator;