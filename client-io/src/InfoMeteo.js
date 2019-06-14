import React, { Component } from "react";
import { WiFog } from "weather-icons-react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import ReactDOM from "react-dom";

//
import { Capitalize } from './utils/func';
import { Spinner } from "reactstrap";
import './icon.css'

/* 
const weatherIcons = {
    "Rain" : "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear" : "wi wi-day-sunny",
    "Snow" : "wi wi-day-snow",
    "mist" : "wi wi-day-fog",
    "Drizzle" : " wi wi-day-sleet"
} */



export default class InfoMeteo extends Component {


    componentDidMount(){
        this.renderIcons()

    }

    /**
    * Choice animated icon 
    */
    renderIcons = () => {

        switch (this.props.conditions) {

            case "Rain":
                return (<div className="icon rainy">
                    <div className="cloud" />
                    <div className="rain" />
                </div>);

            case "Clouds":
                return (<div className="icon cloudy">
                    <div className="cloud" />
                    <div className="cloud" />
                </div>)

            case "Clear":
                return (<div className="icon sunny">
                    <div className="sun">
                        <div className="rays" ></div>
                    </div>
                </div>);

            case "Snow":
                return (<div className="icon flurries">
                    <div className="cloud" />
                    <div className="snow">
                        <div className="flake" />
                        <div className="flake" />
                    </div>
                </div>);

            case "Mist":
            case "Haze":
                return <WiFog size={174} color="" />;

            case "Drizzle":
                return (
                    <div className="icon thunder-storm">
                        <div className="cloud" />
                        <div className="lightning">
                            <div className="bolt" />
                            <div className="bolt" />
                        </div>
                    </div>)

            default:
                console.log("aucune icone");
        }

    };

    /**
     * Send city from callback function
     */
     sendThisCity = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            const sinCity = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

            this.props.sendCityCbk(sinCity);

            // Find the text field via the React ref
            ReactDOM.findDOMNode(this.refs.textInput).value = '';

            console.log('text_ref',sinCity)
        }
    }




    render() {

        const { longitute, latitude, city, temperature, description, conditions, message } =this.props;

        console.log(temperature)
        return (
           
            <div className="p-3 my-2 rounded ">
                <Toast>
                    <ToastHeader> {message} </ToastHeader>
                    <ToastBody>
                        <h2> {city}</h2>
                        <p>
                            {temperature}
                            <span> °C ( {Capitalize(description)} ) </span>
                        </p>
                        <span>
                            Autre information — Long : {longitute} <b>/</b> Lat : {latitude}
                        </span>
                    </ToastBody>
                </Toast>

                    <input
                        type="text"
                        ref="textInput"
                        className="form-control"
                        placeholder="Entrer le nom d'une ville "
                        id="inputCityTxt"
                        onKeyDown={e => this.sendThisCity(e)} />

                <br />

                <div>
                    {conditions
                        ?
                        this.renderIcons()
                        :
                        <Spinner style={{ width: "9rem", height: "9rem" }} />
                    }
                </div>




                {/* <div className="icon sun-shower">
                <div className="cloud" />
                <div className="sun">
                    <div className="rays" />
                </div>
                <div className="rain" />
                </div>  */}

            </div>
        )
    }
}
