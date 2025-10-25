import React,{useState} from 'react';
import image from './image.png';
import { useFetcher } from './Components/Comp1';
import { handleSubmit } from './Components/handleSubmit';
import {getSol} from './Components/getSol';

const App = () => {
  const { number, fetchNumber } = useFetcher();
  const [solution,setSolution] = useState("");

  const onSubmit =async()=>{
    try{
     const res=await handleSubmit(number,solution);
     alert(res.message);
    }
    catch(err){
      alert("Error submitting solution");
    }
  }

  const showSol= async()=>{
    try{
 const res=await getSol(number);
     alert(res.output);
    }
    catch(err){
 alert("Error getting solution");
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="rectangle1"
        style={{ display: 'flex',justifyContent:'center', flexDirection: 'column', gap: '10px' }}
      >
      <div
  className="rectangle2"
  style={{
    padding: '10px',
    border: '1px solid black',
    display: 'flex',          // enable flex layout
    flexDirection: 'column',   // stack children vertically
    alignItems: 'center',      // center horizontally
    gap: '10px',               // optional: space between text and button
  }}
>
  {/* Display number or placeholder */}
  <div style={{ fontSize: '24px', color: 'black', textAlign: 'center' }}>
    {number === null ? 'Click button to get number' : number}
  </div>

  <button onClick={fetchNumber} style={{ padding: '5px 10px' }}>
    Generate number
  </button>
</div>

         <input
          className="rectangle3"
          style={{ padding: '10px', border: '1px solid gray',
            fontSize:'20px',textAlign:'center'
           }}
           placeholder="Enter your solution here"
           value={solution}                  
           onChange={(e) => setSolution(e.target.value)} 
          />


        <button
          className="rectangle4"
          style={{ padding: '10px', border: '1px solid gray', cursor: 'pointer',color:'black'}}
        onClick={onSubmit}
        >
          Submit
        </button>

        <button onClick={showSol}
          className="rectangle5"
          style={{ padding: '10px', border: '1px solid gray', cursor: 'pointer' ,color:'black'}}
        >
          Give up
        </button>
      </div>
    </div>
  );
};

export default App;
