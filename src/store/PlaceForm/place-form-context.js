import { createContext, useMemo, useState } from 'react';

export const PlaceFormContext = createContext({
  enteredTitle: '',
  pickedImage: '',
  pickedLocation: '',
  pickedAddress: '',
  setEnteredTitle: () => {},
  setPickedImage: () => {},
  setPickedLocation: () => {},
  setPickedAddress: () => {},
});

const PlaceFormProvider = ({ children }) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedImage, setPickedImage] = useState('');
  const [pickedLocation, setPickedLocation] = useState('');
  const [pickedAddress, setPickedAddress] = useState('');

  const value = useMemo(
    () => ({
      enteredTitle,
      pickedImage,
      pickedLocation,
      pickedAddress,
      setEnteredTitle,
      setPickedImage,
      setPickedLocation,
      setPickedAddress,
    }),
    [enteredTitle, pickedImage, pickedLocation, pickedAddress],
  );

  return (
    <PlaceFormContext.Provider value={value}>
      {children}
    </PlaceFormContext.Provider>
  );
};

export default PlaceFormProvider;
