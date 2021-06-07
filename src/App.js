import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import Preview from "./components/Preview";
import DishForm from "./components/DishForm";

function App() {
  return (
    
    <div className="App">
      <h2>Dish Selection</h2>
      <div className="col-25"></div>
      <div className="col-50">
        <DishForm/>
      </div>
      <div className="col-25">
        <Preview />
      </div>
    </div>
  );
}

export default App;
