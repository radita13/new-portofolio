"use client"

import GitHubCalendar from "react-github-calendar"
import React, { useState, useEffect } from "react"

type ContributionDay = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

const Contributions = () => {
  const [monthsToShow, setMonthsToShow] = useState(12)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [showTotalCount, setShowTotalCount] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      setIsSmallScreen(width < 300)
      setShowTotalCount(width >= 640)

      // Show months based on screen width
      if (width > 1024) {
        setMonthsToShow(10)
      } else if (width > 768) {
        setMonthsToShow(8)
      } else if (width > 640) {
        setMonthsToShow(6)
      } else if (width > 420) {
        setMonthsToShow(3)
      } else {
        setMonthsToShow(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Function to filter data based on number of months to show
  const selectDataRange = (
    contributions: ContributionDay[],
    months: number
  ) => {
    const today = new Date()
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth() - months + 1,
      1
    )

    return contributions.filter((day: ContributionDay) => {
      return new Date(day.date) >= startDate
    })
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="mb-8 px-5 text-left text-4xl font-semibold sm:px-0 sm:text-center md:text-6xl">
        GitHub Stats 💻
      </h2>
      <div className="flex w-full items-center justify-center px-5 md:px-15">
        <GitHubCalendar
          username="radita13"
          transformData={(contribs) => selectDataRange(contribs, monthsToShow)}
          fontSize={isSmallScreen ? 13 : 16}
          blockSize={isSmallScreen ? 13 : 16}
          blockMargin={5}
          hideTotalCount={!showTotalCount}
        />
      </div>
    </div>
  )
}

export default Contributions
