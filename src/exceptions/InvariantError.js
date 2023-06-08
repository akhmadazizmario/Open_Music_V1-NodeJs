const ClientError = require('./ClientError');
// Name Class
class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}
// exports
module.exports = InvariantError;