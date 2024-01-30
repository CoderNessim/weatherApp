class HeaderView {
  _parentEl = document.querySelector('.header-content');
  _form = document.querySelector('.city-form');

  /**
   *
   * @param {*} error: renders error on the header
   */
  handleError(error) {
    this._parentEl.textContent = error;
  }

  /**
   *
   * @param {*} weatherInfo: renders header based on API content
   */
  generateMarkup(weatherInfo) {
    const cityName = this._parentEl.querySelector('.city-name');
    const temp = cityName.nextElementSibling;
    cityName.textContent = `${weatherInfo.city}, ${weatherInfo.countryCode}`;
    temp.textContent = weatherInfo.temp;
  }

  /**
   *
   * @param {*} handles submit button, searchLocation info will then be rendered via handler call
   */
  handleSubmitForm(handler) {
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data.city);
    });
  }
}

export default new HeaderView();
