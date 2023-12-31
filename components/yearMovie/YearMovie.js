import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MovieTile from "./../movieTile/MovieTile";

const YearMovie = React.memo(({ item, layoutHeight }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={{ color: "white", fontSize: 16, margin: 8, fontWeight: "bold" }}>
        {item.year}
      </Text>
      <View style={styles.movieContainer}>
        {item.movies && item.movies.map((movie) => <MovieTile key={movie.id} movie={movie} />)}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "black",
    // height: 900,
  },
  movieContainer: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    color: "white",
  },
});

export default YearMovie;
