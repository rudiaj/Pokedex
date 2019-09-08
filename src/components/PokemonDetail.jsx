import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  useSpring, animated, config,
} from 'react-spring';

import PokemonTypesList from './PokemonTypesList';
import { helpers } from '../utils';

const PokemonDetail = ({
  clicked, className, imgSrc, currentPokemon: {
    name, types, id, height, weight, base_experience,
  },
}) => {
  const containerTransition = useSpring({
    opacity: clicked ? 1 : 0,
  });
  const imgTransition = useSpring({
    transform: clicked ? 'scale(1.2)' : 'scale(0.5)',
  });
  const h1Transition = useSpring({
    config: config.stiff,
    transform: clicked ? 'scale(1) translateY(0px)' : 'scale(0.5) translateY(50px)',
  });
  const pokemonTypesListTransition = useSpring({
    config: config.stiff,
    delay: 50,
    transform: clicked ? 'translateY(0px)' : 'translateY(50px)',
  });

  const idTransition = useSpring({
    config: config.gentle,
    delay: 50,
    transform: clicked ? 'translateX(0px)' : 'translateX(200px)',
  });

  const aboutTransition = useSpring({
    config: config.gentle,
    delay: 40,
    transform: clicked ? 'translateY(0px)' : 'translateY(200px)',
  });

  return (
    <animated.div
      style={{
        ...containerTransition,
        visibility: clicked ? 'initial' : 'hidden',
      }}
      className={cn('pokemon-detail', className, { 'no-pointer-event': !clicked })}
    >
      <div className="container pokemon-info">
        <div className="pokemon-name-wrapper">
          <animated.h1 style={h1Transition} className="title">{name}</animated.h1>
          <animated.span style={idTransition} className="pokemon-id">
            {`#${helpers.formatId(id)}`}
          </animated.span>
        </div>
        <animated.div style={pokemonTypesListTransition}>
          <PokemonTypesList types={types} />
        </animated.div>
      </div>
      <div className="pokemon-slider">
        {clicked && <animated.img alt="pokemon" src={imgSrc} style={imgTransition} />}
      </div>
      <animated.div style={aboutTransition} className="about-container">
        <div className="container about-content">
          <span className="subtitle">About</span>
          <table className="about-table">
            <tbody>
              <tr>
                <th className="p-t-0">Height</th>
                <td>{height}</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>{weight}</td>
              </tr>
              <tr>
                <th>Base experience</th>
                <td>{base_experience}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </animated.div>
    </animated.div>
  );
};

PokemonDetail.defaultProps = {
  className: null,
  imgSrc: null,
  domRect: null,
  currentPokemon: {},
};

PokemonDetail.propTypes = {
  clicked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  imgSrc: PropTypes.string,
  domRect: PropTypes.shape({}),
  currentPokemon: PropTypes.shape({
    name: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.shape({})),
    id: PropTypes.number,
    height: PropTypes.number,
    weight: PropTypes.number,
    base_experience: PropTypes.number,
  }),
};

export default memo(PokemonDetail);
