import React, { Component } from 'react';
import ReactModal from 'react-modal';
import SetUpBurger from '../menu/menuItems-setUp/setUpItem';
import SetUpItem from '../menu/menuItems-setUp/setUpItem';

ReactModal.setAppElement(".app-wrapper");

export default class MenuModal extends Component {

    constructor(props) {
        super(props);

        this.customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                maxHeight: '80%',
                
            },
            overlay: {
                //backgroundColor: "rgba(1, 1, 1, 0.75%)
                backgroundColor: 'rgba(40,12,100)',
                opacity: '0.8'
            },

        };

    }


    render() {

        return (
            <div>
                <ReactModal
                
                isOpen={this.props.blogModalIsOpen} 
                onRequestClose={this.props.handleModalClose}
                style={this.customStyles}
                addToCart={this.props.addToCart}
                >
                    <SetUpItem
                    item={this.props.item}
                    handleModalClose= {this.props.handleModalClose}
                    addToCart={this.props.addToCart}
                    
                    />
                </ReactModal>
            </div>
            
        );
    }
}