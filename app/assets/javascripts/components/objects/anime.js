import axios from 'axios';
import _ from 'lodash';

export default class Anime {

  static fetchAll(success, error) {
    const url = "/sm_api/seiyu-mstdn-api/crawler/fetch_performers";
    axios.get(url)
    .then(function (response) {
      const data = response.data;
      if(!data) {
        success({});
      } 
      const animes = {};
      _.each(data, (value, key) => {
        animes[key] = _.map(value, (d) => {
          const anime = new Anime();
          anime.includeData(d);
          anime.setCurrent(key == 'current');
          return anime;
        })
      })
      success(animes);
    })
    .catch(function (err) {
      error(err);
    });
  }

  constructor() {
  }

  setId(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }


  setTitle(title) {
    this.title = title;
  }
  getTitle() {
    return this.title;
  }

  setUrl(url) {
    this.url = url;
  }
  getUrl() {
    return this.url;
  }

  setPerformers(ps) {
    this.ps = ps;
  }
  getPerformers() {
    return this.ps;
  }

  setCurrent(bool) {
    this.current = bool;
  }
  isCurrent() {
    return this.current;
  }

  includeData(data) {
    this.setUrl(data.url);
    this.setTitle(data.title);
    this.setPerformers(data.performers);
  }

}
