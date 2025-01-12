import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ButtonState {
  selectedButton: string | null
  setSelectedButton: (label: string) => void
}

export const useButtonStore = create<ButtonState>()(
  devtools(
    (set) => ({
      selectedButton: null,
      setSelectedButton: (label) => {
        console.log("set button to " + label)
        set({ selectedButton: label })
      }
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

