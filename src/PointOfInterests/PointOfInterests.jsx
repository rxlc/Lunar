import React, { useState, useEffect } from 'react'
import './PointOfInterests.css'

export default function PointOfInterests() {
  const [points, setPoints] = useState([])

  useEffect(() => {
    document.addEventListener("updateDOMPoints", updateDOMPoints);
  }, [])

  const updateDOMPoints = (e) => {
    setPoints(e.detail)
  }

  return (
    <div>
      
      {points
        .filter((point) => point.type === "apollo")
        .map((point) => (
        <div key={point.id} className={`site ${point.id} clickable`}>
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
            <polygon points="75,15 15,135 135,135" fill="#b6720d" />
          </svg>
          <div className="text">{point.name}</div>
        </div>
      ))}

      {points
        .filter((point) => point.type === "apolloAlt")
        .map((point) => (
        <div key={point.id} className={`site ${point.id} clickable`}>
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
            <polygon points="75,15 15,135 135,135" fill="#b6720d" />
          </svg>
          <div className="text altText">{point.name}</div>
        </div>
      ))}
    </div>
  )
}
