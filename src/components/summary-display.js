import React from 'react';
import { connect } from 'react-redux';
// import { Link, Redirect } from 'react-router-dom';

import SummaryExpenses from './sumarry-expenses';

export class SummaryDisplay extends React.Component {
  render() {
    return (
      <section className="summary-display">
        <p>Current Month</p>
        <p>Pie Chart</p>
        <SummaryExpenses />
        <p>Income</p>
      </section>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(SummaryDisplay);
