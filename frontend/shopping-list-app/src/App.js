import logo from './logo.svg';
import './App.css';
import ItemList from './ItemList';  // Import the ItemList component
import React from 'react';


function App() {
  return (
    <div className="App">
      <h1>Welcome to the Shopping List App</h1>
      <p>Learn React and Django by building a shopping list app!</p>
      <ItemList />  // Render the ItemList component
    </div>
  );
}


export default App;
