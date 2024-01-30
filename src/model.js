const timestamp = require('unix-timestamp');

const apiKey = process.env.MY_API;
const baseUrl = 'https://api.weatherbit.io/v2.0/current';

export let weatherInfo = {};

export async function getCoords() {
  if ('geolocation' in navigator) {
    try {
      // Wrap getCurrentPosition in a Promise
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      return [lat, lng]; // Return the coordinates
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error('Geolocation is not supported by this browser.');
  }
}

const extractFormattedWeatherData = function (data) {
  const [dataObj] = data.data;
  weatherInfo = {
    temp: `${(dataObj.temp * (9 / 5) + 32).toFixed(2)}º F`,
    city: dataObj.city_name,
    windSpeed: `${dataObj.wind_spd.toFixed(2)} m/s`,
    countryCode: dataObj.country_code,
    tempFeelsLike: `${(dataObj.app_temp * (9 / 5) + 32).toFixed(2)}º F`,
    lastObservationTime: timestamp
      .toDate(dataObj.ts)
      .toString()
      .split(' ')
      .slice(0, 3)
      .join(' '),
    pressure: `${dataObj.pres} mb`,
    airQualityIndex: dataObj.aqi,
    windDirection:
      dataObj.wind_cdir_full.charAt(0).toUpperCase() +
      dataObj.wind_cdir_full.slice(1),
    cloudCoverage: `${dataObj.clouds}%`,
    uvIndex: Math.round(dataObj.uv * 100) / 100,
    visibility: `${dataObj.vis} KM`,
    partOfDay: dataObj.pod,
    dewPoint: `${dataObj.dewpt}º C`,
  };
  return weatherInfo;
};

//add handle error functionality later
export async function fetchCurrentLocation() {
  try {
    const [lat, lng] = await getCoords();
    const response = await fetch(
      `${baseUrl}?lat=${lat}&lon=${lng}&key=${apiKey}&include=minutely`
    );
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);
    const data = await response.json();
    return extractFormattedWeatherData(data);
  } catch (error) {
    throw error;
  }
}

export async function fetchSearchedLocation(city) {
  try {
    const response =
      await fetch(`${baseUrl}?city=${city}&key=${apiKey}&include=minutely
    `);
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);
    const data = await response.json();
    return extractFormattedWeatherData(data);
  } catch (error) {
    throw error;
  }
}
