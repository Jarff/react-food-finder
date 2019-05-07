import React, { Component } from 'react';
import Finder from './components/Finder.js';
import Result from './components/Result.js';
// import MapContainer from './components/MapContainer';
import MyMap from './components/MyMap.js';
import smoothscroll from 'smoothscroll-polyfill';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import ScrollUpButton from "react-scroll-up-button";

import './App.css';
import Footer from './components/Footer.js';
import Loader from './components/Loader.js';

class App extends Component {
    constructor(props){
        super(props);
        this.footerElement = React.createRef();
        this.loaderElement = React.createRef();
    }
    state = {
        results : [],
        str : '',
        show: {display: 'none'},
        show_opt: {}
    }

    marker = {}

    axis = {}

    currentMap = {}

    infos = []

    showFooter = false;

    componentWillMount(){
        document.getElementById('root').style.opacity = 1;
    }

    componentDidMount(){
        window.addEventListener('load', () => {
            this.loaderElement.current.hide({loading: true});
            window.setTimeout(() => {
                document.querySelector('.loader').style.opacity = 0;
            }, 1500)
            window.setTimeout(() => {
                document.querySelector('.loader').style.display = 'none';
                document.querySelector('.loader').style.zIndex = -999;
            }, 1800)
        });
    }

    setAxis = (axis) => {
        this.axis = axis;
    }    

    getAxis = () =>{
        return this.axis;
    }

    showAlert = (opt) => {
        let new_state = {
            results: this.state.results,
            str: this.state.str,
            show: this.state.show,
            show_opt: {
                show: opt.show,
                title: opt.title,
                message: opt.message
            }
        }
        this.setState(new_state);
    }

    //Set results
    setResult = (results, str) => {
        console.log(results[0].definition)
        let new_state = {
            results: results,
            str: '"'+str+'"',
            definition: results[0].definition,
            photo: results[0].photo,
            show: {display: 'block'},
            show_opt: this.state.show_opt
        };
        this.setState(new_state);
        this.footerElement.current.updateState(true);
        window.scroll({ top: (document.getElementById('resultContainer').offsetTop + 100), left: 0, behavior: 'smooth' });
        this.setInfo(results);
    }

    setCurrentMap = (map) => {
        this.currentMap = map;
    }

    setInfo = (results) => {
        if(this.infos.length > 0){
            this.infos.map((i) => {
                i.close();
            });
        }
        this.infos = [];
        results.map((res) => {
            let pos = { lat: parseFloat(res.lat), lng: parseFloat(res.lng) }
            let infoWindow = new window.google.maps.InfoWindow;
            infoWindow.setPosition(pos);
            infoWindow.setContent(res.name);
            infoWindow.open(this.currentMap);     
            this.infos.push(infoWindow); 
        }).join('');
        this.directionsDisplay.setDirections({routes: []});
        return true
    }

    directionsService = new window.google.maps.DirectionsService;
    directionsDisplay = new window.google.maps.DirectionsRenderer;
    calculateRoute = (location) => {
        // var directionsService = new window.google.maps.DirectionsService;
        // var directionsDisplay = new window.google.maps.DirectionsRenderer;
        this.directionsDisplay.setDirections({routes: []});
        this.directionsDisplay.setMap(this.currentMap);

        var directionsDisplay = this.directionsDisplay;

        this.directionsService.route({
            origin: {lat: this.axis.lat, lng: this.axis.lng},
            destination: {lat: parseFloat(location.lat), lng: parseFloat(location.lng)},
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
                console.log(directionsDisplay)
                directionsDisplay.setDirections(response);
                window.scroll({ top: (document.getElementById('resultContainer').offsetTop + 100), left: 0, behavior: 'smooth' });
            }else{
                console.log(status);
            }
        });
    }


    render() {
        smoothscroll.polyfill();
        return (
            <div className="App">
                <SweetAlert
                    show={this.state.show_opt.show}
                    title={this.state.show_opt.title}
                    text={this.state.show_opt.message}
                    onConfirm={() => {
                            let new_state = {
                                results: this.state.results,
                                str: this.state.str,
                                show: this.state.show,
                                show_opt: {
                                    show: false,
                                    title: '',
                                    message: ''
                                }
                            }
                            this.setState(new_state)
                        }
                    }
                />
                <ScrollUpButton />
                <Loader ref={this.loaderElement} />
                <Finder getAxis={this.getAxis} setResult={this.setResult} showAlert={this.showAlert} />
                <div className="about" style={this.state.show} id="about">
                    <MyMap setCurrentMap={this.setCurrentMap} setAxis={this.setAxis} showAlert={this.showAlert} setInfo={this.setInfo} />
                    <div className="container py-xl-5 py-lg-3 mt-3">
                        <h3 id="resultContainer" className="title text-center text-dark mb-sm-5 mb-4">
                            <span>Los mejores resultados para: </span>
                            {this.state.str}
                        </h3>
                        <img src={this.state.photo} class="img-fluid mb-3" />
                        <p className="mb-3 mt-3"><b>{this.state.definition}</b></p>
                        <h5>Restaurantes que ofrecen este platillo:</h5>
                        <div className="row about-bottom-w3l text-center pt-lg-5">
                            <Result results={this.state.results} calculateRoute={this.calculateRoute}  />                        
                        </div>
                    </div>
                </div> 
                <Footer ref={this.footerElement} show={this.showFooter} />
            </div>
        );
    }
}

export default App;