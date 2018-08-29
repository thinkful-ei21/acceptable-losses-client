import React from 'react';
import BigCalendar from 'react-big-calendar';
import requiresLogin from '../require-login';
import { getAccounts, getDaysBills } from '../../actions/accounts';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TodaysBills from './todays-bills'

class Calendar extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAccounts());
  }

  handleSelect = ({ start }) => {
    let date= moment(start).format('YYYY-MM-DD')
    this.props.dispatch(getDaysBills(date));
  }
  customDayPropGetter = date => {
    let dates= moment(date).format('YYYY-MM-DD'),
    billsDue= this.props.accounts.map((account)=>moment(account.nextDue.dueDate).format('YYYY-MM-DD'))
    if (billsDue.includes(dates)){
      return {
        className: 'bill-due-day',
        style: {
          background: 'yellow'
        },
      }
    }
    else return {}
  }


render(){

  // let bills= this.props.accounts.map((account) => {
  //   return {
  //     id: account.id,
  //     start:moment(account.nextDue.dueDate).format('MMM Do, YYYY'),
  //     end:moment(account.nextDue.dueDate).format('MMM Do, YYYY'), 
  //     title:account.nextDue.name,
  //     desc:('$'+account.nextDue.amount), allDay:true}
  //   })
    let bills=[]
  return(
    <div>
    <div style={{height: '500px'}}>
      <BigCalendar
        selectable
        events={bills}
        startAccessor='startDate'
        endAccessor='endDate'
        localizer= {BigCalendar.momentLocalizer(moment)}
        views={['month']}
        dayPropGetter={this.customDayPropGetter}
        onSelectSlot={this.handleSelect}
      />
  </div>
  <div><TodaysBills/></div>
  </div>
)
}
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  daysBills: state.accounts.daysBills
});

export default requiresLogin()(connect(mapStateToProps)(Calendar));