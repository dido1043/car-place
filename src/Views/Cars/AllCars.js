import React from "react";

function AllCars() {

    const showCars = async () =>{    
    try {

        const response = await fetch('https://localhost:7290/cars',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*'
            }, 
          }
        )
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
   
    return(
        
        <div>
           <h2>All cars</h2>
            
           <button onClick={showCars}>Show</button>
        </div>
    )
}

export default AllCars