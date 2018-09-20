import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import buttonStyles from './styles/buttons.module.css';
import styles from './styles/landingPage.module.css';

export function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/app/dashboard" />;
  }

  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/login">
          Login
        </Link>
        <Link to="/register">
          <button className={`${buttonStyles.form} ${styles.signInButton}`}>
            SIGN UP
          </button>
        </Link>
      </nav>

      <section className={styles.landingBackground}>
        <div className={styles.landingScreenshot}>
          <div className={styles.landingContent}>
            <h1>Acceptable Losses</h1>
            <p>
              Have you ever been late on a bill? Has a bill ever caught you off guard?
              With Acceptable Losses, you can keep track of all of your bills, see due
              dates of upcoming bills, click a button to visit your bill's payment
              website and mark them as paid. Staying on top of your expenses is as easy
              as hitting a button!
            </p>
            <img className={styles.landingCloud}
              src={require('../assets/landingPage/landingCloud.svg')}
              alt="decorative cloud"
            />
          </div>
        </div>
      </section>

      <section className={styles.featuresBackground}>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <img
              src={require('../assets/landingPage/graphFeature.svg')}
              alt="graph feature icon"
            />
            <h2>Expenses Graph</h2>
            <p>See a summary of all your expenses visualized in a pie graph.</p>
          </div>

          <div className={styles.featureCard}>
            <img
              src={require('../assets/landingPage/calendarFeature.svg')}
              alt="calendar feature icon"
            />
            <h2>Calendar View</h2>
            <p>Know when your bills are due on different days of the month.</p>
          </div>

          <div className={styles.featureCard}>
            <img
              src={require('../assets/landingPage/emailFeature.svg')}
              alt="email feature icon"
            />
            <h2>Email Reminders</h2>
            <p>
              Set reminder frequency and never be surprised by a non-regular
              bill again.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.demoBackground}>
        <div className={styles.demoAccount}>
          <div className={styles.demoText}>
            <h3>Try it out without the commitment.</h3>
            <p>
              Use this demo user to test out Acceptable
              Losses without the need of signing up.
            </p>
          </div>
          <div className={styles.demoInfo}>
            <p className={styles.demoInfoLabel}>Username</p>
            <p className={styles.demoInfoValue}>DEMO@gmail.com</p>
            <p className={styles.demoInfoLabel}>Password</p>
            <p className={styles.demoInfoValue}>password</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <img className={styles.footerCloud}
          src={require('../assets/landingPage/footerCloud.svg')}
          alt="footer cloud"
        />
        <h4 className={styles.h4}>Meet the Co-creators</h4>
        <section className={styles.team}>
          <div className={styles.flexTeam}>
            <div className={styles.teamMember}>
              <p>Jonathan Riggs</p>
              <a href="http://jonathanriggs.me">jonathanriggs.me</a>
            </div>
            <div className={styles.teamMember}>
              <p>Courtney Adams</p>
              <a href="http://coadams.me">coadams.me</a>
            </div>
            <div className={styles.teamMember}>
              <p>Leo Veras</p>
              <a href="http://leoveres.com/">leoveres.com</a>
            </div>
          </div>
          <div className={styles.flexTeam}>
            <div className={styles.teamMember}>
              <p>Albert Sare</p>
              <a href="http://albert-sare.netlify.com/">albert-sare.netlify.com</a>
            </div>
            <div className={styles.teamMember}>
              <p>Steven Imus</p>
              <a href="http://jonathanriggs.me">imus.me</a>
            </div>
          </div>
        </section>
      </footer>

    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
