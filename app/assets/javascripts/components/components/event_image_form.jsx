const styles = {
  style: {
    padding: 10,
    minHeight: '100px',
    marginBottom: 20,
    borderRadius: '4px',
    backgroundColor: '#444B5D',
  },
  date: {
    color: "#9BAEC8",
    marginBottom: 6,
  },
  title: {
    fontSize: '1.2em',
    marginBottom: 6,
  },
  url: {
    color: '#2B90D9',
  },
}

export default class EventImageForm extends React.Component {
  static defaultProps = {
    style: {},
    tweet: null,
  }

  render() {
    if(!this.props.tweet) {
      return <div />
    }
    const style = Object.assign({}, styles.style, this.props.style);
    const event = this.props.tweet.getEvent();
    return (
      <div style={style}>
        <div style={styles.date}>
          {event.getDate().format("YYYY-MM-DD")}
          &nbsp;&nbsp;
          {event.getPlace()}
        </div>
        <div style={styles.title}>
          {event.getTitle()}
        </div>
        <div>
          {
            this.props.tweet.getImageUrls().map((url) => {
              return (
                <div key={url} style={{margin: '10px 0'}}>
                  <a href={url} target="blank" style={styles.url}>
                    <img src={url} width="100%" />
                  </a>
                </div>
              );
            })
          }
        </div>
        <div style={{margin: "10 0"}}>
          <a href={this.props.tweet.getUrl()} target="blank" style={styles.url}>
            <span>ソース: </span>
            <span>{this.props.tweet.getUrl().slice(0, 30)}</span>
            <span> ...</span>
          </a>
        </div>
      </div>
    );
  }
}
