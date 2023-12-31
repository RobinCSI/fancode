import React, { useEffect, useState, useRef, useContext } from "react";
import { View, FlatList } from "react-native";
import { GenresMoviesContext, SelectedGenreContext } from "../../context/context";
import YearMovie from "../yearMovie/YearMovie";

export default function Main({ searchText }) {
  const { genreMovies, setGenreMovies } = useContext(GenresMoviesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(2012);
  const flatListRef = useRef(null);
  let scrollDirection;
  const currentYearMin = useRef(2012);
  const currentYearMax = useRef(2012);
  const shouldCallAPI = useRef(true);
  const scrollOffset = useRef(0);

  const { selectedGenre } = useContext(SelectedGenreContext);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      if (shouldCallAPI.current) {
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      }
    };
  };

  const searchMovies = debounce(async (text, year, genreMovies) => {

    if (year !== 2012 && genreMovies[year]) {
      return;
    }
    setIsLoading(true);
    try {
      shouldCallAPI.current = false;
      
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${text}&api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`
      );
      const data = await response.json();
      setGenreMovies((prevMovies) => {
        return {
          ...prevMovies,
          [year]: data.results,
        };
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setIsLoading(false);
    }
    setTimeout(() => {
      shouldCallAPI.current = true;
    }, 500);
  }, 500);

  useEffect(() => {
    setGenreMovies({});
    if (currentYear == 2012) {
      if (searchText === "") loadMoviesByYear(2012);
    } else setCurrentYear(2012);

    scrollOffset.current = 0;
    currentYearMin.current = 2012;
    currentYearMax.current = 2012;
    flatListRef?.current.scrollToOffset({ animated: true, offset: 0 });
  }, [selectedGenre, searchText]);

  useEffect(() => {
    if (currentYearMin.current > currentYear) currentYearMin.current = currentYear;
    if (currentYearMax.current < currentYear) currentYearMax.current = currentYear;
    if (searchText === "" && !isLoading) {
      loadMoviesByYear(currentYear, genreMovies);
    }
  }, [currentYear, searchText]);

  useEffect(() => {

    if (searchText !== "" && !isLoading) {
      searchMovies(searchText, currentYear, genreMovies);
    }
  }, [currentYear, searchText]);

  const loadMoviesByYear = async (year, genreMovies = {}) => {
    if (genreMovies[year]) {
      return;
    }
    setIsLoading(true);
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&with_genres=`;
      selectedGenre.map((n) => (url = url + n + ","));
      const response = await fetch(url);
      const data = await response.json();
      setGenreMovies((prevMovies) => ({
        ...prevMovies,
        [year]: data.results,
      }));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setIsLoading(false);
    }
  };

  const handleBeginReached = () => {
    setCurrentYear(currentYearMin.current - 1);
  };

  const handleEndReached = () => {
    if (!isLoading && scrollDirection === "down") {
      setCurrentYear(currentYearMax.current + 1);
    }
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    layoutHeight = event.nativeEvent.layoutMeasurement.height;
    scrollDirection = offsetY > scrollOffset.current ? "down" : "up";
    scrollOffset.current = offsetY;
    if (scrollDirection === "up" && offsetY < 0 && currentYear > 1900 && !isLoading) {
      handleBeginReached();
    }
  };

  const moviesForYear = Object.keys(genreMovies).map((year) => ({
    year,
    movies: genreMovies[year],
  }));

  return (
    <View style={{ height: "auto" }}>
      <FlatList
        ref={flatListRef}
        data={moviesForYear}
        renderItem={({ item }) => <YearMovie item={item} />}
        keyExtractor={(item) => item.year.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={1.5}
        onScroll={handleScroll}
        maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        initialScrollIndex={0}
        initialNumToRender={10}
        windowSize={11}
        contentContainerStyle={{ paddingBottom: 210 }}
      />
    </View>
  );
}
