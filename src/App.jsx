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

        <div id="dot_stack">
          {/* TODO */}
        </div>
      </div>
    </>
  )
}

export default App
