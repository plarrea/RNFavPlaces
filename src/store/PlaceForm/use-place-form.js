import { useContext } from 'react';
import { PlaceFormContext } from './place-form-context';

const usePlaceForm = () => {
  const context = useContext(PlaceFormContext);

  if (!context) {
    throw new Error('usePlaceForm must be used within PlaceFormContext');
  }

  return context;
};

export default usePlaceForm;
