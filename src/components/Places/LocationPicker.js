import { useNavigation } from '@react-navigation/native';
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from 'expo-location';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';
import StaticMap from '../UI/StaticMap';

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState(null);
  const navigation = useNavigation();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app.',
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    console.log('Location permission granted:', hasPermission);
    if (!hasPermission) return;

    const result = await getCurrentPositionAsync({});

    if (result && result.coords) {
      setPickedLocation({
        lat: result.coords.latitude,
        lng: result.coords.longitude,
      });
    }
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  return (
    <View style={{ marginBottom: 64 }}>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <StaticMap
            latitude={pickedLocation.lat}
            longitude={pickedLocation.lng}
          />
        ) : (
          <Text>No Location taken yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
