const fetch = require('cross-fetch');
const res = require('express/lib/response');


const apiFetch = async () => {
  try{
    console.log('line 4');
    const response = await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
      method: 'POST',
      headers: {
        Accept:'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seriesid: ['CEU4348500003'],
        registrationkey: '2dd8240b501040a6bef07e6a5d101d35'
      })
    });
  
    const info = await response.json();
    console.log(info, 'info0oooo----');
    return info;
  } catch(error){
    console.error(error);
  }};

module.exports = { apiFetch };
