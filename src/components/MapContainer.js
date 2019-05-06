import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    state = {
        lat: 0,
        lng: 0,
        activeMarker: {hola: 'oh'},
        showingInfoWindow: false
    }
    
    componentDidMount() {
        this.getGeoLocation()
    }

    getGeoLocation = () => {
        console.log(this.props.google.maps);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords.latitude);
                    this.props.setAxis({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
                    console.log(this.state);
                },
                error => {
                    this.props.showAlert({show: true, title: 'Ups', message: 'This application requires the use of location services, please enable them on your device to use this application'});
                }
            )
        } else {
            
        }
    }
    

    showInfos(){
        console.log('entra');
        this.props.results.map(e => {
            return(
                <InfoWindow position={{lat:'21.000790', lng:'-89.660463'}} visible={true}>
                    <div>
                    <h5>{e.name}</h5>
                    </div>
                </InfoWindow>
            )
        });
        // console.log(this.props.results);
    }

    render() {
            return (
                <Map google={this.props.google} zoom={14} style={{height:'500px',top:'0px'}} center={this.state}> 
                <Marker name={'Ubicación Actual'} position={this.state} />
                    {this.showInfos()}
                    {/* <Marker onClick={this.props.setMarker} name={'Nueva location'} position={{lat:'20.945308', lng:'-89.621982'}} />
                    <Marker onClick={this.props.setMarker} name={'Nueva location'} position={{lat:'21.000590', lng:'-89.660463'}} />
                    <InfoWindow position={{lat:'21.000790', lng:'-89.660463'}} visible={true}>
                        <div>
                        <h5>Name</h5>
                        </div>
                    </InfoWindow> */}
                </Map>  
            )
    }
}

MapContainer.propTypes = {
    setAxis: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired,
    results: PropTypes.object,
    full: PropTypes.bool
}

export default GoogleApiWrapper(
    {
        apiKey: ('AIzaSyAZ1WXjhkmcFK0I3lrXKtxusaGzT8TXVEE')
    }
)(MapContainer)
