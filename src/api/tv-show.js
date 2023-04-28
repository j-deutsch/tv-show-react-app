import axios from "axios";
import {FAKE_POPULAR, FAKE_RECOMMENDATIONS} from "./fake_data";
import {BASE_URL, API_KEY_PARAM} from "../config";

// const BASE_URL = 'https://api.themoviedb.org/3/';
// const API_KEY_PARAM = '?api_key=06d0ad5c14a6d00628f32fb6be25c406';
export class TVShowAPI{
    static async fetchPopular(){
        // AXIOS CALL
        // const response  = await axios.get(`${BASE_URL}tv/popular${API_KEY_PARAM}`);
        // console.log("fetch popular", response.data.results);
        // return response.data.results;

        // STANDARD FETCH
        const fetchResponse = await fetch(`${BASE_URL}tv/popular${API_KEY_PARAM}`)
            .then(data => data.json());
        console.log("fetchResponse popular", fetchResponse.results);
        return fetchResponse.results;

        // fake return request for testing
        // return FAKE_POPULAR;
    }

    static async fetchRecommendations(tvShowId){
        // AXIOS CALL
        // const response  = await axios.get(`${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARAM}`);
        // console.log("axios fetch recommended", response.data.results);
        // return response.data.results;

        // STANDARD FETCH
        const fetchResponse = await fetch(`${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARAM}`)
            .then(data => data.json());
        console.log("fetchResponse recommended", fetchResponse.results);
        return fetchResponse.results;

        // fake return request for testing
        // return FAKE_RECOMMENDATIONS;
    }

    static async fetchByTitle(title){
        // AXIOS CALL
        // const response  = await axios.get(`${BASE_URL}search/tv${API_KEY_PARAM}&query=${title}`);
        // console.log(response.data.results);
        // return response.data.results;

        // STANDARD FETCH
        const fetchResponse = await fetch(`${BASE_URL}search/tv${API_KEY_PARAM}&query=${title}`)
            .then(data => data.json());
        console.log("fetchResponse search", fetchResponse.results);
        return fetchResponse.results;

        // fake return request for testing
        // return FAKE_RECOMMENDATIONS;
    }
}