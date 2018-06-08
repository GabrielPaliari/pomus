import { GOOGLE_API_KEY } from './secrets';

export function addressToPosition(address: string): Promise<any> {
  // tslint:disable-next-line:max-line-length
  return fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + GOOGLE_API_KEY)
    .then(response => response.json());
}

export function getLocation(): Promise<any> {
  return new Promise<any>(resolve => {
    navigator.geolocation.getCurrentPosition(position => resolve(position));
  });
}
