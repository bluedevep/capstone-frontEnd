import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import NavigationContainer from "../navigation/navigation-container";

export default class Home extends Component {

    render() {
        
        return(
        
            <div className='home'>

                <div className='navigation-wrapper'>
                    <NavigationContainer />

                </div>

                <div className='content'>
                    <div className='titulo'>
                        <h1>FANGALOKA RESTAURANT</h1>
                    </div>

                    <div className='btn-wrap'>
                        <NavLink to="/eatin-eatout" className='base-btn'>START ORDERING!</NavLink>                       
                    </div>

                </div>
                
            </div>
                
        ); 
    }
}  
