import { useEffect } from "react"

const CameraGroup = ({ label, setButton, setDot }) => {
    
    useEffect(() => {
        const button = <button
            id={label}
            onMouseEnter={() => console.log("Mouse entered " + label)}
            onMouseLeave={() => console.log("Mouse left " + label)}
            onClick={() => console.log("Clicked " + label)}
            >
                {label}
        </button>

        const dot = <span
            id={label + "_dot"}
            className="w-2 h-2 bg-gray-500 rounded-full"
            style={{ backgroundColor: 'gray' }}
        ></span>

        setButton(button)
        setDot(dot)

    }, [label, setButton, setDot])

    return null
}

export default CameraGroup