import React, { useState } from 'react'
import { GiStarFormation } from 'react-icons/gi'
import { FaWindowClose } from 'react-icons/fa'
const Tip = ({ allowDelete }) => {
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
        backgroundColor: allowDelete ? '#310098' : 'transparent',
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
      {allowDelete ? (
        isHovered ? (
          <p className="text-[0.5rem] p-1 text-white">
            Refigerate to extend by <span className="font-bold">3 days</span>
          </p>
        ) : (
          <GiStarFormation style={{ color: 'white' }} />
        )
      ) : (
        <FaWindowClose style={{ color: 'red' }} />
      )}
    </div>
  )
}

export default Tip
