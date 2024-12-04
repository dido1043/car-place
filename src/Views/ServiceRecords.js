import axios from "axios";
import { useEffect, useState } from "react"

import '../assests/scss/serviceRecords.scss'
import BaseButton from "../Components/Shared/BaseButton";
import AddServiceRecordForm from "../Components/Forms/AddServiceRecordForm";
import { useLocation } from "react-router-dom";
function ServiceRecords() {
    const pathParts = window.location.pathname.split('/');
    const currentCarId = Number(pathParts[pathParts.length - 1]);

    const [records, setRecords] = useState([]);
    const [currentRecord,setCurrentRecord] = useState(null);

    const [isBtnClicked, setIsBtnClicked] = useState(false);

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

            } catch (error) {
                console.log(error);

            }
        }


        showRecords();
    }, []);

    const deleteRecord = (record) => {
        try {
            if (!record) {
                console.log("No service record selected for detection.");
                return;
            }

            axios.delete(`${process.env.REACT_APP_API_KEY}/cars/records/delete/${record.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            })
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    const toggleEdit = (record) => {
        setIsBtnClicked(!isBtnClicked);
        setCurrentRecord(record);

    }
    return (
        <div>{!isBtnClicked ?
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
                            {localStorage.getItem("role") === "Admin" ?
                                <div>
                                    <BaseButton text="Edit" onClick={() => toggleEdit(record)}/>
                                    <BaseButton text="Delete" onClick={() => deleteRecord(record)} />
                                </div>
                                : <></>}
                        </div>
                    ) : (<></>)


                    return result;

                })}

            </div> :
            <div>
                <AddServiceRecordForm isEditable={isBtnClicked} recordData={currentRecord} />
            </div>
        }
        </div>
    );
}
export default ServiceRecords