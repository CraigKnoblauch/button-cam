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

  const c1Mesh = findModelByName("cube");
  const c2Mesh = findModelByName("cube001");
  const c3Mesh = findModelByName("cube002");

  const c1MeshRef = useRef()
  const c2MeshRef = useRef()
  const c3MeshRef = useRef()

  const s1Mesh = findModelByName("sphere");
  const s2Mesh = findModelByName("sphere001");
  const s3Mesh = findModelByName("sphere002");

  const s1MeshRef = useRef()
  const s2MeshRef = useRef()
  const s3MeshRef = useRef()

  const p1Mesh = findModelByName("pyramid");
  const p2Mesh = findModelByName("pyramid001");
  const p3Mesh = findModelByName("pyramid002");

  const p1MeshRef = useRef()
  const p2MeshRef = useRef()
  const p3MeshRef = useRef()

  const myCamera = findModelByName("Camera")

  // Set the camera when this component mounts
  const mixer = new THREE.AnimationMixer(myCamera)
  const { camera, set } = useThree()
  useEffect(() => {
    camera.position.copy(myCamera.position)
    camera.quaternion.copy(myCamera.quaternion)
  }, [])

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
  class SceneTarget {
    constructor(name, isPrimary) {
      this.name = name
      this.isPrimary = isPrimary
      this.next = null
      this.prev = null
      this.toNextClip = null
      this.toPrevClip = null // Note prev clips need to be reversed
    }
  }

  const c1 = new SceneTarget("Cube 1", true)
  const c2 = new SceneTarget("Cube 2", false)
  const c3 = new SceneTarget("Cube 3", false)

  const s1 = new SceneTarget("Sphere 1", true)
  const s2 = new SceneTarget("Sphere 2", false)
  const s3 = new SceneTarget("Sphere 3", false)

  const p1 = new SceneTarget("Pyramid 1", true)
  const p2 = new SceneTarget("Pyramid 2", false)
  const p3 = new SceneTarget("Pyramid 3", false)

  c1.next = c2
  c1.prev = p3

  c2.next = c3
  c2.prev = c1

  c3.next = s1
  c3.prev = c2

  s1.next = s2
  s1.prev = c3

  s2.next = s3
  s2.prev = s1

  s3.next = p1
  s3.prev = s2

  p1.next = p2
  p1.prev = s3

  p2.next = p3
  p2.prev = p1

  p3.next = c1
  p3.prev = p2

  c1.toNextClip = new THREE.AnimationUtils.subclip(animations[0], "c1NextClip", 10, 70, 60)
  c1.toPrevClip = new THREE.AnimationUtils.subclip(animations[0], "c1PrevClip", 570, 630, 60)

  c2.toNextClip = new THREE.AnimationUtils.subclip(animations[0], "c2NextClip", 80, 140, 60)
  c2.toPrevClip = c1.toNextClip

  c3.toNextClip = new THREE.AnimationUtils.subclip(animations[0], "c3NextClip", 150, 210, 60)
  c3.toPrevClip = c2.toNextClip

  s1.toNextClip = new THREE.AnimationUtils.subclip(animations[0], "s1NextClip", 220, 280, 60)
  s1.toPrevClip = c3.toNextClip

  s2.toNextClip = new THREE.AnimationUtils.subclip(animations[0], "s2NextClip", 290, 350, 60)
  s2.toPrevClip = s1.toNextClip

  s3.toNextClip = new THREE.AnimationUtils.subclip(animations[0], "s3NextClip", 360, 420, 60)
  s3.toPrevClip = s2.toNextClip

  p1.toNextClip = new THREE.AnimationUtils.subclip(animations[0], "p1NextClip", 430, 490, 60)
  p1.toPrevClip = s3.toNextClip

  p2.toNextClip = new THREE.AnimationUtils.subclip(animations[0], "p2NextClip", 500, 560, 60)
  p2.toPrevClip = p1.toNextClip

  p3.toNextClip = c1.toPrevClip
  p3.toPrevClip = p2.toNextClip

  const currentSceneTarget = useRef(c1)

  // TODO, create a function that will find the path to the next target given the requested target and the current target
  function findAnimPath(target) {
    // Return a  list of AnimationActions?
    // target is desired. Use currentSceneTarget.current as the current target
    let found = false
    let followRight = false
    let followLeft = false
    let rightMost = currentSceneTarget.current
    let leftMost = currentSceneTarget.current
    while (!found) {


      if (rightMost === target) {
        followRight = true
        found = true
        break
      }

      if (leftMost === target && !found) {
        followLeft = true
        found = true
        break
      } 

      rightMost = rightMost.next
      leftMost = leftMost.prev
    }

    let actions = []
    let current = currentSceneTarget.current
    if (followRight) {
      while (current !== target) {
        actions.push(mixer.clipAction(current.toNextClip))
        current = current.next
      }
    } else {
      while (current !== target) {
        let action = mixer.clipAction(current.toPrevClip)
        action.timeScale = -1
        action.setLoop(THREE.LoopOnce) 
        actions.push(action)
        current = current.prev
      }
    }
  }

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
  const go = useRef(false)
  useEffect(() => {
    // The behavior I'm looking for: https://codepen.io/GreenSock/pen/bGexQpq
    if (cube_button_active && previousActiveButton.current !== "cube") {

      previousActiveButton.current = "cube"

    } else if (sphere_button_active && previousActiveButton.current !== "sphere") {

      const action = mixer.clipAction()
      c1ToS1Action.setLoop(THREE.LoopOnce, 0).play()
      previousActiveButton.current = "sphere"

    } else if (pyramid_button_active && previousActiveButton.current !== "pyramid") {

      s1ToP1Action.setLoop(THREE.LoopOnce, 0).play()
      previousActiveButton.current = "pyramid"

    }
  }, [cube_button_active, sphere_button_active, pyramid_button_active])

  useFrame((state, delta) => {

    mixer.update(delta)

    state.camera.position.copy(myCamera.position)
    state.camera.quaternion.copy(myCamera.quaternion)
  })

  return <>
    <primitive object={ground} material={new THREE.MeshStandardMaterial({ color: 0x877763 })} />
    <primitive object={c1Mesh} ref={c1MeshRef} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}/>
    <primitive object={c2Mesh} ref={c2MeshRef} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}/>
    <primitive object={c3Mesh} ref={c3MeshRef} material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}/>

    <primitive object={s1Mesh} ref={s1MeshRef} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })}/>
    <primitive object={s2Mesh} ref={s2MeshRef} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })}/>
    <primitive object={s3Mesh} ref={s3MeshRef} material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })}/>

    <primitive object={p1Mesh} ref={p1MeshRef} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })}/>
    <primitive object={p2Mesh} ref={p2MeshRef} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })}/>
    <primitive object={p3Mesh} ref={p3MeshRef} material={new THREE.MeshStandardMaterial({ color: 0x0000ff })}/>
  </>
}

export default Scene

useGLTF.preload("./models/scene.glb");