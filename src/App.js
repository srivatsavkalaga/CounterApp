import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

import { useState } from 'react';
import './App.css';

function App() {
    const [count , setCount]=useState(0);
    
    function Addition(){
      //count+=1;
      //console.log(count);
      setCount(count+1);

    }    
    function Subtraction(){
      //count-=1;
      //console.log(count);
      setCount(count-1);
    }
    function Reset(){
      setCount(0);
    }
  
  
  return (
    <>

    <Header />

    <div className='App'>
      <div className='box'>
        <p>{count}</p>
        
        <button onClick={Addition} className='add'>Add</button>
        <button onClick={Subtraction} className='sub'>Subtract</button>
        <button onClick={Reset} className='Reset'>Reset</button>
      </div>
    </div>
    
    <Footer />
    </>
    
   
  );
}
export default App;


