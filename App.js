import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Main from "./components/Main/Main";

import { SelectedGenreContext } from "./context/context";
import { GenresContext } from "./context/context";
import { GenresMoviesContext } from "./context/context";

import Header from "./components/header/Header";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});

  const [searchText, setSearchText] = useState("");
  // const { genreMovies, setGenreMovies } = useContext(GenresMoviesContext);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d")
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);
  return (
    <GenresContext.Provider value={{ genres, setGenres }}>
      <SelectedGenreContext.Provider
        value={{
          selectedGenre,
          setSelectedGenre,
        }}
      >
        <GenresMoviesContext.Provider value={{ genreMovies, setGenreMovies }}>
          <View>
            <Header title="MOVIEFLIX" searchText={searchText} setSearchText={setSearchText} />
            <Main setSearchText={setSearchText} searchText={searchText} />
          </View>
        </GenresMoviesContext.Provider>
      </SelectedGenreContext.Provider>
    </GenresContext.Provider>
  );
};

export default App;
