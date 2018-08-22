import React from 'react';
import { connect } from 'react-redux';
// import { Link, Redirect } from 'react-router-dom';

export class SummaryDisplay extends React.Component {
  render() {
    return (
      <section className="summary-display">
        <p>Pie Chart</p>
        <p>Expenses</p>
        <p>Income</p>
      </section>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(SummaryDisplay);
