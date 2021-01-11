import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import logo from './img/lhrl.png';

import Home from './components/pages/Home';
import Deauthed from './components/pages/Deauthed';
import Authed from './components/pages/Deauthed';
import './App.css';

function App() {



    return (
        <Router>
        <Header logo={logo} />
         <Switch>     
         <Route exact path="/" component={Home} />  
         <Route path="/deauth" component={Deauthed} />   
         <Route path="/auth" component={Authed} />   
         </Switch>
       </Router>
    );
}

export default App;