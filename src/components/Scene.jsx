import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useButtonStore } from "src/stores/ButtonStore";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/src/all";
// https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollToPlugin.min.js

const Scene = () => {
    const { scene } = useGLTF("./models/scene.glb");

      const findModelByName = (name) => {
        let foundModel = null;
        scene.traverse((child) => {
          if (child.name === name) {
            foundModel = child;
          }
        });
        return foundModel;
      };

      // console.log(scene)
      const ground = findModelByName("ground");

      const track = findModelByName("cam_path");
      const points = track.geometry.attributes.position.array

      const trackHeight = 1.5
      const trackDivisions = 50000

      const vec3Points = []
      for (let i = 0; i < points.length; i += 3) {
          vec3Points.push(new THREE.Vector3(points[i], points[i + 1] + trackHeight, points[i + 2]))
      }

      // Create a CatmullRomCurve3 from the track's vector3 points. 
      // This points on this curve will be used to move the camera along the track
      const trackCurve = new THREE.CatmullRomCurve3(vec3Points, true, 'catmullrom')
      const trackPoints = trackCurve.getPoints(trackDivisions)
      const trackPointsRef = useRef(trackPoints)
      
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

      const { 
        cube_button_active, sphere_button_active, pyramid_button_active,
        setCubeButton, setSphereButton, setPyramidButton
      } = useButtonStore()

      const { camera } = useThree()

      // Set initial camera position
      // useEffect(() => {
      //   camera.position.set(c1cam.cam.position.x, c1cam.cam.position.y, c1cam.cam.position.z)
      //   camera.rotation.set(c1cam.cam.rotation.x, c1cam.cam.rotation.y, c1cam.cam.rotation.z)
      // }, [])

      gsap.registerPlugin(MotionPathPlugin)
      // gsap.registerPlugin(ScrollTrigger)
      // gsap.registerPlugin(ScrollToPlugin)

      /**
       * NOTE: Avoiding the use of snap for now until I know more. I was seeing this behavior where when I was scrolling to a new section
       * The scroll bar and the animation would pull back on its own. That behavior goes away if I don't have snap.
       */
      // const timeline = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: 'body',
      //     start: 'top top',
      //     end: 'bottom bottom',
      //     scrub: true,
      //     // pin: true,
      //     snap: {
      //       snapTo: 'labels',
      //       duration: { min: 0.1, max: 0.1 }
      //     }
      //   }
      // })

      // // add animations and labels to the timeline
      // /**
      //  * NOTE: If setting buttons here, they should go at the beginning of a label with no delay
      //  * NOTE: fromTo needed further down the timeline to assure transitions from correct model positions. See this in the docs:
      //  * https://gsap.com/resources/st-mistakes/#creating-to-logic-issues
      //  */
      // timeline.addLabel('cubes')
      //         .call(setCubeButton)
      //         .to(camera.position, { x: c1cam.cam.position.x, y: c1cam.cam.position.y, z: c1cam.cam.position.z })
      //         .to(camera.rotation, { x: c1cam.cam.rotation.x, y: c1cam.cam.rotation.y, z: c1cam.cam.rotation.z })
      //         .addLabel('spheres')
      //         .call(setSphereButton)
      //         .fromTo(camera.position, { x: c1cam.cam.position.x, y: c1cam.cam.position.y, z: c1cam.cam.position.z }, { x: s1cam.cam.position.x, y: s1cam.cam.position.y, z: s1cam.cam.position.z })
      //         .fromTo(camera.rotation, { x: c1cam.cam.rotation.x, y: c1cam.cam.rotation.y, z: c1cam.cam.rotation.z }, { x: s1cam.cam.rotation.x, y: s1cam.cam.rotation.y, z: s1cam.cam.rotation.z })
      //         .addLabel('pyramids')
      //         .call(setPyramidButton)
      //         .fromTo(camera.position, { x: s1cam.cam.position.x, y: s1cam.cam.position.y, z: s1cam.cam.position.z }, { x: p1cam.cam.position.x, y: p1cam.cam.position.y, z: p1cam.cam.position.z })
      //         .fromTo(camera.rotation, { x: s1cam.cam.rotation.x, y: s1cam.cam.rotation.y, z: s1cam.cam.rotation.z }, { x: p1cam.cam.rotation.x, y: p1cam.cam.rotation.y, z: p1cam.cam.rotation.z })
              

      const previousActiveButton = useRef(null)

      useEffect(() => {
        // The behavior I'm looking for: https://codepen.io/GreenSock/pen/bGexQpq
        if (cube_button_active) {
          gsap.to(camera.position, { motionPath: trackPoints.slice(0, trackDivisions/3), duration: 1 }) //x: c1cam.cam.position.x, y: c1cam.cam.position.y, z: c1cam.cam.position.z, duration: 1} )
          gsap.to(camera.rotation, { x: c1cam.cam.rotation.x, y: c1cam.cam.rotation.y, z: c1cam.cam.rotation.z, duration: 1} )
        } else if (sphere_button_active) {
          gsap.to(camera.position, { motionPath: trackPoints.slice(trackDivisions/3, trackDivisions/3*2), duration: 1 }) // { x: s1cam.cam.position.x, y: s1cam.cam.position.y, z: s1cam.cam.position.z, duration: 1 })
          gsap.to(camera.rotation, { x: s1cam.cam.rotation.x, y: s1cam.cam.rotation.y, z: s1cam.cam.rotation.z, duration: 1 })
        } else if (pyramid_button_active) {
          gsap.to(camera.position, { motionPath: trackPoints.slice(trackDivisions/3*2, trackDivisions-1), duration: 1 }) // { x: p1cam.cam.position.x, y: p1cam.cam.position.y, z: p1cam.cam.position.z, duration: 1 })
          gsap.to(camera.rotation, { x: p1cam.cam.rotation.x, y: p1cam.cam.rotation.y, z: p1cam.cam.rotation.z, duration: 1 })
        }


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