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
    return (
      <nav>
        <div className={styles.navBackground}>
          <div className={styles.mobile}>
            <button className={styles.menuButton} onClick={() => this.toggleShowMenu()}>
              <img className={styles.menuIcon} src={require('../assets/menu.svg')} alt="hamburger menu icon" />
            </button>
            {this.state.showMenu ? (
              <div className={styles.mobileMenuPage}>
                <div className={styles.row}>
                  <img className={styles.linkIcon} src={require('../assets/summary.svg')} alt="summary (or home) icon" />
                  <NavLink
                    role="navigation"
                    to="/app/dashboard"
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
                    to="/app/accounts"
                    className={styles.link}
                    onClick={() => this.toggleShowMenu()}
                  >
                    <span>Bills</span>
                  </NavLink>
                </div>

                <div className={styles.row}>
                  <img className={styles.linkIcon} src={require('../assets/calendar.svg')} alt="calendar icon" />
                  <NavLink
                    role="navigation"
                    to="/app/calendar"
                    className={styles.link}
                    onClick={() => this.toggleShowMenu()}
                  >
                    <span>Calendar</span>
                  </NavLink>
                </div>

                <div className={styles.row}>
                  <img className={styles.linkIcon} src={require('../assets/settings.svg')} alt="settings icon" />
                  <NavLink
                    role="navigation"
                    to="/app/profile"
                    className={styles.link}
                    onClick={() => this.toggleShowMenu()}
                  >
                    <span>Settings</span>
                  </NavLink>
                </div>

                <div className={styles.row}>
                  <img className={styles.linkIcon} src={require('../assets/add.svg')} alt="add bill icon" />
                  <NavLink
                    role="navigation"
                    to="/app/add-account"
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
            <NavLink role="navigation" to="/app/dashboard" className={styles.link}>
              <img
                className={`${styles.linkIcon} ${styles.firstLink}`}
                src={require('../assets/summary.svg')}
                alt="summary (or home) icon"
              />
              <p>Home</p>
            </NavLink>

            <NavLink role="navigation" to="/app/accounts" className={styles.link}>
              <img className={styles.linkIcon} src={require('../assets/bills.svg')} alt="bills icon" />
              <p>Bills</p>
            </NavLink>

            <NavLink role="navigation" to="/app/calendar" className={styles.link}>
              <img className={styles.linkIcon} src={require('../assets/calendar.svg')} alt="calendar icon" />
              <p>Calendar</p>
            </NavLink>

            <NavLink role="navigation" to="/app/profile" className={styles.link}>
              <img className={styles.linkIcon} src={require('../assets/settings.svg')} alt="settings icon" />
              <p>Settings</p>
            </NavLink>

            <NavLink role="navigation" to="/app/add-account" className={styles.link}>
              <img className={styles.linkIcon} src={require('../assets/add.svg')} alt="add bill icon" />
              <p>Add Bill</p>
            </NavLink>

            <button
              className={`${styles.row} ${styles.logout}`}
              onClick={() => {
                this.logOut();
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect()(HeaderBar);
