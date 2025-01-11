import { useEffect } from "react"

const CameraGroup = ({ label, setButton, setDot }) => {
    
    useEffect(() => {
        const button = <button
            key={label}
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

        setButton(buttons => [...buttons, button] );
        setDot(dots => [...dots, dot] );

    }, [label, setButton, setDot])

    return null
}

export default CameraGroup