import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LoadingIndicator from '../../components/loading_indicator';
import { ScrollContainer } from 'react-router-scroll';
import Column from '../ui/components/column';
import ColumnBackButtonSlim from '../../components/column_back_button_slim';
import AccountContainer from '../../containers/account_container';
import { fetchMutes, expandMutes } from '../../actions/mutes';
import { defineMessages, injectIntl } from 'react-intl';
import Switch from '../../components/switch';
import Anime from '../../objects/anime';
import AnimeForm from '../../components/anime_form';
import moment from 'moment';
import _ from 'lodash';

const messages = defineMessages({
  heading: { id: 'column.performers', defaultMessage: '声優の出演アニメ情報' }
});

const mapStateToProps = state => ({
  //accountIds: state.getIn(['user_lists', 'mutes', 'items'])
});

const styles = {
  style: {
    paddingTop: 10,
    backgroundColor: '#282C37',
  },
  noEvent: {
    color: '#535b72',
    fontSize:  '1.2em',
    textAlign: 'center',
    marginTop: 30,
  }
};

class Performers extends React.PureComponent {

  constructor (props, context) {
    super(props, context);
  }

  componentWillMount () {
    this.fetchPerformers();
    this.setState({
      quote: "current",
      fetchRequired: true,
    });
  }

  componentDidUpdate() {
  }

  fetchPerformers() {
    const success = (animes) => {
      this.setState({
        animes,
        fetchRequired: false,
      })
    }
    const error = (err) => {
      console.log(err);
    }
    Anime.fetchAll(success, error);
  }

  onChangeQuote(value) {
    this.setState({
      quote: value,
      fetchRequired: false,
    })
  }

  getPerformers() {
    if(this.state.fetchRequired) {
      return (
        <p style={styles.noEvent}>データを取得中です</p>
      );
    }

    let animes = [];
    switch (this.state.quote) {
      case 'all':
        animes = _.concat(
          this.state.animes.current,
          this.state.animes.next 
        );
        break;
      case 'current':
        animes = this.state.animes.current;
        break;

      case 'next':
        animes = this.state.animes.next;
        break;
    }
    return animes.length == 0 ? <p style={styles.noEvent}>声優の出演情報がありません</p>
    : (
      <div>
        <p style={{margin: 10}}>全 {animes.length} 件</p>
        {
          _.map(animes, (anime, i) => {
            return <AnimeForm anime={anime} key={i}/>;
          })
        }
      </div>
    )
  }

  render () {
    const {intl} = this.props;
    const switchItems = [
      {value: 'all',     label: "全て"},
      {value: 'current', label: '今期'},
      {value: 'next',    label: '来期'},
    ];

    return (
      <Column icon='plane' heading={intl.formatMessage(messages.heading)}>
        <ColumnBackButtonSlim />
        <ScrollContainer scrollKey='performers'>
          <div style={styles.style} className="scrollable">
            <Switch
             items={switchItems}
             selectedValue={this.state.quote}
             onClickItem={this.onChangeQuote.bind(this)}
            />

            <div style={{margin: '20px 0'}}>
              {this.getPerformers()}
            </div>
          </div>
        </ScrollContainer>
      </Column>
    );
  }

}

Performers.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(Performers));
