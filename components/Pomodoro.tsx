import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore"
import { motion } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar"
import { db } from "../utils/firebaseConfig"
import { Context } from "./UserContext"

interface Session {
  workTime: number
  breakTime: number
}

export default function Pomodoro() {
  const SHORT_SESSION: Session = {
    workTime: 25 * 60,
    breakTime: 5 * 60,
  }
  const LONG_SESSION: Session = {
    workTime: 50 * 60,
    breakTime: 10 * 60,
  }

  const { user } = useContext(Context)
  const initialStreak = getDailyStreak()

  const [workTime, setWorkTime] = useState(SHORT_SESSION.workTime)
  const [breakTime, setBreakTime] = useState(SHORT_SESSION.breakTime)
  const [timer, setTimer] = useState(SHORT_SESSION.workTime)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [mode, setMode] = useState("work")
  const [isTimeLengthShort, setIsTimeLengthShort] = useState(true)
  const [dailyStreak, setDailyStreak] = useState(initialStreak)
  const [isLoading, setIsLoading] = useState(true)

  function handleClick() {
    setIsTimerRunning((prevState) => !prevState)
  }

  function switchMode() {
    setMode((prevMode) => (prevMode === "work" ? "break" : "work"))
    mode === "work" ? setTimer(breakTime) : setTimer(workTime)

    if (user === "Guest-1" || user === "Guest-2") {
      return
    }
    addDoc(collection(db, `${user}/data/timer`), {
      timestamp: serverTimestamp(),
      author: user,
      children: workTime,
    })
  }

  async function getDailyStreak() {
    // query firebase firestore
    if (user === "Guest-1" || user === "Guest-2") {
      return
    }
    const today = new Date().setHours(0, 0, 0, 0) / 1000
    const querySnapshot = await getDocs(collection(db, `${user}/data/timer`))
    const docArr = []
    querySnapshot.forEach((doc) => {
      if (doc.data().timestamp.seconds > today) {
        docArr.push(doc.data())
      }
    })
    const sum = docArr.reduce((acc, o) => acc + parseInt(o.children), 0)
    setDailyStreak(sum)
    setIsLoading(false)
  }

  function endCycle() {
    setIsTimerRunning(false)
    setMode("work")
    setTimer(workTime)
    getDailyStreak()
  }

  function toggleLength() {
    setIsTimeLengthShort(!isTimeLengthShort)
    const switchLength = !isTimeLengthShort
      ? SHORT_SESSION.workTime
      : LONG_SESSION.workTime
    setWorkTime(switchLength)
    setBreakTime(
      !isTimeLengthShort ? SHORT_SESSION.breakTime : LONG_SESSION.breakTime
    )
    setTimer(switchLength)
  }

  useEffect(() => {
    if (mode === "break" && timer === 0) {
      endCycle()
    } else if (isTimerRunning && timer > 0) {
      const runningTimer = setTimeout(
        () => setTimer((prevState) => prevState - 1),
        1000
      )
      //clean-up function
      return () => clearTimeout(runningTimer)
    } else if (isTimerRunning && timer === 0) {
      switchMode()
    }
  }, [timer, isTimerRunning])

  function convertHMS(val) {
    const mins = Math.floor(val / 60)
    let secs: any = val % 60
    if (secs < 10) secs = "0" + secs
    return mins + ":" + secs
  }
  const valPerc =
    mode === "work" ? (timer / workTime) * 100 : (timer / breakTime) * 100
  const toggleCSS = isTimeLengthShort ? "justify-start" : "justify-end"
  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  }

  return (
    <>
      <div className="text-center text-xl text-title mb-2">
        {isLoading
          ? "DAILY STREAK: 0:00"
          : `DAILY STREAK: ${convertHMS(dailyStreak)}`}
      </div>
      <motion.div
        className="cursor-pointer w-[70%] xs:w-[100%] m-auto"
        onClick={() => handleClick()}
        // whileHover={{
        //   scale: 1.025,
        //   transition: { duration: 0.5 },
        // }}
        whileTap={{ scale: 0.975 }}
      >
        <CircularProgressbarWithChildren
          className="p-4"
          value={valPerc}
          background
          backgroundPadding={8}
          strokeWidth={3}
          styles={buildStyles({
            pathColor: mode === "work" ? "#F86F72" : "#50933F",
            trailColor: "transparent",
            strokeLinecap: "rounded",
          })}
        >
          <div className="text-7xl mt-2 text-title">{convertHMS(timer)}</div>
          <p className="mt-6 font-sans tracking-[8px] text-title text-xs">
            {isTimerRunning ? "PAUSE" : "START"}
          </p>
        </CircularProgressbarWithChildren>
      </motion.div>
      <div className="w-1/3 h-[30px] m-auto mt-2 flex">
        <button
          onClick={() => toggleLength()}
          className={"w-full flex bg-neutral rounded-full " + toggleCSS}
        >
          <motion.div
            className="w-[30px] h-[30px] p-[10px] cursor-pointer rounded-full bg-[#f86f72]"
            layout
            transition={spring}
          ></motion.div>
        </button>
      </div>
    </>
  )
}
