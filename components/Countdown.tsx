import { useEffect, useState } from "react"

const Countdown: React.FC = () => {
  const currentDate: any = new Date()
  const targetDate: any = new Date("2023-02-22 00:00")
  const timeDiffHrs: number = Math.ceil(
    (targetDate - currentDate) / (1000 * 60 * 60)
  )
  const numOfDays: number = Math.floor(timeDiffHrs / 24)
  const numOfHrs: number = timeDiffHrs % 24

  const [timeDiff, setTimeDiff] = useState({ numOfDays, numOfHrs })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDiff({ numOfDays, numOfHrs })
    }, 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-nav_bg border-2 border-neutral rounded-2xl flex w-2/3 md:w-1/2 h-[60px] justify-evenly items-center m-auto  ">
      <div className="text-title text-center">
        <p className="text-3xl leading-7">{timeDiff.numOfDays}</p>
        <p className="text-xs font-sans">days</p>
      </div>
      <div className="text-title text-center">
        <p className="text-3xl leading-7">{timeDiff.numOfHrs}</p>
        <p className="text-xs font-sans">hours</p>
      </div>
    </div>
  )
}

export default Countdown
