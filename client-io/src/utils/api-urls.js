
/**
 * Server node
 */
export const node_server_ip = "http://127.0.0.1:5000";


/**
 * recupere l'@ IP de l'utilisateur
 */
export const api_address_ip = "https://api.ipify.org/?format=json"; 

/**
 * http://api.ipstack.com/196.112.40.29?access_key=981ceb8fd78eb5613c135893576eb02e&format=1
 * Trouve la ville correspondante :) à l'ip fourni
 */
export const api_city_base = "http://api.ipstack.com";   
export const API_KEY_CITY = "981ceb8fd78eb5613c135893576eb02e&format=1"; 


/**
 * http://api.openweathermap.org/data/2.5/weather?q=London&appid=2a65ecf6078f4bc2f2005ea8a95f9fe2&lang=fr&units=metric`
 * temperature (openweathermap)
 */
export const api_meteo_base = `http://api.openweathermap.org/data/2.5/weather`;
export const API_KEY_WEATHER = '2a65ecf6078f4bc2f2005ea8a95f9fe2&lang=fr&units=metric'

 /*    const meteo = await fetch(`${api_meteo_base}?q=${maville}&appid=${API_KEY_WEATHER}`)
                                .then(resultat => resultat.json())
                                .then(json => json)

  */