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
      const c1cam = findModelByName("primary_cube_cam");
      const c2 = findModelByName("cube001");
      const c2cam = findModelByName("cube_cam_2");
      const c3 = findModelByName("cube002");
      const c3cam = findModelByName("cube_cam_3");

      const c1Ref = useRef()

      const s1 = findModelByName("sphere");
      const s1cam = findModelByName("primary_sphere_cam");
      const s2 = findModelByName("sphere001");
      const s2cam = findModelByName("sphere_cam_2");
      const s3 = findModelByName("sphere002");
      const s3cam = findModelByName("sphere_cam_3");

      const s1Ref = useRef()

      const p1 = findModelByName("pyramid");
      const p1cam = findModelByName("primary_pyramid_cam");
      const p2 = findModelByName("pyramid001");
      const p2cam = findModelByName("pyramid_cam_2");
      const p3 = findModelByName("pyramid002");
      const p3cam = findModelByName("pyramid_cam_3");

      const p1Ref = useRef()

      const { cube_button_active, sphere_button_active, pyramid_button_active } = useButtonStore()
      const { camera } = useThree()

      useEffect(() => {
        console.log("Start cam position: ", camera.position)
        if (cube_button_active) {
          console.log("Cube ref position: ", c1Ref.current.position)
          camera.position.set(c1cam.position.x, c1cam.position.y, c1cam.position.z)
          camera.rotation.set(c1cam.rotation.x, c1cam.rotation.y, c1cam.rotation.z)
        } else if (sphere_button_active) {
          console.log("Sphere ref position: ", s1Ref.current.position)
          camera.position.set(s1cam.position.x, s1cam.position.y, s1cam.position.z)
          camera.rotation.set(s1cam.rotation.x, s1cam.rotation.y, s1cam.rotation.z)
        } else if (pyramid_button_active) {
          console.log("Pyramid ref position: ", p1Ref.current.position)
          camera.position.set(p1cam.position.x, p1cam.position.y, p1cam.position.z)
          camera.rotation.set(p1cam.rotation.x, p1cam.rotation.y, p1cam.rotation.z)
        }
        console.log("Camera position: ", camera.position)
        console.log("Camera rotation: ", camera.rotation)
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