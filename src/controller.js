import * as model from './model.js';
import backgroundView from './views/backgroundView.js';
import subinfoView from './views/subinfoView.js';
import headerView from './views/headerView.js';
// this library converts unix timestamps to normal dates

/**
 * When page loads, current location is fetched and data is displayed on screen
 */
const controlCurrentLocation = async function () {
  try {
    const weatherInfo = await model.fetchCurrentLocation();
    backgroundView.renderBackground(weatherInfo.partOfDay);
    subinfoView.renderMarkup(weatherInfo);
    headerView.generateMarkup(weatherInfo);
  } catch (error) {
    headerView.handleError(error);
  }
};

/**
 * same effect of controlCurrentLocation but only activates when search button is pressed
 */
const controlSearchLocation = async function (city) {
  try {
    const weatherInfo = await model.fetchSearchedLocation(city);
    backgroundView.renderBackground(weatherInfo.partOfDay);
    subinfoView.renderMarkup(weatherInfo);
    headerView.generateMarkup(weatherInfo);
  } catch (error) {
    headerView.handleError(error);
  }
};

const init = function () {
  backgroundView.handleBackground(controlCurrentLocation);
  headerView.handleSubmitForm(controlSearchLocation);
};

init();
