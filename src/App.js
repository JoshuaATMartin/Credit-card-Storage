import './App.css';
import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import CardScreen from './Screens/CardsScreen';
import Header from './Components/Header';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <header className="appHeader">
          <Header/>
      </header>
      <div className='body'>
      <Routes>
        <Route exact path='/' Component={HomeScreen}/>
        <Route path='/settingsScreen' Component={SettingsScreen}/>
        <Route path='/cardsScreen' Component={CardScreen}/>
      </Routes>
      </div>
      

    </div>
   
  
 </BrowserRouter>
  );
}

export default App;
