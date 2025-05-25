import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import image1 from "./assets/Gayatrimatha.jpg";
import image2 from "./assets/shiva.jpg";
import image3 from "./assets/lakshminarayan.jpg";
import image4 from "./assets/datatrayea.jpg";
import sound from "./assets/ding-126626.mp3";

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [counters, setCounters] = useState(JSON.parse(localStorage.getItem("counters")) || {});
  const [counterName, setCounterName] = useState('');
  const images = [image1, image2, image3, image4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);



  // Play sound function
 function play() {
  new Audio(sound).play();
 }

  useEffect(() => {
    localStorage.setItem('counters', JSON.stringify(counters));
  }, [counters]);

  const changeImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  function handleAddition() {
    play();
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
    let savedCount = counters[name];
    if (savedCount !== undefined) {
      setCounterName(name);
      savedCount = savedCount + count;
      setCount(savedCount);
    } else {
      alert("No counter found with that name.");
    }
  }

  function handleDelete(name) {
    const confirmed = window.confirm(`Are you sure you want to delete "${name}" count?`);
    if (confirmed) {
      const newCounters = { ...counters };
      delete newCounters[name];
      setCounters(newCounters);
    }
  }

  return (
    <>
      <Header />
      <div className='App'>
        <div className='box'>
          <img src={images[currentImageIndex]} alt="Current" className="center-image" />
          <br />
          <button onClick={changeImage} className="buttonChange">img</button>

          <p>{count}</p>
          <button onClick={handleReset} className='Reset'>Reset</button>
          <button onClick={handleAddition} className='add'>+</button>

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
          <button onClick={handleSave} className='save'>Save Count</button>
          <br /><br />
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
