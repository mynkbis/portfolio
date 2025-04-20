import { useState, useEffect, useRef } from "react"
import surya from "../../assets/Surya.jpg"

export default function About() {
  const [firstNameText, setFirstNameText] = useState("")
  const [lastNameText, setLastNameText] = useState("")
  const [showImage, setShowImage] = useState(false)

  const firstName = "SURYA"
  const lastName = "BISHT"
  const typingSpeed = 150
  const pauseBeforeLastName = 500

  const typingTimeoutRef = useRef(null)
  const currentIndexRef = useRef(0)
  const typingPartRef = useRef("first")

  useEffect(() => {
    const typeNextCharacter = () => {
      const currentIndex = currentIndexRef.current
      const typingPart = typingPartRef.current

      if (typingPart === "first") {
        if (currentIndex < firstName.length) {
          setFirstNameText((prev) => prev + firstName[currentIndex])
          currentIndexRef.current++
          typingTimeoutRef.current = setTimeout(typeNextCharacter, typingSpeed)
        } else {
          typingTimeoutRef.current = setTimeout(() => {
            typingPartRef.current = "last"
            currentIndexRef.current = 0
            typeNextCharacter()
          }, pauseBeforeLastName)
        }
      } else if (typingPart === "last") {
        if (currentIndex < lastName.length) {
          setLastNameText((prev) => prev + lastName[currentIndex])
          currentIndexRef.current++
          typingTimeoutRef.current = setTimeout(typeNextCharacter, typingSpeed)
        }
        setShowImage(true)

      }
    }

    typingTimeoutRef.current = setTimeout(typeNextCharacter, 500)

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }, [])

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-4 relative">
<div className="relative flex flex-col items-center">
        {/* First name */}
        <h1 className="font-bold text-teal-400 text-center tracking-wider"> 
            <span className="text-8xl md:text-[14rem]">{firstNameText}
            </span>
            </h1>

        {/* Image in the middle */}
        {showImage && (
            <div  className={`
                absolute top-[30%] md:top-[35%]
                bg-white p-1 rounded-full
                transition-all duration-900 ease-in
                 scale-100
                animate-fade-in
                ${lastNameText ==="BISHT" ? "opacity-100"  :"opacity-20" }
              `}>
            <div className=" w-15 md:w-30 md:h-40 rounded-full overflow-hidden border-4 border-white">
              <img
                src={surya}
                alt="Profile"
              />
            </div>
            </div>
        )}

        {/* Last name */}
        <h1 className=" font-bold text-teal-400 text-center tracking-wider">
        <span className="text-8xl md:text-[14rem]">{lastNameText}
            </span>
        </h1>
      </div>
    </div>
  )
}
