import React from "react";
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
function AllCars() {
 
    return(
        
        <div>
           <h2>All cars</h2>
            {response.map((car, index) => (
              <div key={index}>
                {car.model}
              </div>
            ))}
           <button onClick={showCars}>Show</button>
        </div>
    )
}

export default AllCars