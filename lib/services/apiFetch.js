const fetch = require('cross-fetch');

const apiFetchForDriving = async () => {
  try {
    const response = await fetch(
      'https://api.bls.gov/publicAPI/v2/timeseries/data/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // for uber
          seriesid: ['CEU4348500003'],
          registrationkey: '2dd8240b501040a6bef07e6a5d101d35',
        }),
      }
    );

    const info = await response.json();
    const mungedData = info.Results.series[0].data[0].value;
    // console.log('mungedData :>> ', mungedData);
    return mungedData;
  } catch (error) {
    console.error(error);
  }
};

const apiFetchForDrivingOther = async () => {
  try {
    const response = await fetch(
      'https://api.bls.gov/publicAPI/v2/timeseries/data/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // CEU4348590003
          // ---change 43485900 in CEU4348590003
          // https://download.bls.gov/pub/time.series/ce/ce.industry
          // replace with industry_code values from above link
          // for lyft
          seriesid: ['CEU4348590003'],
          registrationkey: '2dd8240b501040a6bef07e6a5d101d35',
        }),
      }
    );

    const info = await response.json();
    console.log(info, 'info0oooo----');
    const mungedData = info.Results.series[0].data[0].value;
    // console.log('mungedData :>> ', mungedData);
    return mungedData;
  } catch (error) {
    console.error(error);
  }
};

const apiFetchForTutoring = async () => {
  try {
    const response = await fetch(
      'https://api.bls.gov/publicAPI/v2/timeseries/data/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // for tutoring
          seriesid: ['CEU6500000003'],
          registrationkey: '2dd8240b501040a6bef07e6a5d101d35',
        }),
      }
    );

    const info = await response.json();
    const mungedData = info.Results.series[0].data[0].value;
    // console.log('mungedData :>> ', mungedData);
    return mungedData;
  } catch (error) {
    console.error(error);
  }
};
const apiFetchForNannyAndChildServices = async () => {
  try {
    const response = await fetch(
      'https://api.bls.gov/publicAPI/v2/timeseries/data/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // for nanny / child services
          seriesid: ['CEU6562411003'],
          registrationkey: '2dd8240b501040a6bef07e6a5d101d35',
        }),
      }
    );

    const info = await response.json();
    const mungedData = info.Results.series[0].data[0].value;
    // console.log('mungedData :>> ', mungedData);
    return mungedData;
  } catch (error) {
    console.error(error);
  }
};

const apiFetchForLandscape = async () => {
  try {
    const response = await fetch(
      'https://api.bls.gov/publicAPI/v2/timeseries/data/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // for landscaping
          seriesid: ['CEU6054132003'],
          registrationkey: '2dd8240b501040a6bef07e6a5d101d35',
        }),
      }
    );

    const info = await response.json();
    const mungedData = info.Results.series[0].data[0].value;
    // console.log('mungedData :>> ', mungedData);
    return mungedData;
  } catch (error) {
    console.error(error);
  }
};

const apiFetchForDeliveryFoodService = async () => {
  try {
    const response = await fetch(
      'https://api.bls.gov/publicAPI/v2/timeseries/data/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // for doordash / grubhub for food services
          seriesid: ['CEU7072000003'],
          registrationkey: '2dd8240b501040a6bef07e6a5d101d35',
        }),
      }
    );

    const info = await response.json();
    const mungedData = info.Results.series[0].data[0].value;
    // console.log('mungedData :>> ', mungedData);
    return mungedData;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { apiFetchForDriving, apiFetchForDrivingOther, apiFetchForTutoring, apiFetchForNannyAndChildServices, apiFetchForLandscape, apiFetchForDeliveryFoodService };

// Landscaping 60561730	56173	A
// 60561900	5619	A	Other support services
//80812910	81291	A	Pet care services, except veterinary
