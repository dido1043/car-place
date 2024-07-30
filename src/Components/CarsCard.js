import React from "react";
import '../assests/scss/card.scss'

function CarCard({ car }) {
    return (
        <div className="container">
            
                <div className="car-card">

                    <div className="car-tumb">
                        <img src={car.imageUrl} className="" />
                    </div>
                    <div className="car-details">

                        <h4>{car.make}</h4>
                        <p>{car.model}</p>

                    </div>
                </div>
        </div >
    )

}
export default CarCard