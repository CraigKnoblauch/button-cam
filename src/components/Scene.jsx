import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useButtonStore } from "src/stores/ButtonStore";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

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

      const c1Ref = useRef()

      const s1 = findModelByName("sphere");
      const s2 = findModelByName("sphere001");
      const s3 = findModelByName("sphere002");

      const s1Ref = useRef()

      const p1 = findModelByName("pyramid");
      const p2 = findModelByName("pyramid001");
      const p3 = findModelByName("pyramid002");

      const p1Ref = useRef()

      const { cube_button_active, sphere_button_active, pyramid_button_active } = useButtonStore()
      const { camera } = useThree()

      useEffect(() => {
        console.log("Start cam position: ", camera.position)
        if (cube_button_active) {
          console.log("Cube ref position: ", c1Ref.current.position)
        } else if (sphere_button_active) {
          console.log("Sphere ref position: ", s1Ref.current.position)
        } else if (pyramid_button_active) {
          console.log("Pyramid ref position: ", p1Ref.current.position)
        }
      }, [cube_button_active, sphere_button_active, pyramid_button_active])

      return <>
        <primitive object={ground} material={new THREE.MeshStandardMaterial({ color: 0x877763 })} />
        <primitive object={c1} ref={c1Ref} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}/>
        <primitive object={c2} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}/>
        <primitive object={c3} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}/>

        <primitive object={s1} ref={s1Ref} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })}/>
        <primitive object={s2} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })}/>
        <primitive object={s3} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })}/>

        <primitive object={p1} ref={p1Ref} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })}/>
        <primitive object={p2} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })}/>
        <primitive object={p3} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })}/>
      </>
}

export default Scene