import { useEffect, useRef, useState } from "react"

export const useDynamicHeight = (offset: 0) => {
  const [containerHeight, setContainerHeight] = useState(0)
  const containerRef = useRef(null)

  const handleResize = (): void => {
    const windowHeight = window.innerHeight
    const availHeight = windowHeight - offset
    setContainerHeight(availHeight)
  }

  useEffect(() => {
    const containerEl = containerRef.current
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(containerEl)

    return () => {
      resizeObserver.unobserve(containerEl)
    }
  }, [offset])

  return { containerRef, containerHeight }
}
