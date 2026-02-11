import { geocodeAsync, reverseGeocodeAsync } from 'expo-location';

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_MAPS_API_KEY;

export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}
  &zoom=14&size=400x200&maptype=roadmap
  &markers=color:red%7Clabel:S%7C${lat},${lng}
  &key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

export const getAddressFromCoords = async (latitude, longitude) => {
  try {
    const result = await reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (result.length > 0) {
      const address = result[0];

      return {
        name: address.name,
        street: address.street,
        streetNumer: address.streetNumber,
        city: address.city,
        region: address.region,
        postalCode: address.postalCode,
        country: address.country,
        formatted: `${address.streetNumber ?? ''} ${address.street ?? ''}, ${address.city ?? ''}, ${address.region ?? ''}, ${address.country ?? ''}`,
      };
    }
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
  }
};

export const getCoordsFromAddress = async (address) => {
  try {
    const result = await geocodeAsync(address);

    if (result.length > 0) {
      return {
        latitude: result[0].latitude,
        longitude: result[0].longitude,
      };
    } else {
      console.log('No results found');
      return null;
    }
  } catch (error) {
    console.error('Geocoding failed:', error);
  }
};
