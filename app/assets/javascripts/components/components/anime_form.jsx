const styles = {
  style: {
    padding:    10,
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
    color: '#64B5F6',
  },
}

export default class AnimeForm extends React.Component {
  static defaultProps = {
    style: {},
    anime: null,
  }

  render() {
    if(!this.props.anime) {
      return <div />
    }
    const style = Object.assign({}, styles.style, this.props.style);
    const color = this.props.anime.isCurrent() ? "#E6EE9C" : '#FFAB40';
    return (
      <div style={style}>
        <div style={styles.title}>
          <span style={{marginRight: 10, color,}}>
            {this.props.anime.isCurrent() ? '(今)' : '(来)'}
          </span>
          <a href={this.props.anime.getUrl()} target="_blank" style={styles.url}>
            {this.props.anime.getTitle()}
          </a>
        </div>
        <div style={{marginTop: 10, fontSize: '1.2em'}}>
          {this.props.anime.getPerformers().split(",").join(", ")}
        </div>
      </div>
    );
  }
}
