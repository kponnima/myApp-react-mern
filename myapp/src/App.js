import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import Campaign from './components/Campaign';
// import Description from './components/Description';
// import Scheduling from './components/Scheduling';
// import Mailplan from './components/Mailplan';
// import MarketingAutomation from './components/MarketingAutomation';
// import Personalization from './components/Personalization';
// import Attachment from './components/Attachment';
import MailFile from './components/Mailfile';
import User from './components/User';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Router>
          <Header />
          <Switch>
            <Route path='/campaign/new-campaign' component={Campaign} />
            <Route path='/campaign/:id' component={Campaign} />
            {/* <Route path='/campaign/:id' children={Campaign} /> */}
            <Route path='/new-user' component={User} />
            <Route path='/edit-user' component={User} />
            <Route path='/users' component={User} />
            <Route path='/login' component={Login} />
            <Route path='/registration' component={Registration} />
            <Route path='/mail-file' component={MailFile} />
            <Route exact path='/' component={Home} />
          </Switch>
          <br />
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
