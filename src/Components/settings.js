import React, { useEffect, useState } from "react";
import win from "../modules/session";
import countries from "../modules/countries";
import {XLg} from 'react-bootstrap-icons';

function Settings()
{
    const [bannedCountries,setBannedCountries] = useState([]);
    const [country,setCountry] = useState(countries[0]);
    useEffect(()=>
    {
        if(win.getItem("bannedCountries"))
        {
            setBannedCountries(JSON.parse(win.getItem("bannedCountries")));
        }
    },[]);

    useEffect(()=>
    {
       win.setItem("bannedCountries",JSON.stringify(bannedCountries));
    },[bannedCountries]);
    function addCountry(country)
    {
        if(bannedCountries.includes(country))
        {
            document.getElementById("configErrorLbl").textContent = "This country is already banned.";
        }
        else
        {
            document.getElementById("configErrorLbl").textContent = "";
            setBannedCountries([...bannedCountries,country]);
            setCountry(countries[0]);
        }
            
        }
        
    
    function removeCountry(countryItem)
    {
        
        setBannedCountries([...bannedCountries.filter(item=> item !== countryItem)]);
    }
    return(
        <div id="settingsContainer">
            <div id="bannedList">
                
                <ul>
                    {
                        bannedCountries.map((bCountry,index)=>
                            <li key={index}>{bCountry}<button key={index} onClick={e=>removeCountry(bCountry)}  ><XLg color="red"/></button></li>
                        )
                    }
                </ul>
            </div>
            <div id="configSection">
                <select value = {country} id = "countrySelect" onChange={e => setCountry(e.target.value)}>
                    {
                    countries.map((country,index) => <option key={index} value={country}>{country}</option>)
                    }
                </select>
                <label id="configErrorLbl"></label>
                <button id = "btnAddCountry" onClick={e=>addCountry(country)}>Add Country</button>
            </div>
        </div>
    );
}
export default Settings;