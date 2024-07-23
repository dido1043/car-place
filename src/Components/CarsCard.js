import React from "react";
import '../assests/scss/card.scss'
import { Link } from "react-router-dom";

function CarCard({ car }) {
    return (
        <div className="container">
            <Link to={{
                pathname: `cars/${car.id}`,
                state: {car}
            }} className="menu-item">
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
                                <i class="fi fi-rr-user"></i>
                                <a href=""><i className="fa fa-heart"></i></a>
                            </div>
                        </div>

                    </div>
                </div>
            </Link>
        </div >
    )

}
export default CarCard