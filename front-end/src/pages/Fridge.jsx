import React, { useState } from 'react'
import { FaClock } from 'react-icons/fa'
import Tip from '../components/Tip'
import { FaWindowClose } from 'react-icons/fa'
import { MdAccountCircle } from 'react-icons/md'
const items = [
  {
    name: 'Milk',
    store: 'Target',
    date: '2024-02-20',
    expDate: '2024-03-25',
    img: 'https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png',
  },
  {
    name: 'Milk',
    store: 'Target',
    date: '2024-02-20',
    expDate: '2024-03-25',
    img: 'https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png',
  },
  {
    name: 'Milk',
    store: 'Target',
    date: '2024-02-20',
    expDate: '2024-03-25',
    img: 'https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png',
  },
  {
    name: 'Milk',
    store: 'Target',
    date: '2024-02-20',
    expDate: '2024-03-25',
    img: 'https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png',
  },
  {
    name: 'Milk',
    store: 'Target',
    date: '2024-02-20',
    expDate: '2024-03-25',
    img: 'https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png',
  },

  {
    name: 'Eggs',
    store: 'Kroger',
    date: '2024-02-18',
    expDate: '2024-02-23',
    img: 'https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png',
  },
  {
    name: 'Bread',
    store: 'Whole Foods',
    date: '2024-02-17',
    expDate: '2024-02-22',
    img: 'https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png',
  },
  {
    name: 'Chicken',
    store: 'Costco',
    date: '2024-02-19',
    expDate: '2024-02-24',
    img: 'https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png',
  },
]
const Fridge = () => {
  const [allowDelete, setAllowDelete] = useState(true)
  const menuStyle = {
    transform: 'translateY(-50%)', // Centering vertically
    background: 'rgba(225, 241, 246, 0.6)',
    border: '4px solid #B3DEEA',
    backdropFilter: 'blur(15px)',
    borderRadius: '70px 0px 0px 70px',
    fontFamily: 'Inter, sans-serif',
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const monthAbbreviation = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate()

    return `${monthAbbreviation} ${day}`
  }

  const calculateExpiryDate = (dateString) => {
    return Math.floor(
      Math.abs(new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24)
    )
  }
  return (
    <div
      className="flex flex-row p-0 relative content-center bg-[#E9F9FE] w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url("/Fruits.png")`,
      }}
    >
      <button>
        <img
          src="./PanTreeLogo.png"
          alt="fridge"
          className="absolute top-0 left-0 w-1/2 h-1/2 h-[50px] w-[150px] ml-5 mt-5"
        />
      </button>
      <button>
        <MdAccountCircle className="absolute top-0 right-0 w-1/2 h-1/2 h-[50px] w-[50px] mr-5 mt-4" />
      </button>
      <div className="flex absolute right-3/4 top-2/4 flex-col justify-end items-center p-10 space-y-[50px] text-xl font-bold">
        <h1>Expiring Soon</h1>
        <h1>Remaining Items</h1>
      </div>
      <div className="absolute w-[850px] h-10 top-[150px] right-[100px] bg-[#E1F1F680] rounded-lg">
        <button
          className="flex items-center pl-5 pt-2 text-[#00799F] text-lg font-bold"
          onClick={() => setAllowDelete(!allowDelete)}
        >
          <FaWindowClose className="mr-2" style={{ color: '#00799F' }} />
          <p>DELETE</p>
        </button>
      </div>
      <div
        className="flex flex-col justify-between p-0 absolute bottom-0 right-0 h-auto w-3/4 z-10"
        style={menuStyle}
      >
        <div className="flex flex-row justify-between flex-wrap p-5">
          {items.map((item) =>
            calculateExpiryDate(item.expDate) < 7 ? (
              <div
                key={item.name}
                className="flex flex-row bg-white rounded-lg mb-4 p-4 relative m-4"
              >
                {allowDelete ? (
                  <Tip
                    className="absolute top-0 right-0"
                    allowDelete={allowDelete}
                  />
                ) : (
                  <Tip
                    className="absolute top-0 right-0"
                    allowDelete={allowDelete}
                  />
                )}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[75px] xl:h-[75px]"
                />
                <div className="flex flex-col">
                  <p className="text-xs lg:text-base md:text-sm sm:text-xs">
                    {item.name}
                  </p>
                  <p className="text-[8px] lg:text-xs md:text-[10px] sm:text-[8px]">
                    From {item.store} on {formatDate(item.date)}
                  </p>
                  <div className="bg-[#F9E3E3] rounded-lg p-1 flex items-center text-[8px] lg:text-xs md:text-[10px] sm:text-[8px]">
                    <FaClock className="mr-2" />
                    <p>
                      Expected expiry in {calculateExpiryDate(item.expDate)}{' '}
                      {calculateExpiryDate(item.expDate) === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
        <div className="ml-5 w-full h-1 bg-[#B3DEEA]"></div>
        <div className="flex flex-row justify-between flex-wrap p-5">
          {items.map((item) =>
            calculateExpiryDate(item.expDate) > 7 ? (
              <div
                key={item.name}
                className="flex flex-col items-center bg-white rounded-lg mb-4 p-4"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[75px] xl:h-[75px]"
                />

                <p className="text-xs lg:text-base md:text-sm sm:text-xs">
                  {item.name}
                </p>
                <div className="bg-[#DAEEDC] rounded-lg p-1 text-[8px] lg:text-xs md:text-[10px] sm:text-[8px] flex items-center">
                  <FaClock className="mr-2" />
                  <p>
                    Expires in{' '}
                    {Math.floor(calculateExpiryDate(item.expDate) / 7)}{' '}
                    {Math.floor(calculateExpiryDate(item.expDate) / 7) === 1
                      ? 'week'
                      : 'weeks'}
                  </p>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}

export default Fridge

/* Fridge */
