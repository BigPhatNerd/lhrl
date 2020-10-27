import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import logo from '../img/lhrl.png';
import AuthStravaButton from './AuthStravaButton';
import DeAuthStravaButton from './DeAuthStravaButton';
import axios from 'axios';
import Logout from './Logout';

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const { stravaAuthenticated, isAuthenticated, email, stravaId } = user;

    const getUser = async () => {
        try {

            //     const localUser = JSON.parse(localStorage.getItem('user'));
            const checkStrava = await axios.get('/strava/find', { params: { email: email } });
            console.log("checkStrava: ", checkStrava)
            console.log("checkStrava.data: ", checkStrava.data);
            console.log("checkStrava.data.isAuthenticated: ", checkStrava.data.isAuthenticated);
            console.log("checkStrava.data.authorizeStrava: ", checkStrava.data.authorizeStrava);



            setUser({
                ...user,
                stravaAuthenticated: checkStrava.data.authorizeStrava,
                isAuthenticated: checkStrava.data.isAuthenticated
            })
            console.log("User in getUser(): ", user);
            // localStorage.setItem('user', JSON.stringify(user));
            return user
        } catch (err) {
            console.error(err.message);

        }

    }
    useEffect(() => {
        getUser()
    }, [])
    console.log("user(not sure why isAuthenticated is undefined): ", user);
    console.log("isAuthenticated???: ", isAuthenticated);
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
<Logout />
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