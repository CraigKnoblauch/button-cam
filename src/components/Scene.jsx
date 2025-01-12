import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Scene = () => {
    const { scene } = useGLTF("./models/combined_scene.glb");
    
      console.log(scene)
      const model = scene.children[1];

      return <>
        <mesh geometry={model.geometry}
              material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}
              position={model.position}
              rotation={model.rotation}
        />
      </>
}

export default Scene