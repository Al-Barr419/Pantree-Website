import React, { useState } from 'react'
import { GiStarFormation } from 'react-icons/gi'
import { FaWindowClose } from 'react-icons/fa'
const Tip = () => {
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = () => {
    setIsHovered(!isHovered)
  }

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      style={{
        width: isHovered ? 'auto' : '20px',
        height: '20px',
        backgroundColor: '#310098',
        transition: 'width 0.5s',
        padding: '1px',
        overflow: 'hidden',
        cursor: 'pointer',
        top: '-10px',
        right: '-10px',
        position: 'absolute',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {isHovered ? (
        <p className="text-[0.5rem] p-1 text-white">
          Refigerate to extend by <span className="font-bold">3 days</span>
        </p>
      ) : (
        <GiStarFormation style={{ color: 'white' }} />
      )}
    </div>
  )
}

export default Tip
