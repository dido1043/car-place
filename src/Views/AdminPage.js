import React from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../Components/Shared/BaseButton";
function AdminPage() {
    const nav = useNavigate();
    const navigateToAllRequests = async () => {
        await nav("/allCars/cars/rentrequests")
    }
    return (
        <div>
            <h1>Admin page</h1>
            <BaseButton text="Rent requests" onClick={navigateToAllRequests}/>
        </div>
    )

}
export default AdminPage;
