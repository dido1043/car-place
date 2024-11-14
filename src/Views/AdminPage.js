import React from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../Components/Shared/BaseButton";
function AdminPage() {
    const nav = useNavigate();
    const navigateToAllRequests = async () => {
        await nav("/allCars/cars/rentrequests")
    }
    const navigateToAllUsers = async () => {
        await nav("/users")
    }
    return (
        <div>
            <h1>Admin page</h1>
            <BaseButton text="Rent requests" onClick={navigateToAllRequests}/>
            <BaseButton text="All users" onClick={navigateToAllUsers}/>
        </div>
    )

}
export default AdminPage;
