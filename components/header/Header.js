import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { GenresContext } from "../../context/context";
import { SelectedGenreContext, GenresMoviesContext } from "../../context/context";
import HeaderTile from "../headerTile/HeaderTile";

const Header = ({ title, searchText, setSearchText }) => {
  const { genres } = useContext(GenresContext);
  const { selectedGenre, setSelectedGenre } = useContext(SelectedGenreContext);

  function onPressHandler(id) {
    let renderData = [...genres];
    let selectedGenre1 = [...selectedGenre];
    for (let data of renderData) {
      if (data.id == id) {
        data.selected = data.selected == null ? true : !data.selected;
        if (data.selected) {
          selectedGenre1.push(data.id);
        } else {
          selectedGenre1 = arrayRemove(selectedGenre1, data.id);
        }
        break;
      }
    }
    setSelectedGenre([...selectedGenre1]);
  }

  function arrayRemove(arr, value) {
    return arr.filter(function (geeks) {
      return geeks != value;
    });
  }
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TextInput
        placeholder="Search movies"
        placeholderTextColor="white"
        style={styles.input}
        onChangeText={(text) => setSearchText(text.trim())}
        value={searchText}
        cursorColor="white"
      />
      {/* <Text>{text}</Text> */}
      <SafeAreaView>
        <FlatList
          data={genres}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          style={styles.menu}
          renderItem={({ item }) => (
            <HeaderTile
              key={item.id}
              genreId={item.id}
              tileName={item.name}
              color={item.selected == true ? "red" : "rgb(118, 118, 118)"}
              style={
                item.selected == true
                  ? {
                      margin: 5,
                      borderRadius: 2,
                      backgroundColor: "red",
                      color: "white",
                    }
                  : {
                      margin: 5,
                      borderRadius: 2,
                      backgroundColor: "rgb(118, 118, 118)",
                    }
              }
              onPress={() => onPressHandler(item.id)}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgb(52, 52, 52)",
    paddingTop: 15,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  menu: {
    overflow: "scroll",
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    color: "white",
    // cursorColor: "white",
  },
});

export default Header;
