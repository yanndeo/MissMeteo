import React, { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import socketIOClient from "socket.io-client";
//Calls Api
import {
    node_server_ip, 
    api_address_ip, 
    api_city_base, 
    API_KEY_CITY, 
    } from "./utils/api-urls";
import InfoMeteo from "./InfoMeteo";
//Utils -style
import { image_cover } from './utils/style-components';
import { NotifyMe } from "./components/notify";



export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:5000",

      meteo: {
        lng:'',
        lat:'',
        city: '',
        temperature: '',
        conditions : '',
        description :'',
      },
      error: '',
      main_city:''


    };
    
    this.socket = socketIOClient(node_server_ip);

  }


  componentDidMount() {
    console.log('maj 0')

    //1 - wtf quel est mon address ip
    this.findWeatherInfos()
        .then(data =>{
          console.log('ici', data)
          this.setState({ main_city: data})

         this.socket.emit("FromClient", this.state.main_city);
    })


    //2 -ecoute l'event FromServer qui recoit les datas meteo venant du srv chaque x temps..
    this.handleSocketDataReceived();

  }



  

 
  handleSocketDataReceived=()=>{

    this.socket.on("FromServer", data => {

      console.log("data_receive_from_srv", data);

      if (data === "404" || data.cod === "429") {
        this.setState({ error: data.message })
        NotifyMe(data.message);

      }else{

        this.setState({
          meteo: {
            city: data.name,
            temperature: data.main.temp,
            //temperature: Math.round(data.main.temp),
            conditions: data.weather[0].main,
            description: data.weather[0].description,
            lng: data.coord.lon,
            lat: data.coord.lat
          }
        })

      }

    });

    this.socket.on("ErrorFromServer", data => {

      console.log("error", data);
    });




  }



  findWeatherInfos = async () =>{

      //Step 1 : Find User IP
        const monip = await fetch(api_address_ip)
                                .then(resultat => resultat.json()) //renvoi encore une promise
                                .then(json => json.ip)

        console.log(monip)

        //Step 2 :Deduct user city 
        const maville = await fetch(`${api_city_base}/${monip}?access_key=${API_KEY_CITY}`)
                              .then(resultat => resultat.json())
                              .then(json => json.city)
                              .catch(response => console.log('error_city', response))
  

      console.log(maville)

       return maville
               


  }


/**
 * When i change city directly in input field 
 */
  handleSendCity = async ( city)=>{

        console.log('In_Sin_city', city)

        await this.setState({ main_city: city })
        
        console.log('state_city', this.state.main_city)

        this.socket.emit('FromClient', this.state.main_city); 

        //this.handleSocketDataReceived() ; deja fournis dans componentDidMount()

  }



  render() {

      const { lng, lat, city, temperature, conditions ,description} = this.state.meteo; 

      console.log('maj1')

          return (
            <div
              className="App"
              style={image_cover}>
              
              <header className="App-header">

                <InfoMeteo
                  longitute={lng}
                  latitude = {lat}
                  city= {city}
                  description= { description}
                  conditions={conditions}
                  temperature={temperature} 
                  message = { this.state.error ? this.state.error : 'App Realtime Meteo '}
                  sendCityCbk={e => this.handleSendCity(e)}
                />

              </header>
            </div>
          );
  }
}



/**
 * Asynchrone c'est pouvoir faire des tâches en parallele
 * contraire a les faire en sequentielle.
 * 
 * 
 * Asyn/await => l'utilité est de pouvoir rendre synchrone l'appel a des promises.
 * on retrouve ainsi une logique sequentielle
 */