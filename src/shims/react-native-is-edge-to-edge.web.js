// Web shim: edge-to-edge APIs are native-only.
const noop = () => {};

const isEdgeToEdge = () => false;
const isEdgeToEdgeFromLibrary = () => false;
const isEdgeToEdgeFromProperty = () => false;

module.exports = {
  controlEdgeToEdgeValues: noop,
  isEdgeToEdge,
  isEdgeToEdgeFromLibrary,
  isEdgeToEdgeFromProperty,
};
