import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RestaurantCard extends Component {
    render() {
        const {photo, name, description, location, distance, link, lat, lng} = this.props.card;
        return (
            <div className="col-sm-4 about-grid mt-4">
                <div className="about-grid-main">
                    <img src={photo} alt="" className="img-fluid" />
                    <h4 className="mb-3 mt-3">{name}</h4>
                    <p className="description">{description}</p>
                    <p className="description">{location}</p><br />
                    <p><i style={{color:'#ed4f4f'}} className="fa fa-map-marker"></i> {distance} km</p><br />
                    <a href="javascript:;" onClick={() => {this.props.calculateRoute({lat: lat, lng, lng})}}>¿Cómo llegar?</a><br />
                    <a href={link} target="_blank" className="button-w3ls mt-4" data-toggle="modal" data-target="#exampleModalCenter1">Descubre más
                        <i className="fas fa-long-arrow-alt-right ml-3"></i>
                    </a>
                </div>
            </div>
        )
    }
}

RestaurantCard.propTypes = {
    card: PropTypes.object.isRequired,
    calculateRoute: PropTypes.func
}

export default RestaurantCard
