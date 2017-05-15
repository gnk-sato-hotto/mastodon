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
import EventForm from '../../components/event_form';
import VaEvent from '../../objects/vaevent';
import moment from 'moment';

const messages = defineMessages({
  heading: { id: 'column.vaevents', defaultMessage: '声優イベント情報' }
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

class Vaevents extends React.PureComponent {

  constructor (props, context) {
    super(props, context);
    this.prefs = this.getPrefs();
  }

  componentWillMount () {
    const month = 'this_month';
    const pref  = this.prefs[0].value;
    this.fetchEvents(month, pref);

    this.setState({
      month,
      pref,
      fetchRequired: true,
    });
  }

  /*
  shouldComponentUpdate(nextProps, nextState) {
  }
  */

  componentDidUpdate() {
    if(this.state.fetchRequired) {
      this.fetchEvents(this.state.month, this.state.pref);
    }
  }

  fetchEvents(month, pref) {
    const yearMonth = this.getYearMonth(month);
    const success = (events) => {
      this.setState({
        month,
        pref,
        events,
        fetchRequired: false,
      })
    }
    const error = (err) => {
      console.log(err);
    }
    VaEvent.fetchAll(yearMonth, pref, success, error);
  }

  getYearMonth(str) {
    const format = "YYYYMM";
    switch (str) {
      case 'this_month':
        return moment().format(format);
      case 'next_month':
        return moment().add(1, 'month').format(format);
      case 'month_after_next':
        return moment().add(2, 'month').format(format);
      default:
        return moment().format(format);
    }
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
  onChangeMonth(value) {
    if(value == this.state.month) {
      return;
    }

    this.setState({
      month: value,
      pref: this.state.pref,
      fetchRequired: true,
    })
  }

  onChangePref(e) {
    const pref = e.target.value;
    if(pref == this.state.pref) {
      return;
    }

    this.setState({
      month: this.state.month,
      pref: pref,
      fetchRequired: true,
    })
  }

  getEvents() {
    if(this.state.fetchRequired) {
      return (
        <p style={styles.noEvent}>データを取得中です</p>
      );
    }

    const events = this.state.events || [];
    return events.length == 0 ? <p style={styles.noEvent}>イベントがありません</p>
    : (
      <div>
        <p style={{margin: 10}}>全 {events.length} 件</p>
        {
          events.map((event) => {
            return <EventForm event={event} key={event.getId()}/>
          })
        }
      </div>
    )
  }

  render () {
    const {intl} = this.props;
    const switchItems = [
      {value: 'this_month', label: '今月'},
      {value: 'next_month', label: '来月'},
      {value: 'month_after_next', label: '再来月'},
    ];

    return (
      <Column icon='book' heading={intl.formatMessage(messages.heading)}>
        <ColumnBackButtonSlim />
        <ScrollContainer scrollKey='vaevents'>
          <div style={styles.style} className="scrollable">
            <Switch
             items={switchItems}
             selectedValue={this.state.month}
             onClickItem={this.onChangeMonth.bind(this)}
            />
            <div style={{marginTop: 20, fontSize: '1.2em'}}>
              <span style={{margin: 10}}>地域:</span>
              <select 
               name="pref"
               style={{height: 24, marginLeft: 10}}
               onChange={this.onChangePref.bind(this)}
               >
                {this.prefs.map((pref) => {
                  const isSelected = pref.value == this.state.pref;
                  if(isSelected) {
                    return (
                      <option key={pref.value} value={pref.value} selected>
                        {pref.label}
                      </option>
                    );
                  }
                  return (
                    <option key={pref.value} value={pref.value}>
                      {pref.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div style={{margin: '20px 0'}}>
              {this.getEvents()}
            </div>
          </div>
        </ScrollContainer>
      </Column>
    );
  }

}

Vaevents.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(Vaevents));
