import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/lhrl.png';

const Home = () => {



    return (
        <div>
        <section className="">
             <p className="lead">
             <p>Install LHRL® App to your Slack workspace</p>
             <br />
             <p style={{margin: "1rem"}}>Before installing, we encourage your to create a channel named <strong>#lhrl</strong> in your Slack workspace for the app to post.</p>
             <br />
       <a href="https://slack.com/oauth/v2/authorize?client_id=1093878125127.1152997432560&scope=commands,incoming-webhook,users.profile:read,users:read,chat:write&user_scope=chat:write,users.profile:read,users:read,users:read.email"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
        <br />
        
       </p>
       
        </section> 
      
        </div>
    );
}

export default Home;