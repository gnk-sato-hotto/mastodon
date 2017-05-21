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
import Tweet from '../../objects/tweet';
import EventImageForm  from '../../components/event_image_form';
import moment from 'moment';

const messages = defineMessages({
  heading: { id: 'column.event_images', defaultMessage: '最新の声優イベント情報' }
});

const mapStateToProps = state => ({
  //accountIds: state.getIn(['user_lists', 'mutes', 'items'])
});

const styles = {
  style: {
    paddingTop: 10,
    backgroundColor: '#282C37',
  },
  info: {
    color: '#535b72',
    fontSize:  '1.2em',
    textAlign: 'center',
    marginTop: 30,
  }
};

class EventImages extends React.PureComponent {

  constructor (props, context) {
    super(props, context);
  }

  componentWillMount () {
    this.fetchTweets();

    this.setState({
      fetchRequired: true,
    });
  }

  /*
  shouldComponentUpdate(nextProps, nextState) {
  }
  */

  componentDidUpdate() {
    if(this.state.fetchRequired) {
      this.fetchTweets();
    }
  }

  fetchTweets(month, pref) {
    const success = (tweets) => {
      this.setState({
        tweets,
        fetchRequired: false,
      })
    }
    const error = (err) => {
      console.log(err);
    }
    Tweet.fetchAll({}, success, error);
  }

  getPrefs() {
    return [
      {value: '', label: '全て'},
      {value: 'r1', label: '北海道'},
      {value: 'r2', label: '東北'},
      {value: 'r3', label: '関東'},
      {value: 'r4', label: '中部'},
      {value: 'r5', label: '近畿'},
      {value: 'r6', label: '中国・四国'},
      {value: 'r7', label: '九州・沖縄'},
    ];
  }

  // events 
  //
  getTweets() {
    if(this.state.fetchRequired) {
      return (
        <p style={styles.info}>データを取得中です</p>
      );
    }

    const tweets = this.state.tweets || [];
    return tweets.length == 0 ? <p style={styles.info}>最新のイベント画像がありません</p>
    : (
      <div>
        <p style={{margin: 10}}>全 {tweets.length} 件</p>
        {
          tweets.map((tweet) => {
            return <EventImageForm tweet={tweet} key={tweet.getId()}/>
          })
        }
      </div>
    )
  }

  render () {
    const {intl} = this.props;

    return (
      <Column icon='image' heading={intl.formatMessage(messages.heading)}>
        <ColumnBackButtonSlim />
        <ScrollContainer scrollKey='event_images'>
          <div style={styles.style} className="scrollable">
            <div style={{margin: '20px 0'}}>
              {this.getTweets()}
            </div>
          </div>
        </ScrollContainer>
      </Column>
    );
  }

}

EventImages.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(EventImages));
