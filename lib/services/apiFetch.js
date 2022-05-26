const fetch = require('cross-fetch');


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
    const mungedData = info.Results.series[0].data[0].value;
    // console.log('mungedData :>> ', mungedData);
    return mungedData;
  } catch(error){
    console.error(error);
  }};

const apiFetch2 = async () => {
  try{
    console.log('line 4');
    const response = await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
      method: 'POST',
      headers: {
        Accept:'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // CEU4348590003
        // ---change 43485900 in CEU4348590003
        // https://download.bls.gov/pub/time.series/ce/ce.industry
        // replace with industry_code values from above link
        seriesid: ['CEU4348590003'],
        registrationkey: '2dd8240b501040a6bef07e6a5d101d35'
      })
    });
  
    const info = await response.json();
    console.log(info, 'info0oooo----');
    const mungedData = info.Results.series[0].data[0].value;
    // console.log('mungedData :>> ', mungedData);
    return mungedData;
  } catch(error){
    console.error(error);
  }};

module.exports = { apiFetch, apiFetch2 };
