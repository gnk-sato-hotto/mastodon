const styles = {
  style: {
    padding: 10,
    backgroundColor: '#444B5D',
    borderRadius: '4px',
    minHeight: '100px',
    marginBottom: 20,
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

export default class EventForm extends React.Component {
  static defaultProps = {
    style: {},
    event: null,
  }

  render() {
    if(!this.props.event) {
      return <div />
    }
    const style = Object.assign({}, styles.style, this.props.style);
    return (
      <div style={style}>
        <div style={styles.date}>{this.props.event.getDatetime()}</div>
        <div style={styles.title}>{this.props.event.getTitle()}</div>
        <div>
          <a href={this.props.event.getUrl()} target="blank" style={styles.url}>
            {this.props.event.getUrl()}
          </a>
        </div>
      </div>
    );
  }
}
