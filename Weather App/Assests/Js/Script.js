const fetchData = async () => {
    const url = 'https://open-weather13.p.rapidapi.com/city/landon';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3168dba88bmsh1916e24622006cbp1ff9b3jsn4a5b30990884',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Call the async function
  fetchData();
  