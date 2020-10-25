import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import logo from '../img/lhrl.png';
import AuthStravaButton from './AuthStravaButton';
import DeAuthStravaButton from './DeAuthStravaButton';
import axios from 'axios';

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const { stravaAuthenticated, isAuthenticated, email, stravaId } = user;

    const getUser = async () => {
        try {
            const checkStrava = await axios.get('/strava/find', { params: { email: email } });
            console.log("checkStrava: ", checkStrava);
            if(checkStrava.stravaRefreshToken) {
                setUser({
                    ...user,
                    stravaAuthenticated: true
                })

            }
            return checkStrava
        } catch (err) {
            console.error(err.message);

        }

    }
    useEffect(() => {
        localStorage.setItem("StateInLocalStorage", user)
        if(email !== '') {
            getUser();
        } else {
            return
        }
    }, [user])
    const showSignup = () => {
        if(!isAuthenticated) {
            return <Fragment>
    <Link to='/signup' className="btn btn-primary">Signup</Link> 
             <Link to='/login' className="btn btn-primary">Login</Link>
             </Fragment>
        } else {
            return <Fragment>
{stravaAuthenticated ? <DeAuthStravaButton /> : <AuthStravaButton  /> }
<a href="https://www.espn.com/" className="btn btn-primary">Authorize SugarWOD</a>
</Fragment>
        }
    }

    return (
        <div>
        <section className="landing">
        <div className="dark-overlay">
                <img src={logo} alt="lhrl-logo" className='round-img' />
        <h1 className="x-large">LHRL App</h1>
       
        {!isAuthenticated ?
             <p className="lead">
        Create a profile to keep track of workouts and link to other applications. 
        <br />
        (Strava, SugarWOD, etc)"
        </p> : 
         <p className="lead">
         You are logged in as: {email}
         <br />

         Strava ID: {stravaId}
         <br />
          Please authorize apps below
         </p>}
        
        <div className="">
      {showSignup()}
        </div>
        </div>
        </section> 
      
        </div>
    );
}

export default Home;