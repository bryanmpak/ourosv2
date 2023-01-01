import { motion } from "framer-motion"

export default function Header() {
  return (
    <div className="flex gap-6 md:gap-12 p-2">
      <div className="text-5xl tracking-tighter text-title">
        <p>our</p>
        <p className="leading-10">OS</p>
      </div>
      <div className="w-full h-4 border-t mt-7"></div>
      <div className="mt-3">
        <div className="flex cursor-pointer rounded-full p-[2px] bg-dark border-neutral border-2 w-[60px] h-[30px] justify-start items-center">
          <motion.div
            className="bg-neutral border-light border-2 w-[24px] h-[24px] rounded-full"
            layout
            transition={spring}
          />
        </div>
        <div className="mt-1 ml-1 text-xl leading-5 tracking-tighter text-title">
          <p>2022</p>
          <p>12</p>
        </div>
      </div>
    </div>
  )
}

const spring: {} = {
  type: "spring",
  stiffness: 700,
  damping: 30,
}
