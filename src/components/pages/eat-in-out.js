import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class EatInOut extends Component {

    constructor(){
        super();

        this.state = {
            eatInOutStatus: ""
        };
    }

    handleEatInClick = () => {
        this.setState({ eatInOutStatus: "EAT_IN" }, () => {
            this.props.history.push('/menu', { eatInOutStatus: this.state.eatInOutStatus });
        });
    }

    handleEatOutClick = () => {
        this.setState({ eatInOutStatus: "EAT_OUT" }, () => {
            this.props.history.push('/menu', { eatInOutStatus: this.state.eatInOutStatus });
        });
    }

    render() {
        return (
            <div className="eat-in-out-component-wrapper">
                <div className="eat-in-out-wrapper">
                    
                    <div className="eat-in-wrapper" onClick={this.handleEatInClick}>
                        <div className="eat-in-img"></div>
                        <div className="eat-in-text">
                            <h1>EAT IN</h1>
                        </div>
                        
                    </div>   
                    
                    <div className="eat-out-wrapper" onClick={this.handleEatOutClick}>
                        <div className="eat-out-img"></div>
                        <div className="eat-out-text">
                        <h1>EAT OUT</h1>
                        </div>
                        
                    </div>
                </div>

                <div className="languages">
                    <img src="https://images2.imgbox.com/6a/f9/0tQEYnX6_o.jpg"></img>
                </div>

                <div className="cards-accepted">
                    <img src="https://images2.imgbox.com/85/c0/xVUZ9JdP_o.jpg"></img>
                </div>

                <div className="botton-nav">
                    <button className="btn">EXIT</button>
                </div>
            </div>
        );
    }
}

export default withRouter(EatInOut);
