import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Label from "../Shared/Label";
import InputField from "../Shared/InputField";
import axios from "axios";
import BaseButton from "../Shared/BaseButton";
function AddFeatureForm({isEditable, featureData}) {
    const path = window.location.pathname.split('/');
    const currentCarId = Number(path[path.length - 1]);

    const [features, setFeatures] = useState({
        carId: currentCarId,
        feature:''
    });

    const [errors,setErrors] = useState({});
    const nav = useNavigate();

    useEffect(() => {
        if (isEditable) {
            setFeatures({
                carId:currentCarId,
                feature:featureData.feature
            })
        }
    },[isEditable])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(`${name} -> ${value}`);
        setFeatures({
            ...features,
            [name]:value
        })
    }
    const validateErrors = () => {
        const errors = {}
        if (!features.feature) errors.feature = "Invalid feature!";
        return errors; 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const featureErrors = validateErrors();
        if (Object.keys(featureErrors).length === 0) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_KEY}/cars/features/add`,features,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                })
                console.log(response.data);
                setFeatures({
                    carId:'',
                    feature:''
                })
                nav(`/allCars/cars/features/all/${currentCarId}`)
            } catch (error) {
                console.log(error);
                
            }
        }else{
            setErrors(featureErrors);
        }
    }

    const editFeature = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_KEY}/cars/features/edit/${featureData.id}`,features,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            })
            nav(`/allCars`)
        } catch (error) {
            console.log(error);
            
        }
    }

    return(
        <div>
            <form onSubmit={isEditable == true ? editFeature : handleSubmit}>
                <Label text="Feature" />
                <InputField
                    value={features.feature}
                    name="feature"
                    onChange={handleChange}
                    placeholder="Feature"
                    type="text"
                    error={errors.feature}
                />
                <BaseButton text={isEditable ? "Edit" : "Add"} type="submit" />
            </form>
            </div>
    )
}
export default AddFeatureForm;