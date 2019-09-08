import PropTypes from 'prop-types';
import React, {
  memo, useState, useEffect, useRef,
} from 'react';
import cn from 'classnames';

import PokemonTypesList from './PokemonTypesList';
import { helpers } from '../utils';
import constants from '../constants';

const PokemonCard = ({
  pokemon: {
    name,
    id,
    types,
  },
  onCardClick,
  index,
}) => {
  const [type, setType] = useState('normal');
  const src = `${constants.IMG_PATH}${helpers.formatId(id)}.png`;
  const buttonRef = useRef(null);

  useEffect(() => {
    types.some(({ type: { name: _name } }) => {
      if (constants.TYPES.includes(_name)) {
        setType(_name);
        return true;
      }
      return false;
    });
  }, [types]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={cn('pokemon-card', { [type]: type })}
      onClick={() => onCardClick(type, src, index)}
    >
      <span className="pokemon-card-title">
        {name}
      </span>
      <div className="pokemon-card-content">
        <PokemonTypesList types={types} />
        <div>
          <img
            src={src}
            alt="pokemon"
          />
        </div>
      </div>
    </button>
  );
};

PokemonCard.propTypes = {
  index: PropTypes.number.isRequired,
  onCardClick: PropTypes.func.isRequired,
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

export default memo(PokemonCard);
