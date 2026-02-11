import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

const ImagePicker = ({ onPickImage }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.',
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    // await requestCameraPermissionsAsync();
    const hasPermission = await verifyPermissions();
    console.log('Camera permission granted:', hasPermission);
    if (!hasPermission) return;

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (result && result.assets && result.assets.length) {
      console.log('Image uri', result.assets[0].uri);
      setPickedImage(result.assets[0].uri);
      onPickImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <View style={styles.imagePreview}>
        {!!pickedImage ? (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        ) : (
          <Text>No image taken yet.</Text>
        )}
      </View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Photo
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
