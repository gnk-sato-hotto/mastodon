import axios  from 'axios';
import moment from 'moment';
import SeiyuEvent from './seiyuEvent';

export default class Tweet {

  static fetchAll(params, success, error) {
    const url = "/sm_api/seiyu-mstdn-api/tweets";
    axios.get(url, params)
    .then(function (response) {
      const data = response.data.data;
      if(!data) {
        success([]);
      } 

      const tweets = data.map((d) => {
        const tweet = new Tweet();
        tweet.includeData(d);
        return tweet;
      });
      success(tweets);
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

  setImageUrls(urls) {
    this.urls = urls;
  }
  getImageUrls() {
    return this.urls;
  }

  setUrl(url) {
    this.url = url;
  }
  getUrl() {
    return this.url;
  }

  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }
  getCreatedAt() {
    return this.createdAt;
  }

  setEvent(event) {
    this.event = event;
  }
  getEvent() {
    return this.event;
  }

  includeData(data) {
    this.setId(data.id);
    this.setUrl(data.url);
    this.setCreatedAt(moment(data.tweet_created_at));
    if(data.images) {
      const imageUrls = data.images.map((image) => {
        return image.image_url
      });
      this.setImageUrls(imageUrls);
    }
    const event = new SeiyuEvent();
    event.includeData(data.event);
    this.setEvent(event);
  }

}
