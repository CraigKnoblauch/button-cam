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
- [ ] Scroll wheel switches camera to next/previous camera in list 
- [ ] Camera switches follow a path

# Transforms in Blender
Make sure to only apply transformations on rotation and scale. Otherwise the origin of all objects gets set to the center. And thus the position of all objects will seem to be the center.