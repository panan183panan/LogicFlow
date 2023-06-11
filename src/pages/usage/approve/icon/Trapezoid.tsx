import React from 'react'

export default function Trapezoid() {
  return (
    <svg className="svg-node">
      <g transform="translate(0.5,0.5)" style={{visibility: 'visible'}}>
        <polygon
          points="5.32,0 22.68,0 28,28 0,28"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.3"
          pointerEvents="all"
        ></polygon>
      </g>
    </svg>
  )
}
