import React from 'react';

// Material UI Imports
import Typography from '@material-ui/core/Typography';
import './scale-bar.css'

const ColorScaleBar = () => { // Stateless Component
        const widgetStyle = {
            position: 'absolute',
            top: '30%',
            right: '30px'
        }

        const barStyle = {
            position: 'absolute',
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
        }

        return (
            <div style={widgetStyle}>
                <Typography className='text' variant="body2" color="body2">
                    {"High risk"}
                </Typography>
                <div>
                    <div className='bar-item' style={{background: '#800026'}}/>
                    <div className='bar-item' style={{background: '#bd0026'}}/>
                    <div className='bar-item' style={{background: '#e31a1c'}}/>
                    <div className='bar-item' style={{background: '#fc4e2a'}}/>
                    <div className='bar-item' style={{background: '#fd8d3c'}}/>
                    <div className='bar-item' style={{background: '#feb24c'}}/>
                    <div className='bar-item' style={{background: '#fed976'}}/>
                    <div className='bar-item' style={{background: '#ffeda0'}}/>
                    <div className='bar-item' style={{background: '#ffffcc'}}/>
                </div>
                <Typography className='text' variant="body2" color="body2">
                    {"Low risk"}
                </Typography>
            </div>
        );
};

export default ColorScaleBar;