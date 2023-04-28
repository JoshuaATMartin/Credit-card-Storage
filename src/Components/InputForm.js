import {React,useEffect,useState} from "react";
import countries from "../modules/countries";
import win from "../modules/session";
import logos from '../assets/Logos/VISAMC.png';
import MClogo from '../assets/Logos/VISA.png';
import Vlogo from '../assets/Logos/MC.png';
import { X } from "react-bootstrap-icons";

function InputForm()
{

const months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
const currentDate = new Date().getFullYear();
let bannedCountries = [];
const years = [];
const [validNum,setValidNum]= useState(false);
const [cards,setCard] = useState([]);
const [cardValues,setCardValues] = useState(
  {
    cardNum:'',
    cardOwner:'',
    cardCVV:'',
    cardCountry:countries[0],
    cardType:'',
    expMonth:months[0],
    expYear:currentDate,
    

  });
  getYears();
useEffect(()=>
{
  if(win.getItem("storedCards"))
  {
    setCard(JSON.parse(win.getItem("storedCards")));

  }
},[])
useEffect(()=> {
  win.setItem("storedCards",JSON.stringify(cards));
},[cards]);
function checkValid()
{
  const VISARegEx = /^4[0-9]{15}$/;
  const MCRegEx = /^5[1-5][0-9]{14}$/
  if(VISARegEx.test(cardValues.cardNum))
  {
    setValidNum(true);
    setCardValues({...cardValues,cardType:'VISA'});
  }
  else if (MCRegEx.test(cardValues.cardNum))
  {
    setValidNum(true);
    setCardValues({...cardValues,cardType:'Mastercard'});
  }
  
}
function handleCardNumChange(e)
{
  setCardValues({...cardValues,cardNum: e.target.value});
  checkValid();
  
  
  
}
function getYears()
{

  for(let i = 0;i<10;i++)
  {
    years.push(currentDate+i);
  }
}
function validator()
{
  if(cardValues.cardType === 'VISA')
  {
    return <img id="validatorImg" src={Vlogo}></img>;
  }
  else if(cardValues.cardType === 'Mastercard')
  {
    return <img id="validatorImg" src={MClogo}></img>;;
  }
  else if(cardValues.cardType === '' && cardValues.cardNum ==='')
  {

  }
  else 
  {
    return <X color="red"/>;
  }
}
function handleSubmit(e)
{
    e.preventDefault();
    if(cards.some(card=>card.cardNum === cardValues.cardNum))
    {
      document.getElementById("cardNumErrorLbl").textContent = "This Card already exists";
    }
    else if(win.getItem("bannedCountries"))
    {
       bannedCountries = JSON.parse(win.getItem("bannedCountries"));
        if(bannedCountries.includes(cardValues.cardCountry))
        {
          document.getElementById("cardNumErrorLbl").textContent = "This country is banned";
        }
    }
    else
    {
      setCard([...cards,cardValues]);
    setCardValues({
      cardNum:'',
      cardOwner:'',
      cardCVV:'',
      cardCountry:countries[0],
      cardType:'',
      expYear:'',
      expMonth:''
  
});
    }
    
}
    return(
      <div className="formContainer" >
        <div className="iconContainer">
              <img id="logos" src={logos}></img>
            </div> 
          <form className="iForm">
             <div className="col-10">
              <div></div>
              <div id="validator">
                {validator}
              </div>
              </div>
              <div className="col-90">
                <div className="row">
                <div className="col-50">
            <label className="label">Card Number</label>
            <input className="input" id= {"cardNumber"} value={cardValues.cardNum}  onChange={e => handleCardNumChange(e)} pattern="[0-9]{16}" maxLength={16}></input> 
            <label id = "cardNumErrorLbl" className="errorLbl"></label>
            <label className="label">Card Owner</label>
            <input className="input"  id="cardOwner" value={cardValues.cardOwner} type = {"text"} onChange={e => setCardValues({...cardValues,cardOwner: e.target.value})} ></input>
            <div className="col-50">
            <label className="label">Expiration Date</label>
            <select className="input" value = {cardValues.expMonth} id = "monthSelect" onChange={e => setCardValues({...cardValues,month: e.target.value})}>
              {
                months.map((month,index) => <option key={index} value={month}>{month}</option>)
              }
            </select>
            <select className="input" value = {cardValues.expYear} id = "yearSelect" onChange={e => setCardValues({...cardValues,year: e.target.value})}>
              {
                years.map((year,index) => <option key={index} value={year}>{year}</option>)
              }
            </select>
            </div>
            
            </div>
            <div className="col-50">
            <label className="label">Country</label>
            <select className="input" value = {cardValues.cardCountry} id = "countrySelect" onChange={e => setCardValues({...cardValues,cardCountry: e.target.value})}>
              {
                countries.map((country,index) => <option key={index} value={country}>{country}</option>)
              }
            </select>
            <label className="label">CVV</label>
            <input className="input" id="CVV" value={cardValues.cardCVV} type = {"text"}  onChange={e => setCardValues({...cardValues,cardCVV: e.target.value})} maxLength={3}></input>
            <input id = {"submitBtn"} type = {"submit"} onClick={e => handleSubmit(e)}></input>
            </div>
                </div>
              
              </div>     
            
            
            
          
            
          
        
            </form>
      
      </div>
        
        
        
    );
    
}

export default InputForm;