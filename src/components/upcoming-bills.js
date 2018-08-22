import React from 'react';
import { connect } from 'react-redux';
// import { Link, Redirect } from 'react-router-dom';

export class UpcomingBills extends React.Component {
  render() {
    return (
      <section className="upcoming-bills">
        <p>List of all upcoming bills in chronological order</p>
      </section>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(UpcomingBills);
