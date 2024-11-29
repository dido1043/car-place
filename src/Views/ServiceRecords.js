import axios from "axios";
import { useEffect, useState } from "react"

import '../assests/scss/serviceRecords.scss'
function ServiceRecords() {
    const pathParts = window.location.pathname.split('/');
    const currentCarId = Number(pathParts[pathParts.length - 1]);

    const [records, setRecords] = useState([]);
    useEffect(() => {
        const showRecords = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_KEY}/cars/records/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                setRecords(response.data);
                console.log(response.data);
                //console.log(currentCarId);


            } catch (error) {
                console.log(error);

            }
        }


        showRecords();
    }, []);

    return (
        <div className="container-sr">
            <h2>Records</h2>
            {records.map((record, id) => {
                let result = currentCarId == record.carId ? (
                    <div className="box">
                        <h3>Service record id: {record.id}</h3>
                        <p>For car: {record.carId}</p>
                        <hr />
                        <p>Details: {record.serviceDetails}</p>
                        <span>Date: {record.serviceDate}</span>
                    </div>
                ) : (<></>)


                return result;

            })}

        </div>

    );
}
export default ServiceRecords