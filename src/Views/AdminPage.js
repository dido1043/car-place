import React from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../Components/Shared/BaseButton";
import '../assests/scss/adminPage.scss'
function AdminPage() {
    const nav = useNavigate();
    const navigateToAllRequests = async () => {
        await nav("/allCars/cars/rentrequests")
    }
    const navigateToAllUsers = async () => {
        await nav("/users")
    }
    return (
        <div className="ctr">
            <h1>Admin page</h1>
            <BaseButton className="btn" text="Rent requests" onClick={navigateToAllRequests}/>
            <BaseButton className="btn" text="All users" onClick={navigateToAllUsers}/>
        </div>
    )

}
export default AdminPage;
