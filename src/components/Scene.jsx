import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Scene = () => {
    const { scene } = useGLTF("./models/scene.glb");
    
      console.log(scene)

      const findModelByName = (name) => {
        let foundModel = null;
        scene.traverse((child) => {
          if (child.name === name) {
            foundModel = child;
          }
        });
        return foundModel;
      };

      const ground = findModelByName("ground");
      
      const c1 = findModelByName("cube");
      const c2 = findModelByName("cube001");
      const c3 = findModelByName("cube002");

      const s1 = findModelByName("sphere");
      const s2 = findModelByName("sphere001");
      const s3 = findModelByName("sphere002");

      const p1 = findModelByName("pyramid");
      const p2 = findModelByName("pyramid001");
      const p3 = findModelByName("pyramid002");

      const model = scene.children[1];

      return <>
        <mesh geometry={ground.geometry} material={new THREE.MeshStandardMaterial({ color: 0x877763 })} position={new THREE.Vector3(ground.position.x, ground.position.y - 1, ground.position.z)} rotation={ground.rotation} />
        <mesh geometry={c1.geometry} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })} position={c1.position} rotation={c1.rotation} />
        <mesh geometry={c2.geometry} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })} position={c2.position} rotation={c2.rotation} />
        <mesh geometry={c3.geometry} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })} position={c3.position} rotation={c3.rotation} />
        <mesh geometry={s1.geometry} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })} position={s1.position} rotation={s1.rotation} />
        <mesh geometry={s2.geometry} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })} position={s2.position} rotation={s2.rotation} />
        <mesh geometry={s3.geometry} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })} position={s3.position} rotation={s3.rotation} />
        <mesh geometry={p1.geometry} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })} position={p1.position} rotation={p1.rotation} />
        <mesh geometry={p2.geometry} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })} position={p2.position} rotation={p2.rotation} />
        <mesh geometry={p3.geometry} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })} position={p3.position} rotation={p3.rotation} />
      </>
}

export default Scene