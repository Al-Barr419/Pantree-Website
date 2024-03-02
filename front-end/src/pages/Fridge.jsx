import React, { useState, useEffect } from 'react'
import { FaClock } from 'react-icons/fa'
import Tip from '../components/Tip'
import { FaWindowClose } from 'react-icons/fa'
import { MdAccountCircle } from 'react-icons/md'
import { auth } from '../Firebase'
import { useNavigate } from 'react-router-dom'
const expiry_info = [
  {
    'Mon Feb 26 2024 18:00:00 GMT-0500 (Eastern Standard Time)': {
      strawberries: {
        image: 'https://www.example.com/strawberries.png',
        purchase_date:
          'Mon Feb 19 2024 18:00:00 GMT-0500 (Eastern Standard Time)',
      },
      apples: {
        image: 'https://www.example.com/apples.png',
        purchase_date:
          'Mon Feb 20 2024 18:00:00 GMT-0500 (Eastern Standard Time)',
      },
    },
  },
  {
    'Mon Feb 27 2024 20:00:00 GMT-0500 (Eastern Standard Time)': {
      lemons: {
        image: 'https://www.example.com/strawberries.png',
        purchase_date:
          'Mon Feb 17 2024 18:00:00 GMT-0500 (Eastern Standard Time)',
      },
      cucumber: {
        image: 'https://www.example.com/apples.png',
        purchase_date:
          'Mon Feb 20 2024 18:00:00 GMT-0500 (Eastern Standard Time)',
      },
    },
  },
]
const Fridge = () => {
  // userData holds all the data about the signed in user from the db
  const [userData, setUserData] = useState(null)
  const [allowDelete, setAllowDelete] = useState(true)
  const [expiryInfo, setExpiryInfo] = useState(null)
  let navigate = useNavigate()
  const routeChange = () => {
    let path = `/`
    navigate(path)
  }

  const signInAuthClick = () => {
    let path = `/auth`
    navigate(path)
  }

  useEffect(() => {
<<<<<<< Updated upstream
    const getUserData = async () => {
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken()
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user-data`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log('yp')
        const data = await response.json()
        setUserData(data)
        console.log('User authenticated', data)
        setExpiryInfo(data.expiry_info)
      }
    }
    getUserData()
  }, [])
=======
    const dummyData = {
      "Thu Mar 14 2024 18:00:00 GMT-0400 (Eastern Daylight Time)": [
        {
          "clementine": {
            "image": "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_f7b4788b-7c3d-4235-b84f-7d3d2dfb398f.png",
            "purchase_date": "Wed Feb 28 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          }
        }
      ],
      "Fri Mar 01 2024 18:00:00 GMT-0500 (Eastern Standard Time)": [
        {
          "strawberries": {
            "image": "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_d440fb68-d67b-4f16-995d-a398879dcb85.jpg",
            "purchase_date": "Wed Feb 28 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          }
        }
      ],
      "Wed Mar 06 2024 18:00:00 GMT-0500 (Eastern Standard Time)": [
        {
          "mission blueberries": {
            "image": "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_5b1b06b0-92f3-472a-bfcc-0b9ad4074b52.jpg",
            "purchase_date": "Wed Feb 28 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          }
        },
        {
          "anjou pear": {
            "image": "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_0de36304-cdcb-49fd-931e-550526089113.jpg",
            "purchase_date": "Wed Feb 28 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          }
        }
      ]
    };
    // Directly set the userData state with the dummy data
    setUserData({ expiry_info: dummyData });
    // const getUserData = async () => {
    //   if (auth.currentUser) {
    //     const token = await auth.currentUser.getIdToken();
    //     const response = await fetch(
    //       `${process.env.REACT_APP_BACKEND_URL}/api/user-data`,
    //       {
    //         method: "GET",
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     console.log("yp");
    //     const data = await response.json();
    //     setUserData(data);
    //     console.log("User authenticated", data);
    //     setExpiryInfo(data.expiry_info);
    //   }
    // };
    // getUserData();
  }, []);
>>>>>>> Stashed changes

  const menuStyle = {
    background: 'rgba(225, 241, 246, 0.6)',
    border: '4px solid #B3DEEA',
    backdropFilter: 'blur(15px)',
    borderRadius: '70px 0px 0px 70px',
    fontFamily: 'Inter, sans-serif',
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const monthAbbreviation = date.toLocaleString('default', {
      month: 'short',
    })
    const day = date.getDate()

    return `${monthAbbreviation} ${day}`
  }

  const calculateExpiryDate = (dateString) => {
    // commented out because the absolute value does not reflect that the food has already expired
    // return Math.floor(
    //   // Math.abs(new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24)
    //   (new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24)
    // );
    return Math.ceil(
      (new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24)
    )
  }

  const deleteItem = async (itemName, expiryDate) => {
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('User not authenticated')
      }
      const token = await user.getIdToken()

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/delete-item`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ itemName, expiryDate }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete item')
      }

      const result = await response.json()
      console.log('Item deleted successfully:', result)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
  return (
    <div
      className="flex flex-col p-0 relative content-center bg-[#E9F9FE] w-full h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url("/Fruits2.png")`,
      }}
    >
      <button onClick={routeChange}>
        <img
          src="/Logo.png"
          alt="fridge"
          className="absolute top-0 left-0 w-1/2 h-1/2 h-[50px] w-[150px] ml-5 mt-5"
        />
      </button>
      <button onClick={signInAuthClick}>
        <MdAccountCircle className="absolute top-0 right-0 w-1/2 h-1/2 h-[50px] w-[50px] mr-5 mt-4" />
      </button>
      {userData ? (
        <>
          <div
            className="flex flex-col justify-between p-0 absolute bottom-0 right-0 h-auto w-3/4 z-10"
            style={menuStyle}
          >
            {/* Expiring Soon Section */}
            <div className="delete button pl-12">
            <button
              className="rounded-l-lg w-dvw flex items-center pl-5 pt-2 text-[#00799F] text-lg font-bold "
              style={{ backgroundColor: 'rgba(225, 241, 246, 0.5)'}} // Added backgroundColor here
              onClick={() => setAllowDelete(!allowDelete)}
            >
              <FaWindowClose className="mr-2" style={{ color: '#00799F' }} />
              <p>DELETE</p>
            </button>
            </div>
            <div className="p-4 pl-8">
              <p className="text-lg text-[#00799F]">Expiring Soon</p>
            </div>
            <div className="flex flex-row justify-between flex-wrap p-5">
              {userData &&
                Object.keys(userData['expiry_info'])
                  .reverse()
                  .map((date) => {
                    console.log(userData['expiry_info'])
                    if (calculateExpiryDate(date) <= 7) {
                      const items = userData['expiry_info'][date]
                      console.log('items', items)
                      // Use return to return the result of map
                      return items.map((item) => {
                        const itemName = Object.keys(item)[0]
                        const itemDetails = item[itemName]
                        // Return JSX element
                        return (
                          <div
                            key={itemName}
                            className="flex flex-row bg-white rounded-lg mb-4 p-4 relative m-4"
                          >
                            {allowDelete ? (
                              <Tip
                                className="absolute top-0 right-0"
                                allowDelete={allowDelete}
                              />
                            ) : (
                              <button
                                onClick={() =>
                                  console.log('clicked', itemName, date)
                                }
                              >
                                <Tip
                                  className="absolute top-0 right-0"
                                  allowDelete={allowDelete}
                                />
                              </button>
                            )}
                            <img
                              src={itemDetails.image}
                              alt={itemName}
                              className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[75px] xl:h-[75px]"
                            />
                            <div className="flex flex-col">
                              <p className="text-xs lg:text-base md:text-sm sm:text-xs">
                                {itemName.charAt(0).toUpperCase() +
                                  itemName.slice(1)}
                              </p>
                              <p className="text-[8px] lg:text-xs md:text-[10px] sm:text-[8px]">
                                From Instacart on{' '}
                                {formatDate(itemDetails.purchase_date)}
                              </p>
                              <div className="bg-[#F9E3E3] rounded-lg p-1 flex items-center text-[8px] lg:text-xs md:text-[10px] sm:text-[8px]">
                                <FaClock className="mr-2" />
                                <p>
                                  Expected expiry in {calculateExpiryDate(date)}{' '}
                                  {calculateExpiryDate(date) === 1
                                    ? 'day'
                                    : 'days'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  })}
            </div>

            <div className="ml-5 w-full h-1 bg-[#B3DEEA]"></div>
            {/* Remaining Items Section */}
            <div className="p-4 pl-8">
              <p className="text-lg text-[#00799F]">Remaining Items</p>
            </div>
            <div className="flex flex-row justify-between flex-wrap p-5">
              {userData &&
                Object.keys(userData['expiry_info'])
                  .reverse()
                  .map((date) => {
                    console.log(userData['expiry_info'])
                    if (calculateExpiryDate(date) > 7) {
                      const items = userData['expiry_info'][date]
                      console.log('items', items)
                      // Use return to return the result of map
                      return items.map((item) => {
                        const itemName = Object.keys(item)[0]
                        const itemDetails = item[itemName]
                        // Return JSX element
                        return (
                          <div
                            key={itemName}
                            className="flex flex-col items-center bg-white rounded-lg mb-4 p-4"
                          >
                            <img
                              src={itemDetails.image}
                              alt={itemName}
                              className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[75px] xl:h-[75px]"
                            />

                            <p className="text-xs lg:text-base md:text-sm sm:text-xs">
                              {itemName}
                            </p>
                            <div className="bg-[#DAEEDC] rounded-lg p-1 text-[8px] lg:text-xs md:text-[10px] sm:text-[8px] flex items-center">
                              <FaClock className="mr-2" />
                              <p>
                                Expires in{' '}
                                {Math.floor(calculateExpiryDate(date) / 7)}{' '}
                                {Math.floor(calculateExpiryDate(date) / 7) === 1
                                  ? 'week'
                                  : 'weeks'}
                              </p>
                            </div>
                          </div>
                        )
                      })
                    }
                  })}
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <button
            className="text-5xl text-[#00536D] font-koulen bg-[#E1F1F699] rounded-lg p-11 shadow-xl"
            onClick={() => {
              navigate('/auth')
            }}
          >
            Sign In to View Your Fridge
          </button>
        </div>
      )}
    </div>
  )
}

export default Fridge

/* Fridge */
