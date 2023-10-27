// https://aviationweather.gov/api/data/taf?ids=LEJR&format=json

const SampleResponseTafs = [
    {
       "tafId":12753926,
       "icaoId":"LEJR",
       "dbPopTime":"2023-10-27 14:26:16",
       "bulletinTime":"2023-10-27 14:26:00",
       "issueTime":"2023-10-27 14:00:00",
       "validTimeFrom":1698418800,
       "validTimeTo":1698505200,
       "rawTAF":"TAF LEJR 271400Z 2715\/2815 26010KT 9999 FEW030 TX22\/2715Z TN13\/2806Z BECMG 2718\/2720 VRB02KT BECMG 2811\/2813 24010KT",
       "mostRecent":1,
       "remarks":"",
       "lat":36.751,
       "lon":-6.056,
       "elev":25,
       "prior":4,
       "name":"Jerez Arpt, AN, ES",
       "fcsts":[
          {
             "timeGroup":0,
             "timeFrom":1698418800,
             "timeTo":1698429600,
             "timeBec":null,
             "fcstChange":null,
             "probability":null,
             "wdir":260,
             "wspd":10,
             "wgst":null,
             "wshearHgt":null,
             "wshearDir":null,
             "wshearSpd":null,
             "visib":"6+",
             "altim":null,
             "vertVis":null,
             "wxString":null,
             "notDecoded":null,
             "clouds":[
                {
                   "cover":"FEW",
                   "base":3000,
                   "type":null
                }
             ],
             "icgTurb":[
                
             ],
             "temp":[
                
             ]
          },
          {
             "timeGroup":1,
             "timeFrom":1698429600,
             "timeTo":1698490800,
             "timeBec":"1698436800",
             "fcstChange":"BECMG",
             "probability":null,
             "wdir":"VRB",
             "wspd":2,
             "wgst":null,
             "wshearHgt":null,
             "wshearDir":null,
             "wshearSpd":null,
             "visib":"6+",
             "altim":null,
             "vertVis":null,
             "wxString":null,
             "notDecoded":null,
             "clouds":[
                {
                   "cover":"FEW",
                   "base":3000,
                   "type":null
                }
             ],
             "icgTurb":[
                
             ],
             "temp":[
                
             ]
          },
          {
             "timeGroup":2,
             "timeFrom":1698490800,
             "timeTo":1698505200,
             "timeBec":"1698498000",
             "fcstChange":"BECMG",
             "probability":null,
             "wdir":240,
             "wspd":10,
             "wgst":null,
             "wshearHgt":null,
             "wshearDir":null,
             "wshearSpd":null,
             "visib":"6+",
             "altim":null,
             "vertVis":null,
             "wxString":null,
             "notDecoded":null,
             "clouds":[
                {
                   "cover":"FEW",
                   "base":3000,
                   "type":null
                }
             ],
             "icgTurb":[
                
             ],
             "temp":[
                
             ]
          }
       ]
    }
 ]

export default SampleResponseTafs