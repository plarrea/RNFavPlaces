import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const StaticMap = ({ latitude, longitude }) => {
  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  };

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
