import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import logo from './img/lhrl.png';

import Home from './components/pages/Home';
import Deauthed from './components/pages/Deauthed';
import Authed from './components/pages/Authed';
import Navbar from './components/Navbar';
import Privacy from './components/pages/Privacy';
import Support from './components/pages/Support';
import EmailUs from './components/pages/EmailUs';

import './App.css'

function App() {
    return (
        <Router>
            <Navbar />
          
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/support" component={Support} />
                <Route path="/deauth" component={Deauthed} />
                <Route path="/auth" component={Authed} />
                <Route path="/contact" component={EmailUs} />
            </Switch>
           
        </Router>
    )
}

export default App