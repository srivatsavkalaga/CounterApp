import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Godess from "./assets/Gayatrimatha.jpg";

import { useEffect,useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [counters, setCounters] = useState(JSON.parse(localStorage.getItem("counters")) || {});
  const [counterName, setCounterName] = useState('');

  useEffect(() => {
    // Store the counters object in local storage whenever it changes
    localStorage.setItem('counters', JSON.stringify(counters));
  }, [counters]);

  function handleAddition() {
    setCount(count + 1);
  }

  function handleReset() {
    const confirmed = window.confirm("Are you sure you want to reset?");
    if (confirmed) {
      setCount(0);
    }
  }

  function handleSave(e) {
    if (counterName.trim() === "") {
      alert("Please enter a name for the counter.");
      return;
    }

    setCounters({
      ...counters,
      [counterName]: count
    });

    alert(`Count saved as "${counterName}"!`);
    setCount(0);
    setCounterName("");
    
    
  }

  function handleEdit(name) {
    const savedCount = counters[name];
    if (savedCount !== undefined) {
      setCounterName(name);
      setCount(savedCount);
    } else {
      alert("No counter found with that name.");
    }
  }

  function handleDelete(name){
    const newCounters = { ...counters };
    console.log(counters.name);
    Object.keys(counters).forEach(key => {
      if (key === name) {
        
        delete newCounters[name];
        
      }
    setCounters(newCounters);


      
  });
    
  }
  return (
    <>
      <Header />
      <div className='App'>
        
        <div className='box'>
          <img src={Godess} alt="Second Image" className="center-image" />

          <p>{count}</p>

          <button onClick={handleAddition} className='add'>+</button>
          <button onClick={handleReset} className='Reset'>Reset</button>
          <br />

          <input 
            type="text" 
            name="task"
            maxLength={18}
            placeholder="Enter counter name"
            value={counterName}
            className="textbox"
            onChange={(e) => setCounterName(e.target.value)} 
          />
          <button onClick={handleSave} className='save' >Save Count</button>
          <br />
          <br />
          <h2>Saved Counters</h2>
          <ul>
          {Object.keys(counters).map((name) => (
            <li key={name}>
              <div className='display'>
              <span className="name">{name}</span> &nbsp; : &nbsp;
              <span className="counter-value">{counters[name]}</span>
              
              <br />
              <button className="edit" onClick={() => handleEdit(name)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(name)}>Delete</button>
              </div>
          </li>
          ))}

            
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
