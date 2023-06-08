const ClientError = require('./ClientError');
// Name Class
class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
// exports
module.exports = NotFoundError;