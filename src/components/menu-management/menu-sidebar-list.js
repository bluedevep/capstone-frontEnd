import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const MenuSidebarList = (props) => {

    const menuList = props.data.map(menuItem => {
        //console.log( "este s cada item", menuItem);
        return(
            <div key={menuItem.id} className='portfolio-item-thumb'>
                <div className='portfolio-thumb-img'>
                    <img src={menuItem.image}></img>
                </div>

                <div className='portfolio-title-actions'>

                    <div className='title'>{menuItem.name}</div>
                    
                    <div className='actions'>
                        <a 
                        className="action-icon"
                        onClick={() => props.handleEditClick(menuItem)}>
                            
                            <FontAwesomeIcon icon="pen-to-square" />
                        </a>

                        <a 
                        className="action-icon"
                        onClick={() => props.handleDeleteClick(menuItem)}>
                            <FontAwesomeIcon icon="trash" />
                        </a>
                    </div>

                    
                </div>
                
                
            </div>
        )
        
    })
    return (
        <div className='portfolio-sidebar-list-wrapper'>
            {menuList}
            
        </div>
    );
}

export default MenuSidebarList;