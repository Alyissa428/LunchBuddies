import {API_KEY} from "./secret-constants.js"

export class RestaurantsClient{

    //Returns json list of yelp restaurants
    public getRestaurants(location: String) {
        const fetch = require('node-fetch');
        const baseURL = 'https://api.yelp.com/v3/businesses/search?';
        try {
            var requestURL = baseURL + "location=" + location + "&open_now=true";
            const response = fetch(requestURL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + API_KEY,
                'Accept': 'application/json',
            },
            });
        
            if (!response.ok) {
            throw new Error(`Error. status: ${response.status}`);
            }
        
            const result = response.json();
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
            } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
            }
        }
    }
}