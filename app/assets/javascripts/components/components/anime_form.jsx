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
    const color = this.props.anime.isCurrent() ? '#EF5350' : '#E6EE9C';
    return (
      <div style={style}>
        <div style={styles.title}>
          <span style={{marginRight: 10, color,}}>
            {this.props.anime.isCurrent() ? '今期' : '来期'}
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
