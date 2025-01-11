import { useState } from 'react'
// import './App.css'

function App() {
  const [hoveredButton, setHoveredButton] = useState(null)
  const [selectedButton, setSelectedButton] = useState(null)

  return (
    <>
      <div id="navbar" className="">
        <div id="buttons" className="flex items-center justify-center p-4 space-x-4">
          <button
            id="cube_button"
            onMouseEnter={() => setHoveredButton('cube')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => setSelectedButton('cube')}
            style={{ backgroundColor: hoveredButton === 'cube' || selectedButton === 'cube' ? 'green' : 'initial' }}
          >
            Cubes
          </button>
          <button
            id="sphere_button"
            onMouseEnter={() => setHoveredButton('sphere')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => setSelectedButton('sphere')}
            style={{ backgroundColor: hoveredButton === 'sphere' || selectedButton === 'sphere' ? 'green' : 'initial' }}
          >
            Spheres
          </button>
          <button
            id="pyramid_button"
            onMouseEnter={() => setHoveredButton('pyramid')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => setSelectedButton('pyramid')}
            style={{ backgroundColor: hoveredButton === 'pyramid' || selectedButton === 'pyramid' ? 'green' : 'initial' }}
          >
            Pyramids
          </button>
        </div>

        <div id="dot_stack" className="absolute top-0 right-0 h-screen flex flex-col justify-center items-center p-4">
          <div className="flex flex-col space-y-4">
            <span
              id="cube_dot"
              className="w-2 h-2 bg-gray-500 rounded-full"
              style={{ backgroundColor: selectedButton === 'cube' ? 'green' : 'gray' }}
            ></span>
            <span
              id="sphere_dot"
              className="w-2 h-2 bg-gray-500 rounded-full"
              style={{ backgroundColor: selectedButton === 'sphere' ? 'green' : 'gray' }}
            ></span>
            <span
              id="pyramid_dot"
              className="w-2 h-2 bg-gray-500 rounded-full"
              style={{ backgroundColor: selectedButton === 'pyramid' ? 'green' : 'gray' }}
            ></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App