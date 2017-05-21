import axios  from 'axios';
import moment from 'moment';

export default class SeiyuEvent {

  static fetchAll(params, success, error) {
    const url = "/sm_api/seiyu-mstdn-api/events";
    axios.get(url, params)
    .then(function (response) {
      const data = response.data.data;
      if(!data) {
        success([]);
      } 

      const events = data.map((d) => {
        const event = new SeiyuEvent();
        event.includeData(d);
        return event;
      });
      success(events);
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

  setPerformers(ps) {
    this.performers = ps;
  }
  getPerformers() {
    return this.performers;
  }

  setStartedAt(sa) {
    this.startedAt = moment(sa);
  }
  getStartedAt() {
    return this.startedAt;
  }

  setPlace(place) {
    this.place = place;
  }
  getPlace() {
    return this.place;
  }

  setValidPlace(validPlace) {
    this.validPlace = validPlace;
  }
  getValidPlace() {
    return this.validPlace;
  }


  setUrl(url) {
    this.url = url;
  }
  getUrl() {
    return this.url;
  }

  setPref(pref) {
    this.pref = pref;
  }
  getPref() {
    return this.pref;
  }

  setDate(date) {
    this.date = date;
  }
  getDate() {
    return this.date;
  }

  includeData(data) {
    this.setId(data.id);
    this.setUrl(data.url);
    this.setPref(data.pref);
    this.setPerformers(data.performers);
    if(data.started_at) {
      this.setStartedAt(moment(data.started_at));
    }
    this.setPlace(data.place);
    this.setTitle(data.title);
    this.setDate(moment(data.date));
  }

}
