import PlaceForm from '../components/Places/PlaceForm';
import usePlaceForm from '../store/PlaceForm/use-place-form';

const AddPlace = ({ navigation }) => {
  const { resetForm } = usePlaceForm();

  const createPlaceHandler = (place) => {
    navigation.goBack();
    resetForm();
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
