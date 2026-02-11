import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Place } from '../../models/Place';
import usePlaceForm from '../../store/PlaceForm/use-place-form';
import { getAddressFromCoords } from '../../utils/location';
import Button from '../UI/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

const PlaceForm = ({ onCreatePlace }) => {
  const {
    enteredTitle,
    pickedImage,
    pickedLocation,
    pickedAddress,
    setEnteredTitle,
    setPickedImage,
    setPickedAddress,
  } = usePlaceForm();

  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  const pickImageHandler = (imageUri) => {
    setPickedImage(imageUri);
  };

  useEffect(() => {
    const getAddress = async (location) => {
      const address = await getAddressFromCoords(location.lat, location.lng);
      setPickedAddress(address.formatted);
    };
    getAddress(pickedLocation);
  }, [pickedLocation]);

  const savePlaceHandler = async () => {
    const placeData = new Place(
      enteredTitle,
      pickedImage,
      pickedAddress,
      pickedLocation,
    );
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={enteredTitle}
          onChangeText={changeTitleHandler}
        />
      </View>
      <ImagePicker onPickImage={pickImageHandler} />
      <LocationPicker />
      <Button style={{ marginBottom: 64 }} onPress={savePlaceHandler}>
        Add Place
      </Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
