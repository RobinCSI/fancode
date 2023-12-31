import { Button, StyleSheet, View } from "react-native";

function HeaderTile({ tileName, color, style, onPress }) {
  return (
    <View style={styles.button}>
      <Button
        onPress={onPress}
        style={[styles.buttonText, style]}
        title={tileName}
        color={color}
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 8,
    marginBottom: 12,
  },
  buttonText: {
    borderRadius: 100,
    padding: 10,
  },
});

export default HeaderTile;
