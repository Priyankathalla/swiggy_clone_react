
import React, {useState, useEffect}from 'react'
import { API_URL } from '../components/pages/api'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import {RotatingLines } from "react-loader-spinner"


const Chain = () => {
    const [vendorData, setVendorData] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loader, setLoader] = useState(true)

    const vendorFirmHandler = async() =>{
        try {
            const response = await fetch(`${API_URL}/vendor/all-vendors`)
            const newData = await response.json()

            setVendorData(newData)
            setLoader(false)


            console.log("this is api data", newData)
        } catch (error) {
           alert("Failed to fetch")
            console.error("Failed to fetch")
            setLoader(true)
        }
    }

    useEffect(()=>{
      vendorFirmHandler()
    },[])

    const handleScroll = (direction) =>{
        const gallery = document.getElementById("chainGallery")
        const scrollAmount = 500;

        if (direction=== "left"){
            gallery.scrollTo({
                left: gallery.scrollLeft - scrollAmount,
                behavior : "smooth"
            })
        } else if(direction === "right"){
             gallery.scrollTo({
                left: gallery.scrollLeft + scrollAmount,
                behavior : "smooth"
            })

        }
    }


  return (
    <div className='mediaChainSection'>
    <div className="loaderSection">
              {
        loader && <>
            <RotatingLines
              visible={true}
                height="96"
                 width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        <div className="loader">
           Please wait ......
        </div>

        </>

      }
    </div>
     
      <div className="btnSection">
        <button onClick={ ()=> handleScroll("left")} className='btnIcons'><FaArrowLeftLong /></button>
        <button onClick={ ()=> handleScroll("right")} className='btnIcons'><FaArrowRightLong /></button>
      </div>
      <h3>Top restaurant chains in Hyderabad</h3>
        <section className="chainSection" id= "chainGallery" onScroll={(e)=>setScrollPosition(e.target.scrollLeft)} >
      
        {vendorData.vendors && vendorData.vendors.map((vendor) =>{
           return(
            <>
            <div className="vendorBox" >
                {vendor.firms.map((item)=>{
                    return(
                        <>
                        <div>
                            {/* {item.firmName} */}
                            
                        </div>
                        <div className="firmImage">
                            {item.image && (
                                <img src={`${API_URL}/uploads/${item.image}`} alt="Firm Image" />
                            )}
                        </div>
                        </>
                    )
                })}
           </div>
            </>
           )

        })}
    </section>

 </div>
  )
}

export default Chain