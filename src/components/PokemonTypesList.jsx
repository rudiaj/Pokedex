import uuid from 'uuid';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const PokemonTypesList = ({ types }) => (types.length === 0 ? null : (
  <ul className="pokemon-type-list">
    {types.map((_type) => <li key={uuid()}>{_type.type.name}</li>)}
  </ul>
));

PokemonTypesList.defaultProps = {
  types: [],
};
PokemonTypesList.propTypes = {
  types: PropTypes.arrayOf(PropTypes.shape({})),
};

export default memo(PokemonTypesList);
