class SubinfoView {
  _parentEl = document.querySelector('.sub-info');

  //returns ul that contains subInfo
  _returnSubInfo() {
    const subInfo = Array.from(this._parentEl.children);
    const ul = subInfo
      .flatMap((child) => {
        return Array.from(child.children);
      })
      .filter((el) => el.classList.contains('list'));
    return ul;
  }

  /**
   * 
   * @param {*} subInfo the two boxes that contain li
   * @param {*} weatherInfo: weather API object
   * this creates markup that needs to be rendered
   */
  _generateMarkup(subInfo, weatherInfo) {
    const liElements = Array.from(subInfo.children);
    liElements.forEach((li) => {
      const stringifiedDataset = JSON.stringify(li.dataset);
      const regex = /"([^"]+)"/; // Regular expression to match the content inside the first pair of quotes
      const liMethod = stringifiedDataset.match(regex)[1];
      const dynamicContent = li.querySelector('.dynamic-content');
      dynamicContent.textContent = ' ' + weatherInfo[liMethod];
    });
  }

  /**
   * 
   * @param {*} weatherInfo: weather API object
   * this puts markup on screen
   */
  renderMarkup(weatherInfo) {
    const [subInfo1, subInfo2] = this._returnSubInfo();
    this._generateMarkup(subInfo1, weatherInfo);
    this._generateMarkup(subInfo2, weatherInfo);
  }
}

export default new SubinfoView();
