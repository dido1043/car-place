import React, { useEffect, useState } from "react";
import axios from 'axios';

function RentRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const showRequests = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_KEY}/cars/requests/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                setRequests(response.data); 
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        showRequests();
    }, []);

    return (
        <div>
            <h1>Rent requests</h1>
            {requests.map((request, id) => (
                <div key={id} className="bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
                    <div className="px-4 py-5 sm:px-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Rent request number: {id + 1}</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">For carId: {request.carId}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">User: <span className="text-green-600">{request.user}</span></p>
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Ready</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RentRequests;
