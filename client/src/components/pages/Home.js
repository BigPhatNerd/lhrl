import React from 'react';


import Demo from '../Demo';
import Video from '../Video';
 import Contact from '../Contact';

import {Container, Row } from 'react-bootstrap';
import Header from '../Header';



const Home = () => {



    return (
        <>
     
        <Container className="mt-2">
<Header />
       
             <Row className="justify-content-center mt-2">
             <p>Install LHRL® App to your Slack workspace</p>
             </Row>
             <Row className="justify-content-center">
             <p>Before installing, we encourage your to create a channel named <strong>#lhrl</strong> in your Slack workspace for the app to post.</p>
             </Row>
             <Row className="justify-content-center">
       <a href="https://slack.com/oauth/v2/authorize?client_id=1093878125127.1152997432560&scope=chat:write,commands,incoming-webhook,users:read,channels:read,chat:write.public,chat:write.customize&user_scope=users:read"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
       </Row>
        <Row>
        <hr className="d-none d-sm-block" style={{height:"2px", borderWidth:0, color:"gray",backgroundColor:"gray", width:"60%", margin:"auto", marginBottom:"2rem", marginTop: "2rem"}} />
        </Row>
        <Row className="justify-content-center d-none d-sm-block">
        <Video  />
        </Row>
        
        <Demo />

       <Contact />
         </Container>
    
       </>
    );
}

export default Home;