export async function fetchMetars(airport) {
  const url = `http://aviationweather.gov/api/data/metar?ids=${airport}&format=json&hours=6`
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  return data;
  }



export async function fetchTaf(airport) {
  const url = `https://aviationweather.gov/api/data/taf?ids=${airport}&format=json`
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  return data;
}