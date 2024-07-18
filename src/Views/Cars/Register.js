const postRegister = async () => {
    const data = {
      "email": "testUser@dsa.bg",
      "password": "pAsSds32123"
    };
    try {

      const response = await fetch('https://localhost:7290/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
          body: JSON.stringify(data)

        }
      )
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }