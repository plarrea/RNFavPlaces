import PlaceForm from '../components/Places/PlaceForm';

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = (place) => {
    navigation.goBack();
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
