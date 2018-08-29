import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { NavLink } from 'react-router-dom';

import styles from './styles/navbar.module.css';

export class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  toggleShowMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  render() {
    let header;

    if (this.props.loggedIn) {
      header = (
        <React.Fragment>
          {/* <h1>Acceptable Losses</h1> */}
          <div className={styles.mobile}>
            <button className={styles.menuButton} onClick={() => this.toggleShowMenu()}>
              <img className={styles.menuIcon} src={require('../assets/menu.svg')} alt="hamburger menu icon" />
            </button>
            {this.state.showMenu ? (
              <div className={styles.mobileMenuPage}>
                <div className={styles.row}>
                  <img
                    className={styles.linkIcon}
                    src={require('../assets/summary.svg')}
                    alt="summary (or home) icon"
                  />
                  <NavLink
                    role="navigation"
                    to="/dashboard"
                    className={styles.link}
                    onClick={() => this.toggleShowMenu()}
                  >
                    <span>Home</span>
                  </NavLink>
                </div>

                <div className={styles.row}>
                  <img className={styles.linkIcon} src={require('../assets/bills.svg')} alt="bills icon" />
                  <NavLink
                    role="navigation"
                    to="/accounts"
                    className={styles.link}
                    onClick={() => this.toggleShowMenu()}
                  >
                    <span>Accounts</span>
                  </NavLink>
                </div>

                <div className={styles.row}>
                  <img className={styles.linkIcon} src={require('../assets/add.svg')} alt="add bill icon" />
                  <NavLink
                    role="navigation"
                    to="/add-account"
                    className={styles.link}
                    onClick={() => this.toggleShowMenu()}
                  >
                    <span>Add Bill</span>
                  </NavLink>
                </div>

                <button
                  className={`${styles.row} ${styles.logout}`}
                  onClick={() => {
                    this.toggleShowMenu();
                    this.logOut();
                  }}
                >
                  Log out
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={styles.desktop}>
            <NavLink role="navigation" to="/dashboard">
              Home | 
            </NavLink>
            <NavLink role="navigation" to="/accounts">
              Accounts | 
            </NavLink>
            <NavLink role="navigation" to="/add-account">
              Add Bill | 
            </NavLink>
            <NavLink role="navigation" to="/calendar">
              Calendar 
            </NavLink>
            <NavLink role="navigation" className="link" to="/incomes">
              Incomes |
            </NavLink>
            <NavLink role="navigation" className="link" to="/add-income">
              Add Income
            </NavLink>
            <button onClick={() => this.logOut()}>Log out</button>
          </div>
        </React.Fragment>
      );
    }

    return <div className={styles.background}>{header}</div>;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
