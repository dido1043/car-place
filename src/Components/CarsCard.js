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
                        <div className="car-bottom-details">
                            <div className="car-price">Price:{car.price}$</div>
                            <div className="car-price">Year:{car.year}</div>
                            <div className="car-links">
                                <i className="fi fi-rr-user"></i>
                                
                            </div>
                        </div>

                    </div>
                </div>
        </div >
    )

}
export default CarCard