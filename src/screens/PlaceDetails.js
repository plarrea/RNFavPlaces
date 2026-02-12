import { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import { Colors } from '../constants/colors';
import { fetchPlaceDetails } from '../utils/database';

const PlaceDetails = ({ route, navigation }) => {
  const [place, setPlace] = useState(null);
  const selectedPlaceId = useMemo(() => route.params.placeId);

  const showOnMapHandler = () => {
    navigation.navigate('Map');
  };

  useEffect(() => {
    const fetchPlace = async () => {
      const fetched = await fetchPlaceDetails(selectedPlaceId);
      if (fetched) {
        setPlace(fetched);
        navigation.setOptions({
          title: fetched.title,
        });
      }
    };
    if (selectedPlaceId) fetchPlace();
  }, [selectedPlaceId]);

  if (!place)
    return (
      <View style={styles.fallback}>
        <Text style={styles.address}>Loading place data...</Text>
      </View>
    );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressCotnainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressCotnainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
