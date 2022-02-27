import React,{useState} from 'react'
import logo from '../images/logo.png'
import avi from '../images/man.png'
import {Link} from 'react-router-dom';

function Header() {
    const [unhide, setUnHide] = useState(false);


    return(
        // <div>
            <div className="navbar">
                <div className="nav_left">
                    <div className="logo_div">
                        <Link to="/"><img className="logo" src={logo} alt="Netflix Logo" /></Link>
                    </div>
                    <div className="menu_div">
                        <Link to="/">Home</Link>
                        <Link to="/">Series</Link>
                        <Link to="/">Documentaries</Link>
                        <Link to="/create">Create Movie</Link>
                    </div>
                </div>
                <div className="nav_right">
                    <div className="avatar_div">
                        <a href="#" className="avatar_a" >
                            <img className="avatar" src={avi} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        // </div>
    )
}

export default Header
