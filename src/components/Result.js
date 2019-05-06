import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';
import PropTypes from 'prop-types';

export class Result extends Component {
    render() {
        return this.props.results.map((result) => (
            <RestaurantCard key={result.id} card={result} calculateRoute={this.props.calculateRoute} />
        ));
    }
}

Result.propTypes = {
    results: PropTypes.array.isRequired,
    calculateRoute: PropTypes.func
}

export default Result
