const pad = '000';

export default {
  formatId: (id) => (!id ? null : pad.substring(0, pad.length - id.toString().length) + id),
  initialNumberOfPokemons: (length) => Array.from(Array(length || 10), (e, i) => i + 1),
};
