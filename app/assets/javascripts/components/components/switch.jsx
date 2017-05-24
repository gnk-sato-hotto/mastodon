const styles = {
  style: {
    margin: 10,
  },

  item: {
    minWidth:  50,
    minHeight: 24,
    textAlign: 'center',
    paddingTop: 6,
    float: 'left',
    fontSize: '1.3em',
    marginRight: 2,
    borderRadius: '2px',
  },

  selected: {
    color: '#313543',
    backgroundColor: '#fff',
  },

  unselected: {
    color: '#fff',
    cursor: 'pointer',
    backgroundColor: '#2b90d9',
  },
};

export default class Switch extends React.PureComponent {

  static defaultProps = {
    style: {},
    items: [],
    className: '',
    onClickItem: (val) => {},
    selectedValue: null,
  }

  render () {
    if(this.props.items.length == 0) {
      return (
        <div />
      );
    }

    const style = Object.assign({}, styles.style, this.props.style);
    const selectedValue = this.props.selectedValue || this.props.items[0].value;

    return (
      <div style={style} className={this.props.className}>
        {this.props.items.map((item) => {
          const isSelected = item.value == selectedValue;
          const itemStyle  = Object.assign(
            {},
            styles.item,
            isSelected ? styles.selected: styles.unselected
          );

          return (
            <div
             style={itemStyle}
             key={item.value}
             onClick={this.props.onClickItem.bind(this, item.value)}>
              {item.label}
            </div>
          );
        })}
        <div style={{clear: 'both'}} />
      </div>
    );
  }
}

/*
AttachmentList.propTypes = {
  items: PropTypes.
  onFollow: PropTypes.func.isRequired,
  media: ImmutablePropTypes.list.isRequired
};
*/
