import React from 'react';
import { Link } from "react-router-dom";

const Exit = (props) => {
    return (
        <div>
            <FontAwesomeIcon icon={solid("right-from-bracket")} />
            <Link to="/inicio">Salir</Link>
            <NavLink exact to="/" activeClassName="nav-link-active">
                Salir
            </NavLink>
        </div>
    )
}

export default Exit;

// mirar lo de como meter iconos de fontaweso TO DO