import React from 'react'

export default function Rect() {
  return (
    <svg>
      <g transform="translate(0.5,0.5)" style={{ visibility: 'visible' }}>
        <rect
          x="2.38"
          y="1.36"
          width="27.2"
          height="27.2"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.3"
          pointerEvents="all"
        ></rect>
      </g>
    </svg>
  )
}

// .svg-node {
//   left: 1px;
//   top: 1px;
//   width: 32px;
//   height: 30px;
//   display: block;
//   position: relative;
//   overflow: hidden;
// }
