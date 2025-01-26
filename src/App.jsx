import { useButtonStore } from 'src/stores/ButtonStore'
import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
import Scene from 'src/components/Scene'
// import './App.css'

function App() {
  
  const { 
    cube_button_active, sphere_button_active, pyramid_button_active, 
    setCubeButton, setSphereButton, setPyramidButton 
  } = useButtonStore()

  return (
    <>
    <div>
      <div className="fixed w-full z-10">
        <div id="navbar">
          <div id="buttons" className="flex items-center justify-center p-4 space-x-4 z-20">
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
            <button id="Left" className="hover:bg-blue-500 p-2 rounded-lg">Next</button>
            <button id="Right" className="hover:bg-blue-500 p-2 rounded-lg">Back</button>
          </div>

          <div id="dot_stack" className="absolute z-20 top-0 right-0 h-screen flex flex-col justify-center items-center p-4">
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
        <div className="h-screen z-10">
          <Canvas>
            {/* NOTE Disabling OrbitControls means the animation mixer in Scene no longer animates the scene camera. No idea why but it's a very real side effect */}
            {/* <OrbitControls enableZoom={false}/> */}
            <ambientLight/>
            <Scene/>
          </Canvas>
        </div>
      </div>
      <div className="relative h-[900vh] z-0">
        <div id="cubes" className="absolute top-0 left-0"><h1>CUBES</h1></div>
        <div id="spheres" className="absolute top-1/3 left-0"><h1>SPHERES</h1></div>
        <div id="pyramids" className="absolute top-2/3 left-0"><h1>PYRAMIDS</h1></div>
      </div>
    </div>
    </>
  )
}

export default App