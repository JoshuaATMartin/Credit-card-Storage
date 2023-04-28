import React, { useEffect, useState } from "react";
import win from "../modules/session";
function StoredCards()
{
    
    const [cards,setCards] = useState([]);
    useEffect(()=>
    {
        if(win.getItem("storedCards"))
        {
            setCards(JSON.parse(win.getItem("storedCards")));
        }
    },[]);
    return (
        <div id="cardsContainer">
             <div id="cardTable">
             <table>
                    <thead>
                        <th>Card Number</th>
                        <th>Card Owner</th>
                        <th>Expiration Date</th>
                        <th>Country</th>
                        <th>Card type</th>
                        <th>CVV Number</th>
                    </thead>
                    <tbody>
                        {
                            cards.map((card,index)=>(
                            <tr key={index}>
                                <td>{card.cardNum}</td>
                                <td>{card.cardOwner}</td>
                                <td>{card.expMonth+'/'+card.expYear}</td>
                                <td>{card.cardCountry}</td>
                                <td>{card.cardType}</td>
                                <td>{card.cardCVV}</td>
                            </tr>   
                        ))}
                    </tbody>
                </table>  
                
            </div>
        </div>
        
        
    );
}

export default StoredCards;