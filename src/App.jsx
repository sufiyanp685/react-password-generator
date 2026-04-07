import { useEffect, useRef, useState } from "react";

function App() {

  const [length,setLength]=useState(8);
  const [numberAllowed,setNum]=useState(false);
  const [charAllowed,setChar]=useState(false);
  const[password,setPassword]=useState("");
  const passRef = useRef(null);

  const passwordGenerator=()=>{
    let pass ="";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed)str+="0123456789";
    if(charAllowed)str+="!@#$%^&*()_+";
    for(let i=0;i<length;i++){
      let idx =Math.floor(Math.random()*str.length);
      let char = str.charAt(idx);
      pass += char;
    }
    setPassword(pass);
  }

  const CopyPasswordtoClipboard=()=>{
    passRef.current.select();
    navigator.clipboard.writeText(password);

  }

  useEffect(()=>{
    passwordGenerator();

  },[length,numberAllowed,charAllowed]);


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      {/* Header */}
      <h1 className="text-white text-center my-3 text-xl font-bold">
        Password Generator
      </h1>

      {/* Password Display */}
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3 bg-amber-50"
          placeholder="password"
          value={password}
          ref={passRef}
        />
        <button onClick={CopyPasswordtoClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          Copy
        </button>
      </div>

      {/* Length Slider */}
      <div className="flex items-center gap-x-2 text-sm mb-2">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer flex-1 "
          onChange={(e)=>{
            setLength(Number(e.target.value));

          }}
        />
        <label>Length: {length}</label>
      </div>

      {/* Checkboxes */}
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={numberAllowed} 
          onChange={()=>{
            setNum((prev)=>!prev);
          }}
            />
          <label >Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox"
           defaultChecked ={charAllowed} 
           onChange={()=>{
            setChar((prev)=>!prev)
           }}/>
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
