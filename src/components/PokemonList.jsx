import React, {
  memo, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

import PokemonCard from './PokemonCard';

const PokemonList = ({
  pokemons, loadMoreData, isLoading, onCardClick, showLoadMore,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const listTransition = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? 'translateY(0px)' : 'translateY(50px)',
  });

  return (
    <animated.div style={listTransition} className="pokemon-list-wrapper">
      <div className="pokemon-list">
        {
          pokemons.map((pokemon, index) => (
            <article key={pokemon.id}>
              <PokemonCard
                pokemon={pokemon}
                onCardClick={onCardClick}
                index={index}
              />
            </article>
          ))
        }
      </div>
      <div className="load-more-wrapper">
        {showLoadMore && pokemons.length > 0 && (
          <button disabled={isLoading} className="load-more" type="button" onClick={loadMoreData}>
            <i className="material-icons">expand_more</i>
          </button>
        )}
      </div>
    </animated.div>
  );
};

PokemonList.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showLoadMore: PropTypes.bool.isRequired,
  pokemons: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loadMoreData: PropTypes.func.isRequired,
};

export default memo(PokemonList);
