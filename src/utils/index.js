//mapDb Model
const mapDBToModel = ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
  }) => ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
  });
  // Exports
  module.exports = { mapDBToModel };