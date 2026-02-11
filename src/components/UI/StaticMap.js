import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const StaticMap = ({ latitude, longitude }) => {
  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  };

  const [lastLat, setLastLat] = useState();
  const [lastLng, setLastLlg] = useState();
  useEffect(() => {
    if (latitude !== lastLat) setLastLat(latitude);
    if (longitude !== lastLng) setLastLlg(longitude);
  }, [latitude, longitude, lastLat, lastLng]);

  if (latitude !== lastLat || longitude !== lastLng) return null;

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      zoomEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
      scrollEnabled={false}
      toolbarEnabled={false}
      zoomTapEnabled={false}
      zoomControlEnabled={false}
      poiClickEnabled={false}
    >
      <Marker coordinate={{ latitude, longitude }} />
    </MapView>
  );
};

export default StaticMap;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
  },
});
