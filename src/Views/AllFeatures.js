import axios from "axios";
import { useEffect, useState } from "react";
import BaseButton from "../Components/Shared/BaseButton";
import AddFeatureForm from "../Components/Forms/AddFeatureForm";
import '../assests/scss/carFeatures.scss'
function AllFeatures() {
    const pathParts = window.location.pathname.split('/');
    const currentCarId = pathParts[pathParts.length - 1];

    const [features, setFeatures] = useState([]);
    const [currentFeature, setCurrentFeature] = useState(null);

    const [isBtnClicked, setIsBtnClicked] = useState(false);

    useEffect(() => {
        const showFeatures = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_KEY}/cars/features/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });

                setFeatures(response.data);
                console.log(response.data);

            } catch (error) {
                console.log(error);

            }
        }

        showFeatures();
    }, []);
    const deleteFeature = (feature) =>{
        try {
            axios.delete(`${process.env.REACT_APP_API_KEY}/cars/features/delete/${feature.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
            
        }
    }
    const toggleEdit = (feature) => {
        setIsBtnClicked(!isBtnClicked);
        setCurrentFeature(feature);
    }

    return (
        <div>
            {!isBtnClicked ? <div className="container-features">

                <h2>Car Features</h2>

                {
                    features.map((feature, id) => {
                        let result = currentCarId == feature.carId ? (
                            <div className="box-features">
                                <h3>Feature id: {feature.id}</h3>
                                <p>For car: {feature.carId}</p>
                                <hr />
                                <p>Feature: {feature.feature}</p>
                                {localStorage.getItem("role") === "Admin" ?
                                    <div>
                                        <BaseButton text="Edit" onClick={() => toggleEdit(feature)} />
                                        <BaseButton text="Delete" onClick={() => deleteFeature(feature)} />
                                    </div> :
                                    <></>}

                            </div>) : (<></>)
                            return result
                    })
                }
            </div> : 
            <div>
                <AddFeatureForm isEditable={isBtnClicked} featureData={currentFeature}/>
            </div>
            }
        </div>
    )


}
export default AllFeatures