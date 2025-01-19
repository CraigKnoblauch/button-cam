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
      const c2Ref = useRef()
      const c3Ref = useRef()

      const s1 = findModelByName("sphere");
      const s2 = findModelByName("sphere001");
      const s3 = findModelByName("sphere002");

      const s1Ref = useRef()
      const s2Ref = useRef()
      const s3Ref = useRef()

      const p1 = findModelByName("pyramid");
      const p2 = findModelByName("pyramid001");
      const p3 = findModelByName("pyramid002");

      const p1Ref = useRef()
      const p2Ref = useRef()
      const p3Ref = useRef()

      /**
       * For each camera position I need to know,
       * 1. The position of the camera
       * 2. The rotation of the camera
       * 3. The target of the camera
       * 4. The next camera
       * 5. The previous camera
       */
      class SceneCam {
        constructor(cam, target, isPrimary, group) {
          this.cam = cam;
          this.target = target;
          this.isPrimary = isPrimary;
          this.group = group;
        }
      }

      const c1cam = new SceneCam(findModelByName("primary_cube_cam"), c1Ref, true, "cubes");
      const c2cam = new SceneCam(findModelByName("cube_cam_2"), c2Ref, false, "cubes");
      const c3cam = new SceneCam(findModelByName("cube_cam_3"), c3Ref, false, "cubes");
      const s1cam = new SceneCam(findModelByName("primary_sphere_cam"), s1Ref, true, "spheres");
      const s2cam = new SceneCam(findModelByName("sphere_cam_2"), s2Ref, false, "spheres");
      const s3cam = new SceneCam(findModelByName("sphere_cam_3"), s3Ref, false, "spheres");
      const p1cam = new SceneCam(findModelByName("primary_pyramid_cam"), p1Ref, true, "pyramids");
      const p2cam = new SceneCam(findModelByName("pyramid_cam_2"), p2Ref, false, "pyramids");
      const p3cam = new SceneCam(findModelByName("pyramid_cam_3"), p3Ref, false, "pyramids");

      const sceneCams = [c1cam, c2cam, c3cam, s1cam, s2cam, s3cam, p1cam, p2cam, p3cam]
      const sceneCamsIndexRef = useRef(0)

      const { cube_button_active, sphere_button_active, pyramid_button_active } = useButtonStore()
      const { camera } = useThree()

      useEffect(() => {
        console.log("Start cam position: ", camera.position)
        if (cube_button_active) {

          const primaryCubeCam = sceneCams.find(cam => cam.group === "cubes" && cam.isPrimary);
          sceneCamsIndexRef.current = sceneCams.findIndex(cam => cam.group === "cubes" && cam.isPrimary);
          camera.position.set(primaryCubeCam.cam.position.x, primaryCubeCam.cam.position.y, primaryCubeCam.cam.position.z)
          camera.rotation.set(primaryCubeCam.cam.rotation.x, primaryCubeCam.cam.rotation.y, primaryCubeCam.cam.rotation.z)

        } else if (sphere_button_active) {

          const primarySphereCam = sceneCams.find(cam => cam.group === "spheres" && cam.isPrimary);
          sceneCamsIndexRef.current = sceneCams.findIndex(cam => cam.group === "spheres" && cam.isPrimary);
          camera.position.set(primarySphereCam.cam.position.x, primarySphereCam.cam.position.y, primarySphereCam.cam.position.z)
          camera.rotation.set(primarySphereCam.cam.rotation.x, primarySphereCam.cam.rotation.y, primarySphereCam.cam.rotation.z)

        } else if (pyramid_button_active) {

          const primaryPyramidCam = sceneCams.find(cam => cam.group === "pyramids" && cam.isPrimary);
          sceneCamsIndexRef.current = sceneCams.findIndex(cam => cam.group === "pyramids" && cam.isPrimary);
          camera.position.set(primaryPyramidCam.cam.position.x, primaryPyramidCam.cam.position.y, primaryPyramidCam.cam.position.z)
          camera.rotation.set(primaryPyramidCam.cam.rotation.x, primaryPyramidCam.cam.rotation.y, primaryPyramidCam.cam.rotation.z)

        }
        console.log("Camera position: ", camera.position)
        console.log("Camera rotation: ", camera.rotation)
      }, [cube_button_active, sphere_button_active, pyramid_button_active])

      return <>
        <primitive object={ground} material={new THREE.MeshStandardMaterial({ color: 0x877763 })} />
        <primitive object={c1} ref={c1Ref} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}/>
        <primitive object={c2} ref={c2Ref} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}/>
        <primitive object={c3} ref={c3Ref} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}/>

        <primitive object={s1} ref={s1Ref} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })}/>
        <primitive object={s2} ref={s2Ref} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })}/>
        <primitive object={s3} ref={s3Ref} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })}/>

        <primitive object={p1} ref={p1Ref} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })}/>
        <primitive object={p2} ref={p2Ref} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })}/>
        <primitive object={p3} ref={p3Ref} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })}/>
      </>
}

export default Scene

useGLTF.preload("./models/scene.glb");