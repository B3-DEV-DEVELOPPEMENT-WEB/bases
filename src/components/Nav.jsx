import {NavLink} from "react-router-dom";

const Nav = () => {
    const checkIsActive = ({isActive})=> {
        return {
            color: isActive ? 'white' : 'red',
            background: isActive ? 'red': 'black'
        }
    };
    return (
        <nav>
            <ul>
                <li><NavLink to="/reducer" style={checkIsActive}>Reducer</NavLink></li>
                <li><NavLink to="/form" style={checkIsActive}>Form</NavLink></li>
                <li><NavLink to="/calculator" style={checkIsActive}>Calculator</NavLink></li>
                <li><NavLink to="/riddle" style={checkIsActive}>Riddle</NavLink></li>
            </ul>
        </nav>
    )
}
export default Nav