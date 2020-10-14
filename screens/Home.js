import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

//import COLORS from '../lib/constants/colors';

const Swatch = (props) => {
  const { color } = props;
  return <View style={[styles.swatch, { backgroundColor: color }]} />;
};

const MenuItem = (props) => {
  const { palette, navigation } = props;
  const { paletteName, colors } = palette;
  const swatchColors = colors.slice(0, 5);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ColorPalette', {
          paletteName,
          colors: colors,
        });
      }}
    >
      <View style={styles.menuItem}>
        <Text>{paletteName}</Text>
        <FlatList
          data={swatchColors}
          keyExtractor={(item) => `${item.id}_${item.colorName}`}
          renderItem={({ item }) => <Swatch color={item.hexCode} />}
          horizontal
        />
      </View>
    </TouchableOpacity>
  );
};

const Home = ({ navigation, route }) => {
  const [colors, setColors] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const newPalette = route.params ? route.params.newPalette : undefined;

  const handleFetchColors = async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    const colorData = await result.json();
    if (result.ok) {
      setColors(colorData);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await handleFetchColors();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 3000);
  };

  useEffect(() => {
    handleFetchColors();
  }, []);

  useEffect(() => {
    if (newPalette) {
      setColors((current) => [newPalette, ...current]);
    }
  }, [newPalette]);

  return (
    <FlatList
      data={colors}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <MenuItem palette={item} navigation={navigation} />
      )}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => navigation.navigate('ColorPaletteModal')}
        >
          <Text style={styles.addScheme}>Add a color scheme</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  addScheme: {
    fontWeight: 'bold',
    fontSize: 21,
    margin: 10,
    color: 'teal',
  },
  menuItem: {
    margin: 10,
  },
  swatch: {
    width: 20,
    height: 20,
    margin: 5,
  },
});

export default Home;
