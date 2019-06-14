const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const axios = require("axios");
const app = express();

const port = process.env.PORT || 5000;

 const api_meteo_base = `http://api.openweathermap.org/data/2.5/weather`;
 const API_KEY_WEATHER = "2a65ecf6078f4bc2f2005ea8a95f9fe2&lang=fr&units=metric";

//Define routes
const index = require('./routes/index');
app.use(index);

//Configure socketio
const server = http.createServer(app);
const io = socketIO(server); //connect server express to socket.io


io.on('connection', socket =>{

    console.log('new client connected');

    let interval
    /**
     * On componentdidMount client  send 'city' 
     */
    socket.on("FromClient", (city) => {
        
        console.log(" from Client", city);

        getWeatherInfos(socket, city) 

        if (interval) {
            clearInterval(interval);  //A regler le probleme de doublure de ville
        }
       interval= setInterval(() => {
            getWeatherInfos(socket, city)
        }, 18000);

    });







    /**
     * Deconnexion
     */
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

})

/**
 * get information meteo and emit (send) result to client
 */
const getWeatherInfos = async (socket, maville)=> {

    try {
        const response = await axios.get(`${api_meteo_base}?q=${maville}&appid=${API_KEY_WEATHER}`);
        //console.log(response.data);

        socket.emit("FromServer", response.data); 

    } catch (error) {
        console.log("getWeatherInfos_srv", error);
        socket.emit("ErrorFromServer", error); 

    }
   
   // console.log(data);


}





//Listen
server.listen(port, () => console.log(`Listening on port ${port}`));