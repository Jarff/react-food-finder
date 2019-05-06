import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Footer extends Component {
    state = {
        show: false
    }
    updateState = (bool) => {
        console.log('entra');
        this.setState({show: bool});
    }
    render() {
        return (
            <div>
                <footer className="pt-5" style={(this.state.show) ? {display:'block'} : {display:'none'}}>
                    <div className="container py-xl-5 py-lg-3">
                        <div className="row footer-grids py-4">
                            <div className="col-lg-4 footer-grid text-left">
                                <div className="footer-logo">
                                    <h2 className="mb-3">
                                        <a className="logo text-white" href="./">
                                            <img src={'https://yucafood.ingesistemas.net/images/logo.png'} />
                                            <img src={'https://yucafood.ingesistemas.net/images/logo_webapp.jpg'} style={{width:'40%',marginLeft:'5%'}} />                                        
                                        </a>
                                    </h2>
                                </div>
                            </div>
                            <div className="col-lg-12 col-16  footer-grid my-lg-0 my-4">
                                <h3 className="mb-sm-4 mb-3 pb-3">Sobre nosotros</h3>
                                <p style={{color: 'white'}}>Plataforma creada para la búsqueda específica de platillos típicos del Estado de Yucatán.</p>
                            </div>
                            
                        </div>
                    </div>            
                    <div className="copy_right">
                        <p className="text-center text-white py-sm-4 py-3">© 2019 YucaFood. All rights reserved
                        </p>

                    </div>
                </footer>
            </div>
        )
    }
}


Footer.propTypes = {
    show: PropTypes.bool.isRequired
}

export default Footer
