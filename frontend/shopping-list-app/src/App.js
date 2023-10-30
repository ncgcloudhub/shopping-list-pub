import './App.css';
import ShoppingList from './components/ShoppingList';  // Import the ShoppingList component
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <h1>Welcome to the Shopping List App</h1>
      <p>Learn React and Django by building a shopping list app!</p>
      <ShoppingList />  {/* Render the ShoppingList component */}
    </div>
  );
}

export default App;
