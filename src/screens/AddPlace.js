import { Alert } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';
import usePlaceForm from '../store/PlaceForm/use-place-form';
import { insertPlace } from '../utils/database';

const AddPlace = ({ navigation }) => {
  const { resetForm } = usePlaceForm();

  const createPlaceHandler = (place) => {
    insertPlace(place)
      .then((result) => {
        console.log('place added', result);
        navigation.goBack();
        resetForm();
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          'Failed to add place',
          'Something went wrong, please try again.',
        );
      });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
