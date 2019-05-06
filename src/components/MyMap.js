import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MyMap extends Component {

    state = {}

    componentDidMount() {
      this.getGeoLocation();
    }

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);
                    this.props.setAxis({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    this.setState({lat: position.coords.latitude, lng: position.coords.longitude});

                    const map = new window.google.maps.Map(document.getElementById('map'), {
                        center: { lat: position.coords.latitude, lng: position.coords.longitude },
                        zoom: 14
                    });
                    this.props.setCurrentMap(map);
                    var marker = new window.google.maps.Marker({
                        position: { lat: position.coords.latitude,
                            lng: position.coords.longitude},
                        map: map,
                        title: 'Ubicacion actual'
                    });

                    var centerControlDiv = document.createElement('div');
                    var centerControl = this.centerControl(centerControlDiv, map, this.state);
                    map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv)
                },
                error => {
                    this.props.showAlert({show: true, title: 'Ups', message: 'Esta aplicación requiere el uso de los servicios de ubicación, favor de habilitarlos para poder disfrutar esta aplicación.'});
                }
            )
        } else {

        }
  
    }

    centerControl(controlDiv, map, pos) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click para centrar el mapa en tu ubicación';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Mi ubicación';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
            console.log('entra xD');
            map.setCenter({lat: pos.lat, lng: pos.lng});
        });

    }
  
    render() {
      return (
        <div style={{ width: '100%', height: 500 }} id="map" />
      );
    }
}

MyMap.propTypes = {
    setAxis: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired,
    setInfo: PropTypes.func.isRequired,
    setCurrentMap: PropTypes.func.isRequired,
}

export default MyMap