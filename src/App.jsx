import { useButtonStore } from 'src/stores/ButtonStore'
import { Canvas } from '@react-three/fiber'
import Scene from 'src/components/Scene'
// import './App.css'

function App() {
  
  const { 
    cube_button_active, sphere_button_active, pyramid_button_active, 
    setCubeButton, setSphereButton, setPyramidButton 
  } = useButtonStore()

  return (
    <>
      <Canvas>
        <ambientLight/>
        <Scene/>
      </Canvas>
      <div id="navbar" className="">
        <div id="buttons" className="flex items-center justify-center p-4 space-x-4">
          <button
            id="cube_button"
            onClick={() => setCubeButton()}
            className="hover:bg-lime-500 p-2 rounded-lg"
            style={{ backgroundColor: cube_button_active ? 'green' : 'gray' }}
          >
            Cubes
          </button>
          <button
            id="sphere_button"
            onClick={() => setSphereButton()}
            className="hover:bg-lime-500 p-2 rounded-lg"
            style={{ backgroundColor: sphere_button_active ? 'green' : 'gray' }}
          >
            Spheres
          </button>
          <button
            id="pyramid_button"
            onClick={() => setPyramidButton()}
            className="hover:bg-lime-500 p-2 rounded-lg"
            style={{ backgroundColor: pyramid_button_active ? 'green' : 'gray' }}
          >
            Pyramids
          </button>
        </div>

        <div id="dot_stack" className="absolute top-0 right-0 h-screen flex flex-col justify-center items-center p-4">
          <div className="flex flex-col space-y-4">
            <span
              id="cube_dot"
              className="w-2 h-2 bg-gray-500 rounded-full"
              style={{ backgroundColor: cube_button_active ? 'green' : 'gray' }}
            ></span>
            <span
              id="sphere_dot"
              className="w-2 h-2 bg-gray-500 rounded-full"
              style={{ backgroundColor: sphere_button_active ? 'green' : 'gray' }}
            ></span>
            <span
              id="pyramid_dot"
              className="w-2 h-2 bg-gray-500 rounded-full"
              style={{ backgroundColor: pyramid_button_active ? 'green' : 'gray' }}
            ></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App