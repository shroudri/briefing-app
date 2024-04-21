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
    notamsOnly: "true"
  };

  axios({
    method: 'post',
    url: 'https://notams.aim.faa.gov/notamSearch/search',
    data: data,
    headers: {
      Authorization: 'Basic MWQ4Z...dhYmU=',
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("Fetched NOTAMs for airport:", airport);
    return (response.data);
  }).catch(function (error) {
    console.log(error);
  });
}