const fetchLastMetar = async (props) => {
    const resp = await fetch(`http://aviationweather.gov/api/data/metar?ids=${props.airport}&format=json`);
    const data = await resp.json();
    return(data)
  };

