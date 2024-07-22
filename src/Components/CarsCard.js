import React from "react";
function CarCard({ car }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{car.make}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{car.model}</td>
                    </tr>
                    <tr>
                        <td><img src={car.imageUrl} className="" /></td>
                    </tr>
                    <tr>
                        <td>{car.price}$</td>
                    </tr>
                    <tr>
                        <td>{car.year}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    )

}
export default CarCard