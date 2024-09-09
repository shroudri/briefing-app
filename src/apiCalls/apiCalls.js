import axios from "axios";

const openAipClientId = "c3cdacd9124cb95b9ea593dbad1684d6"

export async function fetchMetars(airport, hours) {
  console.log("Fetching METARS for: " + airport);
  const url = `https://aviationweather.gov/api/data/metar?ids=${airport}&format=json&hours=${hours}`
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  console.log("METARs received for: " + airport);
  return data;
}

export async function fetchTaf(airport) {
  console.log("Fetching TAFs for: " + airport);
  const url = `https://aviationweather.gov/api/data/taf?ids=${airport}&format=json`
  const response = await fetch(url);
  const data = await response.json();
  console.log("TAF received for: " + airport);
  // console.log(data);
  return data;
}

export async function fetchNotams(airport) {
  const data = {
    searchType: "0",
    designatorsForLocation: airport,
    notamsOnly: "true",
    sortColumns: "4 false",
    sort: "EFFECTIVE_DATE"  // CREATION_DATE, EFFECTIVE_DATE
  };

  const response = await axios({
    method: 'post',
    url: 'https://notams.aim.faa.gov/notamSearch/search',
    data: data,
    headers: {
      Authorization: 'Basic MWQ4Z...dhYmU=',
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  console.log("Fetching NOTAMs for: " + airport);
  try {
    const notams = await response.data
    console.log("NOTAMs received for: " + airport);
    console.log(notams)
    return notams
  } catch (error) {
    console.log(error)
  }
}

export async function fetchIcaoFromIata(iataCode) {
  const response = await axios({
    method: 'get',
    url: `https://hexdb.io/api/v1/airport/iata/${iataCode}`,
  })
  console.log("Querying airport id for: " + iataCode)
  try {
    const data = await response.data
    const icaoCode = await data.icao
    return icaoCode
  } catch (error) {
    console.log(error)
  }
}

export async function fetchOpenAipAirportId(icaoCode) {
  const response = await axios({
    method: 'get',
    url: 'https://api.core.openaip.net/api/airports',
    params: {
      'fields': '_id',
      'search': icaoCode
    },
    headers: {
      'accept': 'application/json',
      'x-openaip-client-id': openAipClientId
    }
  })
  console.log("Querying airport id for: " + icaoCode)
  try {
    const data = await response.data
    const airportId = await data.items[0]._id
    return airportId
  } catch (error) {
    console.log(error)
  }
}

export async function fetchOpenAipAirportIdByIATA(iataCode) {
  const airportIcao = await fetchIcaoFromIata(iataCode)
  const airportId = await fetchOpenAipAirportId(airportIcao)
  return airportId
}

export async function fetchOpenAipAirportData(airportId) {
  const url = `https://api.core.openaip.net/api/airports/${airportId}`
  const response = await axios({
    method: 'get',
    url: url,
    headers: {
      'accept': 'application/json',
      'x-openaip-client-id': openAipClientId
    }
  })
  try {
    const airportData = await response.data
    //const iataCode = await airportData.iataCode
    console.log("Returned airport data for ID " + airportId)
    return airportData
  } catch (error) {
    console.log(error)
  }
}