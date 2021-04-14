module.exports = function ArrayAsString(ArrayAsString) {
  return ArrayAsString.split(',').map(tech => tech.trim());
}