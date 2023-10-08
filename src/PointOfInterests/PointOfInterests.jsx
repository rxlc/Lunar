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
          <div className="text apolloText">{point.name}</div>
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

      {points
        .filter((point) => point.type === "sea")
        .map((point) => (
          <div key={point.id} className={`site ${point.id}`}>
              <svg className="icon" width="20" height="20">
                <rect width="20" height="20" fill="#826aed"/>
              </svg>
          <div className="text moonText">{point.name}</div>
        </div>
      ))}

      {points
        .filter((point) => point.type === "mountain")
        .map((point) => (
          <div key={point.id} className={`site ${point.id}`}>
              <svg className="icon" width="25" height="25">
                <polygon points="0,0 12.5,25 25,0" fill="#00b4d8" />
              </svg>
          <div className="text mtText">{point.name}</div>
        </div>
      ))}
    </div>
  )
}
