import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import PlacesList from '../components/Places/PlacesList';
import { fetchPlaces } from '../utils/database';

const AllPlaces = () => {
  const isFocused = useIsFocused();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const fetchedPlaces = await fetchPlaces();
      if (fetchedPlaces && fetchedPlaces.length) {
        setPlaces(fetchedPlaces);
      }
      console.log(fetchedPlaces);
    };
    if (isFocused) {
      console.log('Fetching places');
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
};

export default AllPlaces;
