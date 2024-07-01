"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState, useCallback } from "react"
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar"
import { cn } from "../utils/utils"

interface Session {
  workTime: number
  breakTime: number
}

export default function Pomodoro() {
  const SHORT_SESSION: Session = {
    workTime: 2 * 60,
    breakTime: 1 * 60,
  }
  const LONG_SESSION: Session = {
    workTime: 50 * 60,
    breakTime: 10 * 60,
  }

  const [workTime, setWorkTime] = useState(SHORT_SESSION.workTime)
  const [breakTime, setBreakTime] = useState(SHORT_SESSION.breakTime)
  const [timer, setTimer] = useState(SHORT_SESSION.workTime)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [mode, setMode] = useState("work")
  const [isTimeLengthShort, setIsTimeLengthShort] = useState(true)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const switchMode = useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === "work" ? "break" : "work"
      setTimer(newMode === "work" ? workTime : breakTime)
      return newMode
    })
  }, [breakTime, workTime])

  const endCycle = useCallback(() => {
    setIsTimerRunning(false)
    setMode("work")
    setTimer(workTime)
  }, [workTime])

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            switchMode()
            return prevTimer
          }
          return prevTimer - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isTimerRunning, switchMode])

  useEffect(() => {
    if (mode === "break" && timer === 0) {
      endCycle()
    } else if (isTimerRunning && timer > 0) {
      const runningTimer = setTimeout(
        () => setTimer((prevState) => prevState - 1),
        1000
      )
      // Clean-up function
      return () => clearTimeout(runningTimer)
    } else if (isTimerRunning && timer === 0) {
      switchMode()
    }
  }, [timer, isTimerRunning, endCycle, switchMode, mode])

  function handleClick() {
    setIsTimerRunning((prevState) => !prevState)
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

  function convertHMS(val: number) {
    const mins = Math.floor(val / 60)
    let secs: string | number = val % 60
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
      <div className='text-center text-xl text-title mb-2 font-black'>
        {/* ${convertHMS(dailyStreak)} */}
        DAILY STREAK: 0:00
      </div>
      <motion.div
        className='cursor-pointer w-[100%] xs:w-[70%] m-auto'
        onClick={() => handleClick()}
        whileTap={{ scale: 0.975 }}
      >
        <CircularProgressbarWithChildren
          className='p-4'
          value={valPerc}
          background
          backgroundPadding={8}
          strokeWidth={3}
          styles={buildStyles({
            pathColor: mode === "work" ? "#F86F72" : "#50933F",
            trailColor: "transparent",
            strokeLinecap: "rounded",
            backgroundColor: "var(--color-dark)",
          })}
        >
          <div className='text-7xl mt-2 text-title font-black'>
            {convertHMS(timer)}
          </div>
          <p className='mt-6 font-sans tracking-[8px] text-title text-xs'>
            {isTimerRunning ? "PAUSE" : "START"}
          </p>
        </CircularProgressbarWithChildren>
      </motion.div>
      <div className='w-1/3 h-[30px] m-auto mt-2 flex'>
        <button
          onClick={() => toggleLength()}
          className={cn(
            "w-full flex bg-dark rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-neutral focus:ring-offset-2",
            toggleCSS
          )}
        >
          <motion.div
            className='w-[30px] h-[30px] p-[10px] cursor-pointer rounded-full bg-[#f86f72]'
            layout
            transition={spring}
          ></motion.div>
        </button>
      </div>
    </>
  )
}
