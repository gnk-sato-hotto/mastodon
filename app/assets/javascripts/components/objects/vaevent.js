import axios from 'axios';

export default class VaEvent {

  static fetchAll(month, pref, success, error) {
    const url = "/sm_api/seiyu-mstdn-api/crawler/animehack";
    axios.get(url, {
      params: {
        pref:       pref,
        year_month: month,
      }
    })
    .then(function (response) {
      const data = response.data.data;
      if(!data) {
        success([]);
      } 

      const events = data.map((d) => {
        const event = new VaEvent();
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

  setDatetime(datetime) {
    this.datetime = datetime;
  }
  getDatetime() {
    return this.datetime;
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

  toString() {
    return [
      this.getDatetime(),
      this.getTitle(),
      this.getUrl()
    ].join("\n");
  }

  includeData(data) {
    this.setId(data.id);
    this.setUrl(data.url);
    this.setTitle(data.title);
    this.setDatetime(data.datetime);
  }

}
