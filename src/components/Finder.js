import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SlimSelect from 'slim-select';
import { css } from '@emotion/core';
// First way to import
import { PulseLoader } from 'react-spinners';

const override = css`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color:rgba(0, 0, 0, 0.49);
`;
export class Finder extends Component {
    env = {
        path: 'https://yucafood.ingesistemas.net/api/',
        // path: 'http://localhost/yucafood/api/',
        username: 'root',
        password: '123'
    }

    state = {
        loading: false
    }

    componentDidMount(){
        new SlimSelect({
            select: '#slim-select',
            searchPlaceholder: 'prueba con algún platillo',
        });
    }

    find = (e) => {
        e.preventDefault();     
        this.validateSubmit(e)
        .then((response) => {
            let axis = this.props.getAxis();
            if(axis.lat){
                this.setState({loading: true});
                response.lat = axis.lat;
                response.lng = axis.lng;
                fetch(this.env.path+'search', {
                    method: 'POST',                
                    headers: {
                        'Content-Type' : 'application/json',                    
                        'Authorization' : 'Basic '+btoa(this.env.username+':'+this.env.password)
                    },
                    body: JSON.stringify(response)
                })
                .then((resp) => {
                    // console.log(resp);
                    if(resp.status === 200){
                        resp.json()
                        .then((json) => {
                            this.setState({loading: false});
                            this.props.setResult(json.data, response.value);
                        })
                        .catch((er) => {
                            this.setState({loading: false});
                            console.log(er);
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });           
            }
        })
        .catch((error) => {
            console.log(error);
            alert('Verifica que los servicios de ubicación están habilitados.');
        });
    };

    validateSubmit = (e) => {
        return new Promise((resolve, reject) => {
            let data = {isEmpty: false};
            // let searchStr = document.getElementById('searchString');
            let searchStr = document.getElementById('slim-select');
            if(searchStr.value === '0'){                
                this.props.showAlert({ show: true, title: 'Ups', message: 'El campo de búsqueda está vacío...'});
                data.isEmpty = true;
                reject('invalid operation');
            }else{
                data.value = searchStr.value;
            }
            if(!data.isEmpty)
                resolve(data);
        })
    }

    render() {
        return (
        <div>
            <PulseLoader
            css={override}
            sizeUnit={"px"}
            size={15}
            margin={'5px'}
            color={'#92c800'}
            loading={false}
            />
            <div className="callbacks_container">
                <ul className="rslides callbacks callbacks1" id="slider3">
                    <li id="callbacks1_s1" className="callbacks1_on" style={{display: 'block', float: 'left', position: 'relative', opacity: 1, zIndex: 2, transition: 'opacity', transitionDuration:'500ms'}} >
                        <div className="slider-info bg2">
                            <div className="w3l-overlay">
                                <div className="banner-text text-center container">
                                    {/* <img src={'https://yucafood.ingesistemas.net/images/logo_app.jpg'} className="img-fluid"  /> */}
                                    <img src={'https://yucafood.ingesistemas.net/images/logo_app.jpg'} className="img-fluid" style={{width:'15%', borderRadius: '100px'}}  />
                                    <img src={'https://yucafood.ingesistemas.net/images/logo_webapp.jpg'} className="img-fluid" style={{width:'15%',marginLeft:'5%'}}  />
                                    <h3 className="text-white mb-md-4 mb-3 mt-3">Los mejores platillos típicos de
                                        <span> Yucatán</span> cerca de <span>ti</span>
                                    </h3>
                                    <p className="movetxt text-white mb-4">Powered by YucaFood</p>
                                    <div className="search-agile">
                                        <form action="#" method="post" onSubmit={this.find}>
                                            {/* <input id="searchString" type="search" name="search" placeholder="Busca aquí..." required="" /> */}
                                            <select id="slim-select" name="seatch">
                                                <option value="0">Lo más buscado...</option>
                                                <option value="salbut">Salbut</option>
                                                <option value="caldo de pavo">Caldo de pavo</option>
                                                <option value="panucho">Panuchos yucatecos</option>
                                                <option value="papadzules">Papadzules</option>
                                                <option value="queso relleno">Queso relleno</option>
                                                <option value="frijol con puerco">Frijol con puerco</option>
                                                <option value="pib">Pib</option>
                                                <option value="relleno negro">Relleno negro</option>
                                                <option value="cochinita pibil">Cochinita Pibil</option>
                                                <option value="lomitos de valladolid">Lomitos de Valladolid</option>
                                            </select>
                                            <input type="submit" value="Buscar" />
                                            <div className="clearfix"> </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        )
    }
}

Finder.propTypes = {
    setResult: PropTypes.func.isRequired,
    getAxis: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired
}

export default Finder
