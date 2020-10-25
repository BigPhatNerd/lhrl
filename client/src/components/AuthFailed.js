import React, { Fragment, Link } from 'react';
import logo from '../img/lhrl.png';


const AuthFailed = () => {

    return (
        <Fragment>
		<section className="landing">
        <div className="dark-overlay">
                <img src={logo} alt="lhrl-logo" className='round-img' />
        <h1 className="x-large">There was a problem authenticating you.</h1>
       
        <Link to='/' className="btn btn-primary">Home</Link> 
        </div>
        </section>
		</Fragment>

    )
}

export default AuthFailed;