import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ColorBox = (props) => {
  const { color } = props;
  const { colorName, hexCode } = color;
  const textStyles =
    parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1
      ? styles.blackText
      : styles.whiteText;

  return (
    <View style={[{ backgroundColor: hexCode }, styles.box]}>
      <Text style={textStyles}>{`${colorName} ${hexCode}`}</Text>
    </View>
  );
};

const ColorPalette = (props) => {
  const { route } = props;
  console.warn(route.params);
  return (
    <>
      <Text style={styles.topHeading}>{route?.params?.paletteName}</Text>
      <FlatList
        data={route?.params?.colors}
        keyExtractor={(item) => item.hexCode}
        renderItem={({ item }) => <ColorBox color={item} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 4,
  },
  blackText: {
    color: 'black',
  },
  topHeading: {
    fontWeight: 'bold',
    margin: 5,
    marginTop: 40,
  },
  whiteText: {
    color: 'white',
  },
});

export default ColorPalette;
