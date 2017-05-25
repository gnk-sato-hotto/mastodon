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
  },
  popular: {
    padding: 10,
    backgroundColor: '#444B5D',
    borderRadius: '4px',
    minHeight: '100px',
    marginBottom: 20,
  },
  popularName: {
    float:  'left',
    cursor: 'pointer',
    minWidth:    90,
    marginRight:  4,
    marginBottom: 2,
  },
  clearFilter: {
    color: '#64B5F6',
    cursor: 'pointer',
    marginLeft: 10,
  },
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
      filterName:    false,
      fetchRequired: false,
    })
  }

  getAnimes(nameFilter=false) {
    if(!this.state.animes) {
      return [];
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

    if(nameFilter && this.state.filterName) {
      return _.filter(animes, (anime) => {
        return _.includes(anime.getPerformers(), this.state.filterName);
      });
    }
    return animes;
  }

  getPerformers() {
    if(this.state.fetchRequired) {
      return (
        <p style={styles.noEvent}>データを取得中です</p>
      );
    }
    const animes = this.getAnimes(true);
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

  countPerformers(animes) {
    const performersCounter = {};
    _.each(animes, (anime) => {
      if(anime.getPerformers()) {
        const ps = anime.getPerformers().split(",");
        _.each(ps, (performer) => {
          if(performer.length > 0) {
            performersCounter[performer] = performersCounter[performer] || 0;
            performersCounter[performer] += 1;
          }
        }) 
      }
    })
    return _.toPairs(performersCounter);
  }

  filterName(name) {
    this.setState({
      filterName: name
    });
  }

  getPopularPerformers() {
    const animes = this.getAnimes();
    if(_.isEmpty(animes)) {
      return;
    }
    const counter = this.countPerformers(animes);
    const sortedCounter = _.sortBy(counter, (count) => {
      return _.last(count);
    }).reverse();
    const criterion = this.state.quote == 'all' ? 2 : 1;
    const multiPerformers = _.filter(sortedCounter, (count) => {
      return _.last(count) > criterion;
    });

    return (
      <div style={styles.popular}>
        <h6 style={{marginBottom: 4}}>☆ 多数出演
          <span style={styles.clearFilter} onClick={this.filterName.bind(this, false)}>
            {this.state.filterName ? '解除' : ''}
          </span>
        </h6>
        {
          _.map(multiPerformers, (performer) => {
            return (
              <div 
               style={styles.popularName}
               onClick={this.filterName.bind(this, _.head(performer))}
               >
                {_.head(performer)} ({_.last(performer)})
              </div>
            );
          })
        }
        <div style={{clear: 'both'}} />
      </div>
    );
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
              {this.getPopularPerformers()}
            </div>

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
