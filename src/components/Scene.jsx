import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useButtonStore } from "src/stores/ButtonStore";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/src/all";
// https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollToPlugin.min.js

const Scene = () => {

  gsap.registerPlugin(MotionPathPlugin)

  const { 
    cube_button_active, sphere_button_active, pyramid_button_active,
    setCubeButton, setSphereButton, setPyramidButton
  } = useButtonStore()

  const { scene, animations } = useGLTF("./models/scene-with-multiple-animations.glb");
    
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

  const myCamera = findModelByName("Camera")

  // Set the camera when this component mounts
  const mixer = new THREE.AnimationMixer(myCamera)
  const { camera, set } = useThree()
  useEffect(() => {
    set({ camera: myCamera })
  }, [])
  // mixer.clipAction(animations[0]).play()

  function convertToMotionPath(values) {
    let path = []
    for (let i = 0; i < values.length; i += 3) {
      path.push(new THREE.Vector3(values[i], values[i + 1], values[i + 2]))
    }
    return path
  }

  function getDeadZoneValue(values) {
    return new THREE.Vector3(values[0], values[1], values[2])
  }

  /**
   * Animations clips are as follows:
   * Frame 0 - 9: Primary cube deadzone
   * Frame 9 - 69: Primary cube to primary sphere
   * Frame 69 - 79: Primary sphere deadzone
   * Frame 79 - 139: Primary sphere to primary pyramid
   * Frame 139 - 149: Primary pyramid deadzone
   * 
   * Each of these are AnimationClip types. 
   */
  const c1Dz = new THREE.AnimationUtils.subclip(animations[0], "Cube Deadzone", 0, 9, 60)
  const c1ToS1 = new THREE.AnimationUtils.subclip(animations[0], "Cube to Sphere", 9, 69, 60)
  const s1Dz = new THREE.AnimationUtils.subclip(animations[0], "Sphere Deadzone", 69, 79, 60)
  const s1ToP1 = new THREE.AnimationUtils.subclip(animations[0], "Sphere to Pyramid", 79, 139, 60)
  const p1Dz = new THREE.AnimationUtils.subclip(animations[0], "Pyramid Deadzone", 139, 149, 60)

  // Create AnimationActions for each transition information
  const c1ToS1Action = mixer.clipAction(c1ToS1)
  c1ToS1Action.clampWhenFinished = true
  const s1ToP1Action = mixer.clipAction(s1ToP1)
  s1ToP1Action.clampWhenFinished = true
     
  /**
   * Will have a list of time values for each model to be viewed.
   * When a primary button is presed, the animation will reverse or advance to the appropriate time value, whichever is more appropriate. (Still haven't figured out how to get the animation to be a cycle)
   * When the next button is pressed, the animation will advance 1 second.
   * When the back button is pressed, tha animation will retreat 1 second.
   */
  const previousActiveButton = useRef(null)
  const stopTime = useRef(0)
  useEffect(() => {
    // The behavior I'm looking for: https://codepen.io/GreenSock/pen/bGexQpq
    if (cube_button_active && previousActiveButton.current !== "cube") {
      // Primary cube is at time 0
      // mixer.setTime(0)
      // mixer.clipAction(c1ToS1).setLoop(THREE.LoopOnce, 1).play()
      previousActiveButton.current = "cube"
    } else if (sphere_button_active && previousActiveButton.current !== "sphere") {
      // Primary sphere is at time 3
      // mixer.setTime(3)
      // mixer.clipAction(c1ToS1).setLoop(THREE.LoopOnce, 0).play()
      c1ToS1Action.setLoop(THREE.LoopOnce, 0).play()
      previousActiveButton.current = "sphere"
    } else if (pyramid_button_active && previousActiveButton.current !== "pyramid") {
      // Primary pyramid is at time 6
      // mixer.setTime(6)
      s1ToP1Action.setLoop(THREE.LoopOnce, 0).play()
      previousActiveButton.current = "pyramid"
    }
  }, [cube_button_active, sphere_button_active, pyramid_button_active])

  useFrame((state, delta) => {
    // if (mixer.time <= stopTime.current) {
    //   mixer.update(delta)
    // } else {
    //   // mixer.pause()
    // }
    if (camera === myCamera === state.camera) {
      console.log("same")
    } else {
      console.log("different")
      
    }
    mixer.update(delta)
    console.log(myCamera.position)
    console.log(camera.position)
  })

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