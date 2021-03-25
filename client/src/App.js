import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import logo from './img/lhrl.png';

import Home from './components/pages/Home';
import Deauthed from './components/pages/Deauthed';
import Authed from './components/pages/Authed';
import Navbar from './components/Navbar';
import Privacy from './components/pages/Privacy';
import './App.css';

function App() {



    return (
        <Router>
         <Navbar />
        <Header logo={logo} />
         <Switch>     
         <Route exact path="/" component={Home} /> 
         <Route path="/privacy" component={Privacy} /> 
         <Route path="/deauth" component={Deauthed} />   
         <Route path="/auth" component={Authed} />   
         </Switch>
       </Router>
    );
}

export default App;