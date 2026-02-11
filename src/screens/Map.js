import { useCallback, useLayoutEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';
import usePlaceForm from '../store/PlaceForm/use-place-form';

const Map = ({ navigation }) => {
  const { pickedLocation, setPickedLocation } = usePlaceForm();

  const region = {
    latitude: pickedLocation.lat,
    longitude: pickedLocation.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
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
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {!!pickedLocation && (
        <Marker
          coordinate={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
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
