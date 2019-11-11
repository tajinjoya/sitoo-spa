import React from 'react';
import './css/style.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import Products from './components/Products';
import Manufacturers from './components/Manufacturers';
import { BrowserRouter,
  Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App col-12">
        <Header />
        <Navbar />
        <Route exact path="/" render={() => <UserList />}/>
        <Route path="/products" render={() => <Products />}/>
        <Route path="/manufacturers" render={() => <Manufacturers />}/>
      </div>
    </BrowserRouter>
  );
}

export default App;



  
  
  
 
          
          