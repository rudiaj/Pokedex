import React, {
  useState, useEffect, memo, useCallback, useRef,
} from 'react';
import { Pokedex as Api } from 'pokeapi-js-wrapper';

import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';
import Navigation from './Navigation';
import { helpers } from '../utils';

const P = new Api();

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [initialNumber, setInitialNumber] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [type, setType] = useState('normal');
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [isFilterClicked, setIsFilterClicked] = useState(false);

  const appRef = useRef(null);

  const getData = useCallback(async (
    ids = helpers.initialNumberOfPokemons(initialNumber),
  ) => {
    setIsLoading(true);
    const data = await P.getPokemonByName(ids);

    setPokemons(data);

    setIsLoading(false);
  }, [initialNumber]);

  useEffect(() => {
    if (isFilterClicked || (isFilterClicked && clicked)) {
      getData(JSON.parse(localStorage.getItem('favorites')));
    } else {
      getData();
    }
  }, [clicked, getData, isFilterClicked]);

  useEffect(() => {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', '[]');
    }
  }, []);

  const handleOnClick = (_type, _imgSrc, index) => {
    setImgSrc(_imgSrc);
    setType(_type);
    setClicked(true);
    setCurrentPokemon(pokemons[index]);
  };

  const loadMoreData = () => {
    setInitialNumber(initialNumber + 10);
    getData();
  };

  const setToFavorites = () => {
    const favoritesList = JSON.parse(localStorage.getItem('favorites'));

    if (favoritesList.includes(currentPokemon.id)) {
      const omitted = favoritesList.filter((favorite) => favorite !== currentPokemon.id);
      localStorage.setItem('favorites', JSON.stringify(omitted));
    } else {
      favoritesList.push(currentPokemon.id);
      localStorage.setItem('favorites', JSON.stringify(favoritesList));
    }
  };

  const onFilterClick = () => {
    setIsFilterClicked(!isFilterClicked);
  };

  return (
    <main className="main">
      <div className="app" ref={appRef}>
        <Navigation
          currentPokemonId={currentPokemon.id}
          setClicked={setClicked}
          clicked={clicked}
          isFilterClicked={isFilterClicked}
          onFavoriteClick={setToFavorites}
          onFilterClick={onFilterClick}
        />
        <PokemonDetail
          clicked={clicked}
          imgSrc={imgSrc}
          className={type}
          currentPokemon={currentPokemon}
        />
        <section className="container">
          <h1 className="title">Pokedex</h1>
        </section>
        <section className="pokemon-list-container">
          <PokemonList
            pokemons={pokemons}
            onCardClick={handleOnClick}
            loadMoreData={loadMoreData}
            isLoading={isLoading}
            showLoadMore={!isFilterClicked}
          />
        </section>
      </div>
    </main>
  );
};

export default memo(Pokedex);
