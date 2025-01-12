import { useEffect } from "react"
import { useButtonStore } from "src/stores/ButtonStore"

const CameraGroup = ({ label, appendButton, appendDot }) => {

    const { selectedButton, setSelectedButton } = useButtonStore()

    useEffect(() => {
        const button = <button
            key={label + "_button"}
            id={label}
            onMouseEnter={() => console.log("Mouse entered " + label)}
            onMouseLeave={() => console.log("Mouse left " + label)}
            onClick={() => setSelectedButton(label)}
            >
                {label}
        </button>

        const dot = <span
            key={label + "_dot"}
            id={label + "_dot"}
            className="w-2 h-2 bg-gray-500 rounded-full"
            style={{ backgroundColor: selectedButton == label ? 'green': 'blue' }}
        ></span>

        // Check to make sure this button or dot doesn't already exist
        appendButton(buttons => {
            if (!buttons.some(b => b.key === button.key)) {
                return [...buttons, button];
            }
            return buttons;
        });

        // Trying to replace the dot when there's a change, check if the dot is there and 
        // replace it.
        appendDot(dots => {
            
            const dotIndex = dots.findIndex(d => d.key === dot.key);
            if (dotIndex !== -1) {
                dots[dotIndex] = dot;
            } else {
                dots.push(dot);
            }

            return dots;
        });

    }, [label, appendButton, appendDot, selectedButton, setSelectedButton])
    console.log("Selected button: " + selectedButton)
    return null
}

export default CameraGroup