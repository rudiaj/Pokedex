import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Navigation = ({
  setClicked,
  clicked,
  onFavoriteClick,
  onFilterClick,
  isFilterClicked,
  currentPokemonId,
}) => {
  const [toggleFavorite, setToggleFavorite] = useState(false);

  const handleOnClick = () => {
    setToggleFavorite(!toggleFavorite);
    onFavoriteClick();
  };

  useEffect(() => {
    if (localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites')).includes(currentPokemonId)) {
      setToggleFavorite(true);
    } else {
      setToggleFavorite(false);
    }
  }, [currentPokemonId]);

  return (
    <header className="container header-container">
      <nav
        className={cn('nav', {
          white: clicked,
        })}
      >
        {clicked && (
          <button type="button" onClick={() => setClicked(false)}>
            <i className="material-icons">arrow_back</i>
          </button>
        )}
        {
          clicked
            ? (
              <button className="m-l-auto" type="button" onClick={handleOnClick}>
                <i className="material-icons">{toggleFavorite ? 'favorite' : 'favorite_border'}</i>
              </button>
            )
            : (
              <button className="m-l-auto" type="button" onClick={onFilterClick}>
                <i className="material-icons">{isFilterClicked ? 'list' : 'filter_list'}</i>
              </button>
            )
        }
      </nav>
    </header>
  );
};

Navigation.defaultProps = {
  currentPokemonId: null,
};

Navigation.propTypes = {
  currentPokemonId: PropTypes.number,
  setClicked: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired,
  clicked: PropTypes.bool.isRequired,
  isFilterClicked: PropTypes.bool.isRequired,
};

export default memo(Navigation);
