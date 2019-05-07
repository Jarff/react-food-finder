import React, { Component } from 'react'

const styleFlex = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width:'100%',
    height:'100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: '#fff951',
    transition: '.5s all'
}
const styleFlexHidden = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width:'100%',
    height:'100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    zIndex: -999
    // display: 'none'
}
export class Loader extends Component {
    state = {
        loading: true
    }

    hide = () => {
        this.setState({loading: false});
    }

    render() {
        return (
        <div>
            <div className="d-flex loader" style={styleFlex}>
                <img src={'https://yucafood.ingesistemas.net/images/logo_app.jpg'} />
            </div>
        </div>
        )
    }
}

export default Loader
