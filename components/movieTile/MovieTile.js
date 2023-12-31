import { StyleSheet, Text, Image, ScrollView } from "react-native";
import { GenresContext } from "./../../context/context";
import React, { useContext, useEffect, useState } from "react";

const MovieTile = React.memo(({ movie }) => {
  const { genres } = useContext(GenresContext);
  const movieGenre = [];
  const [credits, setCredits] = useState([]);
  genres.map((genre) => {
    if (movie.genre_ids.includes(genre.id)) movieGenre.push(genre.name);
  });

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=2dca580c2a14b55200e784d157207b4d`
    )
      .then((res) => res.json())
      .then((data) => setCredits(data));
  }, []);

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w780/${movie.poster_path}`,
        }}
      />
      <Text style={styles.titleText}>{movie.title}</Text>
      <Text
        style={{
          fontSize: 8,
          color: "white",
          padding: 3,
        }}
      >
        <Text style={{ color: "rgb(255, 217, 141)" }}>Genres: </Text>
        {movieGenre.join(", ")}
      </Text>
      <Text
        style={{
          fontSize: 8,
          color: "white",
          padding: 3,
        }}
      >
        <Text style={{ color: "rgb(255, 217, 141)" }}>Cast: </Text>
        {credits?.cast?.map((member) => member.original_name + ", ")}
      </Text>
      <Text
        style={{
          fontSize: 8,
          color: "white",
          padding: 3,
        }}
      >
        <Text style={{ color: "rgb(255, 217, 141)" }}>Director: </Text>
        {credits?.crew?.map((member) => {
          if (member.job == "Director") return member.original_name;
        })}
      </Text>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(118, 118, 118)",
    maxHeight: 300,
    maxWidth: 160,
    margin: 8,
    overflow: "scroll",
  },
  image: {
    width: 160,
    height: 180,
  },
  titleText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default MovieTile;
