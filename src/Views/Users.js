import React, { useEffect, useState } from "react";
import axios from "axios";
function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_KEY}/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                setUsers(response.data)
                console.log(response.data);
            } catch (error) {
                console.log(error);       
            }  
        }

        fetchUsers();
    }, [])



    return (
        <div>
        <h1>Users</h1>
        {users.map((user, id) => (
            <div key={id} className="bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
                <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">User ID: {user.id}   </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">User name: {user.userName}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
    );
}
export default Users;