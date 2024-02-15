export async function fetchMetars(airport) {
  console.log("Fetching METARS for: " + airport);
  const url = `http://aviationweather.gov/api/data/metar?ids=${airport}&format=json&hours=6`
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