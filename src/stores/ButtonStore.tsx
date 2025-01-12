import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ButtonState {
  cube_button_active: boolean
  sphere_button_active: boolean
  pyramid_button_active: boolean
  setCubeButton: () => void
  setSphereButton: () => void
  setPyramidButton: () => void
}

export const useButtonStore = create<ButtonState>()(
  devtools(
    (set) => ({
      cube_button_active: true,
      sphere_button_active: false,
      pyramid_button_active: false,
      setCubeButton: () => set({ cube_button_active: true, sphere_button_active: false, pyramid_button_active: false }),
      setSphereButton: () => set({ cube_button_active: false, sphere_button_active: true, pyramid_button_active: false }),
      setPyramidButton: () => set({ cube_button_active: false, sphere_button_active: false, pyramid_button_active: true })
    })
  )
)


// const useButtonStore = create(devtools(set) => ({
//   selectedButton: null,
//   setSelectedButton: (label) => {
//     console.log("set button to " + label)
//     set({ selectedButton: label })
//   }
// ))

// export default useButtonStore;

