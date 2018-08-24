import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import SummaryExpenses from './sumarry-expenses';

export class SummaryDisplay extends React.Component {
  render() {
    let currMonth = moment().format('MMMM');
    return (
      <section className="summary-display">
        <p>{currMonth}</p>
        <SummaryExpenses />
      </section>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(SummaryDisplay);
