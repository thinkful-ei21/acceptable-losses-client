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
    }
  }
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  toggleShowMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render() {
    let header,
        menu;

    if (this.props.loggedIn) {
      header = (
        <React.Fragment>
          {/* <h1>Acceptable Losses</h1> */}
          <div className={styles.mobile}>
            <button className={styles.menuButton}
              onClick={() => this.toggleShowMenu()}
            >
              <img className={styles.menuIcon}
                src={require('../assets/menu.svg')}
                alt="hamburger menu icon"
              />
            </button>
            {this.state.showMenu ?
              <div className={styles.mobileMenuPage}>
                <NavLink role="navigation"
                  to="/dashboard"
                  className={styles.link}
                >
                  <img />
                  Home
                </NavLink>
                <NavLink role="navigation"
                  to="/accounts"
                  className={styles.link}
                >
                  <img />
                  Accounts
                </NavLink>
                <NavLink role="navigation"
                  to="/add-account"
                  className={styles.link}
                >
                  <img />
                  Add Bill
                </NavLink>
                <button className={styles.link}
                  onClick={() => this.logOut()}
                >
                  Log out
                </button>
              </div>
              :
            ''}
          </div>
          <div className={styles.desktop}>
            <NavLink role="navigation" to="/dashboard">
              Home |
            </NavLink>
            <NavLink role="navigation" to="/accounts">
              Accounts |
            </NavLink>
            <NavLink role="navigation" to="/add-account">
              Add Bill
            </NavLink>
            <button onClick={() => this.logOut()}>
              Log out
            </button>
          </div>
        </React.Fragment>
      );
    }

    // if (this.state.showMenu) {
    //   menu = (
    //     <React.Fragment>
    //       <NavLink role="navigation" to="/dashboard">
    //         <img />
    //         Home
    //       </NavLink>
    //       <NavLink role="navigation" to="/accounts">
    //         <img />
    //         Accounts
    //       </NavLink>
    //       <NavLink role="navigation" to="/add-account">
    //         <img />
    //         Add Bill
    //       </NavLink>
    //       <button onClick={() => this.logOut()}>
    //         Log out
    //       </button>
    //     </React.Fragment>
    //   )
    // }

    return <div className={styles.background}>{header}</div>;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
