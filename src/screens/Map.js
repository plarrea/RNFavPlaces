import { useCallback, useLayoutEffect, useMemo } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';
import usePlaceForm from '../store/PlaceForm/use-place-form';

const Map = ({ navigation, route }) => {
  const { pickedLocation, setPickedLocation } = usePlaceForm();

  const initialLocation = useMemo(
    () =>
      route.params && {
        lat: route.params.initialLat,
        lng: route.params.initialLng,
      },
    [route],
  );

  const region = {
    latitude: initialLocation.lat || pickedLocation?.lat || 37.78,
    longitude: initialLocation.lng || pickedLocation?.lng || -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (initialLocation) return;
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setPickedLocation({ lat, lng });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!pickedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first!',
      );
      return;
    }
    navigation.goBack();
  }, [pickedLocation, navigation]);

  useLayoutEffect(() => {
    if (initialLocation) return;
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, initialLocation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {(!!initialLocation || !!pickedLocation) && (
        <Marker
          coordinate={{
            latitude: initialLocation.lat || pickedLocation.lat,
            longitude: initialLocation.lng || pickedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
