import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import AuthFailed from './components/AuthFailed';
import { UserContext } from './context/userContext';

import './App.css';

function App() {
    function setLocalStorage(key, value) {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (e) {
            console.log("error: ", e);
            console.error(e);
        }
    }

    function getLocalStorage(key, initialValue) {
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : initialValue;
        } catch (e) {
            return initialValue;
        }
    }
    const [user, setUser] = useState(() => getLocalStorage('user', {
        stravaId: '',
        email: '',
        password: '',
        isAuthenticated: false,
        stravaAuthenticated: false
    }));

    useEffect(() => {
        setLocalStorage('user', user);
        console.log("wassup");
    }, [user]);

    const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <Router>
         <Switch>
         <UserContext.Provider value={providerValue}>
         <Route exact path="/" component={Home} /> 
         <Route exact path="/login" component={Login} />
       <Route exact path="/signup" component={Signup} />
       <Route exact path="/failed" component={AuthFailed} /> 
     </UserContext.Provider>
         </Switch>
       </Router>
    );
}

export default App;