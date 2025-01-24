# Buttons and pages
Each button corresponds to moving the camera to focus on a new primary camera.
The buttons also correspond to a group of 3d models. I specify that because of those dots on the side that I need. Those become highlighted when I'm looking at the group they correspond to. So I need a component that:
- adds a button to the header, and a dot on the side. 
- on button click the focus goes to the corresonding object
- When focus is on this component, there's a soft white color on the button and the dot
- when this component is not in focus, there's a translucent soft white color on the button and the dot 
- Scrolling advances to the next component

# CSS Responsive design
small screens `sm:` typically mean phones. **But you don't have to use it for mobile phones settings in Tailwind. Tailwind is mobile first**
medium screens `md:` typically mean tablets
large screens `lg:` typically means desktops and above

# Grouping a button and a dot
The buttons and the dots are in two distinct divs because they occupy different portions of the page. They share state though. When a button is active the dot is also active. It makes sense then to have one component responsible for both of them.

Here's an idea for using state and passing change state functions as props:
```js
// MyComponent.js
import React from "react";

const MyComponent = ({ setElement1, setElement2 }) => {
  return (
    <>
      <button onClick={() => setElement1(<p>Element 1</p>)}>
        Set Element 1
      </button>
      <button onClick={() => setElement2(<p>Element 2</p>)}>
        Set Element 2
      </button>
    </>
  );
};

// ParentComponent.js
import React, { useState } from "react";
import MyComponent from "./MyComponent";

const ParentComponent = () => {
  const [element1, setElement1] = useState(null);
  const [element2, setElement2] = useState(null);

  return (
    <>
      <MyComponent setElement1={setElement1} setElement2={setElement2} />
      <div>{element1}</div>
      <div>{element2}</div>
    </>
  );
};

export default ParentComponent;
```

Alternatively, there could be an `activeIndex` that gets shared between two distinct components. More fragile sure, but does it really matter at this scale?

# Global state
I've been having a lot of issues trying to share the state between the button group and the dot stack. Got recommended to try having a global state. So use zustand, have a store that contains the selected state, then drive the button styles off of that. Might also be good when I put in camera control logic because I will be able to pull from the store what scene I'm going to.

# Camera switching
There are primary camera postions for each group of models. The camera position, rotation, fov, etc can be copied from the destination camera object. The primary camera positions are where the camera goes when the user clicks the corresponding button. The secondary camera postions are sought by scroll. Scroll views all cameras as a list. It doesn't care about primary or secondary cameras. The camera also needs to follow the camera path when it switches cameras.

- [x] Button clicks switch camera to primary camera postions
- ~~[ ] Scroll wheel switches camera to next/previous camera in list~~ Deprecated in favor of navigating with buttons
- [ ] Camera switches follow a path
- [ ] Left and right buttons at bottom of the screen for in sequence between the models.

# Transforms in Blender
Make sure to only apply transformations on rotation and scale. Otherwise the origin of all objects gets set to the center. And thus the position of all objects will seem to be the center.

# Animations on scroll
TODO, look into using GSAP and have a timeline of camera positions on scroll triggers

Tried this first but the logic was very finnicky:
```js
/** 
 * There being 3 sections, each section would be 1/3 of the page away from each other.
* There are 3 models per section, and each model is 1/3 of the section away from each other.
* 
* If I find myself in a section, I then have to know what sub section I'm in. 
* i.e. I find I'm in section one, visible(0, 1/3)
* Then I need to know if I'm in sub-section 1: visible(0, (1/3)/3) aka 1/3 of the whole page divided by the 3 models in the section
*                               sub-section 2: visible((1/3)/3, (1/3)/3) aka The end of subsection 1, up to the start of subsection 2
*                               sub-section 3: visible(((1/3)/3)*2, (1/3)/3) aka The end of subsection 2, up to the end of the section
*/
if(scroll.visible(0, 1/3)) {
  // Scroll position is in section 1
  if (!cube_button_active) { 
    // The user just got to section 1, and setting this button active will trigger a camera change to
    // the primary camera
    setCubeButton() 
  } else {
    // The user is in section 1, and is scrolling to subsections.
    // Now we inquire, what subsection they are in.
    if(scroll.visible((1/3)/3, (1/3)/3)) {
      // The user is in subsection 2
      const cam = sceneCams.find(cam => cam.group === "cubes" && cam.position === 2);
      sceneCamsIndexRef.current = sceneCams.findIndex(cam => cam.group === "cubes" && cam.position === 2);
      camera.position.set(cam.cam.position.x, cam.cam.position.y, cam.cam.position.z)
      camera.rotation.set(cam.cam.rotation.x, cam.cam.rotation.y, cam.cam.rotation.z)

    } else if(scroll.visible(((1/3)/3)*2, (1/3)/3)) {
      // The user is in subsection 3
      const cam = sceneCams.find(cam => cam.group === "cubes" && cam.position === 3);
      sceneCamsIndexRef.current = sceneCams.findIndex(cam => cam.group === "cubes" && cam.position === 3);
      camera.position.set(cam.cam.position.x, cam.cam.position.y, cam.cam.position.z)
      camera.rotation.set(cam.cam.rotation.x, cam.cam.rotation.y, cam.cam.rotation.z)
    }
  }
} else if(scroll.visible(1/3, 1/3)) {
  if (!sphere_button_active) { setSphereButton() }
} else if(scroll.visible(2/3, 1/3)) {
  if (!pyramid_button_active) { setPyramidButton() }
}
```

# Animations with GSAP
GSAP has introduced a lot of abstraction, but it's also introduced quite a few bugs.

- [ ] Scrolling properly appears to require enough of the page to support all of the sections. The sections may also have to be associated with each of the page sections. That needs to be solved
- [x] If the page is becoming larger, the canvas, buttons, and dot stack are staying fixed a the top of the body instead of scrolling down with the page.
- [ ] The scroll bar is visible on the side
- [x] The buttons and dot stack aren't updating with the change of sections with GSAP. Makes sense because I don't think the logic is in place for that. That needs to happen in a decoupled way so the button store and actions don't have to be changed and so that they don't have to know about what's going on with GSAP. 
- [ ] In general the timings and animations are wonky right now.
- [ ] The buttons no longer control where the camera gets animated to.

Lots of bugs and logic undone, but I think organizing my website with pages and more in the way the DOM expects is a better way in general. Most libraries will expect my site to have actual pages so it would be good to build with that in mind (I think).

## Keeping the elements in view even with the body larger to accomodate scrolling
In the index.css I gave the body a height of 900vh to support each section being 100vh.
Wrapping everything in App.jsx in another div with `className="fixed w-full"` solved this problem.

Learned that the z index in css relates to only elements that have the same parent.

# Deciding on no scroll
I haven't been able to get the scroll trigger to work. I'm going to compromise on scope of the downstream project (the portfolio) and have the user navigate with buttons. I'll show forward and back buttons on the side or bottom of the screen.

# Finding point on path closest to camera position.
All cameras have a point on the path. The y of the path is adjusted because it doesn't make it over into the threejs scene. Need a search method where I can find the index on the path that is closest to the camera postion in the scene. That index, and the index of the current camera, will be fed to the motionPath to determine a relevant segment.

The curve in ThreeJs already has a method for getting the coordinate at a percentage through the curve. If I can determine where that camera is in terms of percentage around the curve, I can just query the curve directly for the point. Of course, if I have the percentage already, that's easier to use to determine the index on the path to use.

# Animation in blender
Camera movement can be animated in blender. Those keyframes can be fed into GSAP. That's the approach I'm going now.
