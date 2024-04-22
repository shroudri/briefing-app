import axios from "axios";

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
    sort: "CREATION_DATE"     // CREATION_DATE, EFFECTIVE_DATE
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
    console.log(notams[0])
    return notams
  } catch (error) {
    console.log(error)
  }
}