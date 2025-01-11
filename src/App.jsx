import { useState } from 'react'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="navbar" className="">
        <div id="buttons" className="flex items-center justify-center p-4 space-x-4">
          <button id="cube_button">
            Cubes
          </button>
          <button id="sphere_button">
            Spheres
          </button>
          <button id="pyramid_button">
            Pyramids
          </button>
        </div>

        <div id="dot_stack" className="absolute top-0 right-0 h-screen flex flex-col justify-center items-center p-4">
          <div className="flex flex-col space-y-4">
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
          </div>
          {/* <div id="cube_dot" />
          <div id="sphere dot" />
          <div id="pyramid_dot" /> */}
        </div>
      </div>
    </>
  )
}

export default App
