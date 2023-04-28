import { useLocation,Link,useNavigate } from "react-router-dom";
import {CreditCard2BackFill,GearFill,HouseDoorFill,CaretLeftSquareFill} from 'react-bootstrap-icons';
function Header()
{
    const location = useLocation();
    const navigate = useNavigate();
        if(location.pathname === '/')
        {
            return (
                <div id="homeHeader" className="header">
                    <div className="nav">
                    <Link  className="navButtons" to = "/cardsScreen"><CreditCard2BackFill className="cardNav"/></Link>
                    <Link  className="navButtons" to="/settingsScreen"><GearFill className="gearNav"/></Link>
                    </div>
                    
                </div>
            );
        }
        else if(location.pathname === '/settingsScreen')
        {
            return (
                <div id="settingsHeader" className="header">
                    <div className="nav">
                    <Link className="navButtons"  onClick={e=>navigate(-1)}><CaretLeftSquareFill className="backNav"/></Link>
                    
                    <Link className="navButtons" to = "/"><HouseDoorFill className="homeNav"/></Link>
                    <Link className="navButtons" to = "/cardsScreen"><CreditCard2BackFill className="cardNav"/></Link>
                    </div>
                    <div className="navTitles">
                        <h1 className="titles">Banned Countries</h1>
                    </div>
                    
                    
                </div>
            );
        }
        else
        {
            return (
                <div id="storedCardsHeader" className="header">
                    <div className="nav">
                    <Link className="navButtons"  onClick={e=>navigate(-1)}><CaretLeftSquareFill className="backNav"/></Link>
                    
                    <Link className="navButtons" to = "/"><HouseDoorFill className="homeNav"/></Link>
                    <Link className="navButtons" to = "/cardsScreen"><CreditCard2BackFill className="cardNav" /></Link>
                    <Link className="navButtons" to="/settingsScreen"><GearFill className="gearNav"/></Link>
                    </div>
                    <div className="navTitles">
                    <h1 className="titles">Cards</h1>
                    </div>
                    
                    
                </div>
            );
        }
    
}

export default Header;
