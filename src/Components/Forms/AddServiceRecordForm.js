import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Label from "../Shared/Label";
import InputField from "../Shared/InputField";
import axios from "axios";
import BaseButton from "../Shared/BaseButton";
function AddServiceRecordForm({ isEditable, recordData }) {
        const path = window.location.pathname.split('/');
    const currentCarId = Number(path[path.length - 1]);
    console.log(currentCarId);
    const [records, setRecords] = useState({
        carId: currentCarId,
        serviceDate: '',
        serviceDetails: ''
    });
    const [errors, setErrors] = useState({})
    const nav = useNavigate();

    
    useEffect(() => {
        if (isEditable) {
            setRecords({
                carId: currentCarId,
                serviceDate: recordData.serviceDate,
                serviceDetails: recordData.serviceDetails
            })
        }

        console.log("OK!");

    }, [isEditable])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setRecords({
            ...records,
            [name]: name === "serviceDate" ? new Date().toISOString().split("T")[0] : value
        })
    }

    const validateErrors = () => {
        const errors = {}
        if (!records.serviceDate) errors.serviceDate = "Invalid service date!";
        if (!records.serviceDetails) errors.serviceDetails = "Invalid service details!";
        return errors;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const recordErrors = validateErrors();
        if (Object.keys(recordErrors).length === 0) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_KEY}/cars/records/add`, records, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                })
                console.log(response.data);

                setRecords({
                    carId: '',
                    serviceDate: '',
                    serviceDetails: ''
                })
                nav(`/allCars/cars/serviceRecords/all/${currentCarId}`);
            } catch (error) {
                console.log(error);

            }
        } else {
            setErrors(recordErrors);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Label text="Service Details" />
                <InputField
                    value={records.serviceDetails}
                    name="serviceDetails"
                    onChange={handleChange}
                    placeholder="Service Details"
                    type="text"
                    error={errors.serviceDetails}
                />
                <Label text="Service Date" />
                <InputField
                    value={records.serviceDate}
                    name="serviceDate"
                    onChange={handleChange}
                    placeholder="Service Date"
                    type="date"
                    error={errors.serviceDate}
                />
                <BaseButton text="Add" type="submit" />
            </form>

        </div>
    )
}
export default AddServiceRecordForm