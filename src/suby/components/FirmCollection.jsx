import React, { useEffect, useState } from 'react'
import { API_URL } from './pages/api'
import { Link } from 'react-router-dom'

const FirmCollection = () => {

  const [firmData, setFirmData] = useState([])
  const [filter, setFilter] = useState("All")
  const[activeCategory, setActiveCategory] = useState('all')

  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`)
      const newFirmData = await response.json()
      setFirmData(newFirmData.vendors)
    } catch (error) {
      alert("unable to fetch FirmData")
      console.error("unable to fetch FirmData", error)
    }
  }

  useEffect(() => {
    firmDataHandler()
  }, [])

  const filterHandler = (region, category) => {
    setFilter(region)
    setActiveCategory(category)
  }

  return (
    <>
      <h3>Restaurnats with online food delivery in Hyderabad</h3>

      <div className="filterButtons">
        <button onClick={() => filterHandler("All", "all")} className={activeCategory === "all" ? "activeButton" : ""}>All</button>
        <button onClick={() => filterHandler("South-Indian", "south-indian")} className={activeCategory === "south-indian" ? "activeButton" : ""}>South-Indian</button>
        <button onClick={() => filterHandler("North-Indian", "north-indian")} className={activeCategory === "north-indian" ? "activeButton" : ""}>North-Indian</button>
        <button onClick={() => filterHandler("Chinese", "chinese")} className={activeCategory === "chinese" ? "activeButton" : ""}>Chinese</button>
        <button onClick={() => filterHandler("Bakery", "bakery")} className={activeCategory === "bakery" ? "activeButton" : ""}>Bakery</button>
      </div>

      <section className="firmSection">

        {firmData.map((apple) =>
          apple.firms?.map((item) => {

            const regionMatch =
              filter === "All" ||
              (item.region && item.region.includes(filter.toLowerCase()))

            if (!regionMatch) return null

            return (
              <Link key={item._id} to={`/products/${item._id}/${item.firmName}`} className='link'>

                <div className='firmGroupBox'>

                  <div className='firmGroup'>
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.firmName}
                    />

                    <div className="firmOffer">
                      {item.offer}
                    </div>
                  </div>

                  <div>
                    <div className='firmName'>
                      {item.firmName}
                    </div>

                    <div className='firmArea'>
                      {item.region ? item.region.join(", ") : ""}
                    </div>

                    <div className='firmArea'>
                      {item.area}
                    </div>
                  </div>

                </div>

              </Link>
            )
          })
        )}

      </section>
    </>
  )
}

export default FirmCollection