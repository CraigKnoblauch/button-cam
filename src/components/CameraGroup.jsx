import { useEffect } from "react"

const CameraGroup = ({ label, setButton, setDot }) => {
    
    useEffect(() => {
        const button = <button
            key={label + "_button"}
            id={label}
            onMouseEnter={() => console.log("Mouse entered " + label)}
            onMouseLeave={() => console.log("Mouse left " + label)}
            onClick={() => console.log("Clicked " + label)}
            >
                {label}
        </button>

        const dot = <span
            key={label + "_dot"}
            id={label + "_dot"}
            className="w-2 h-2 bg-gray-500 rounded-full"
            style={{ backgroundColor: 'gray' }}
        ></span>

        // Check to make sure this button or dot doesn't already exist
        setButton(buttons => {
            if (!buttons.some(b => b.key === button.key)) {
                return [...buttons, button];
            }
            return buttons;
        });
        setDot(dots => {
            if (!dots.some(d => d.key === dot.key)) {
                return [...dots, dot];
            }
            return dots;
        });

    }, [label, setButton, setDot])

    return null
}

export default CameraGroup