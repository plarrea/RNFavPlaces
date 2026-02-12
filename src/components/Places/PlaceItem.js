import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary500,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray700,
  },
  address: {
    color: Colors.gray700,
  },
});
