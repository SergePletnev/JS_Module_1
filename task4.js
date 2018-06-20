function getCountryInformationCallbackNodeRestClient(countryCode, callback) {
    const Client = require('node-rest-client').Client;
    const client = new Client();

    client.get(`http://services.groupkt.com/country/get/iso2code/${countryCode}`, (data, response) => {
        callback(data);
        return;
    });
}

function getCountryInformationPromiseAxious(countryCode) {
    const axios = require('axios');

    axios.get(`http://services.groupkt.com/country/get/iso3code/${countryCode}`)
        .then(response => {
            logCountryInfo(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}

function getCountryInformationCallbackRequest(textToSearch, callback) {
    const request = require('request');

    request(`http://services.groupkt.com/country/search?text=${textToSearch}`, { json: true }, (err, res, body) => {
        if (err) {
            console.log(err);
            return;
        }
        callback(body);
        return;
    });
}

function getCountryInformationPromiseRequest(textToSearch) {
    const rp = require('request-promise-native');
    let options = {
        uri: `http://services.groupkt.com/country/search?text=${textToSearch}`,
        json: true
    }

    rp(options)
        .then(data => {
            logCountryInfo(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function logCountryInfo(data) {
    const countryInfo = data["RestResponse"]['result'];
    const message = data.RestResponse.messages;          // as an another variant of syntax
    if (countryInfo) {
        console.log(countryInfo);
        console.log();
    } else {
        console.log(message[0] + '\n');
    }
}

const args = require('yargs').argv;

let countryCode = args.country_code ? args.country_code : 'DE'
let textToSearch = args.text_to_search ? args.text_to_search : 'bel'

getCountryInformationCallbackNodeRestClient(countryCode, logCountryInfo);

// getCountryInformationPromiseAxious(countryCode);

// getCountryInformationCallbackRequest(textToSearch, logCountryInfo);

// getCountryInformationPromiseRequest(textToSearch);