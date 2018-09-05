import React from 'react';
import BigCalendar from 'react-big-calendar';
import requiresLogin from '../require-login';
import { getAccounts, getDaysBills } from '../../actions/accounts';
import { connect } from 'react-redux';
import moment from 'moment';
import SelectedBills from './selected-bills';

import '../styles/calendar.css';
import styles from '../styles/calendarPage.module.css';

class Calendar extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAccounts());
  }

  handleSelect = ({ start }) => {
    let date = moment(start).format('YYYY-MM-DD');
    this.props.dispatch(getDaysBills(date));
  };

  getBillHistory() {
    let allBills = this.props.accounts.map(account => account.bills);
    let newArr;
    for (let i = 0; i < allBills.length; i++) {
      for (let j = 0; j < allBills[i].length; j++) {
        newArr.push(allBills[i][j]);
      }
    }
    return newArr;
  }
  customDayPropGetter = date => {
    let dates = moment(date).format('YYYY-MM-DD'),
      billsDue = this.props.accounts.map(account => {
        if (account.nextDue) {
          return moment(account.nextDue.dueDate).format('YYYY-MM-DD');
        } else {
          return '';
        }
      });
    let allBills = this.props.accounts.map(account => account.bills);
    let billsPaid = [];
    for (let i = 0; i < allBills.length; i++) {
      for (let j = 0; j < allBills[i].length; j++) {
        billsPaid.push(moment(allBills[i][j].dueDate).format('YYYY-MM-DD'));
      }
    }
    let borderColor = '2px lightgrey solid';
    if (dates === this.props.selectedDay) {
      borderColor = 'blue 3px dotted';
    }
    if (billsDue.includes(dates) && moment().format('YYYY-MM-DD') > dates) {
      return {
        style: {
          border: `${borderColor}`,
          background: 'red'
        }
      };
    }
    if (billsDue.includes(dates)) {
      return {
        style: {
          border: `${borderColor}`,
          background: 'yellow'
        }
      };
    }
    if (billsPaid.includes(dates)) {
      return {
        style: {
          border: `${borderColor}`,
          background: 'green'
        }
      };
    } else {
      return {
        style: {
          border: `${borderColor}`,
          background: 'white',
          'font-weight': 'normal'
        }
      };
    }
  };

  render() {
    // let bills= this.props.accounts.map((account) => {
    //   return {
    //     id: account.id,
    //     start:moment(account.nextDue.dueDate).format('MMM Do, YYYY'),
    //     end:moment(account.nextDue.dueDate).format('MMM Do, YYYY'),
    //     title:account.nextDue.name,
    //     desc:('$'+account.nextDue.amount), allDay:true}
    //   })
    let bills = [];
    return (
      <div>
        <h2 className={styles.h2}>Calendar</h2>
        <div className={styles.calendarPage} style={{ height: '500px' }}>
          <div>
            <BigCalendar
              selectable
              events={bills}
              startAccessor="startDate"
              endAccessor="endDate"
              localizer={BigCalendar.momentLocalizer(moment)}
              views={['month']}
              dayPropGetter={this.customDayPropGetter}
              onSelectSlot={this.handleSelect}
            />
          </div>
          <div>
            <SelectedBills />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  selectedDay: state.accounts.selectedDay,
  daysBills: state.accounts.daysBills
});

export default requiresLogin()(connect(mapStateToProps)(Calendar));
