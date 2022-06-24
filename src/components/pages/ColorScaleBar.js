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
                    <div className='bar-item' style={{background: '#0A2F51'}}/>
                    <div className='bar-item' style={{background: '#0E4D64'}}/>
                    <div className='bar-item' style={{background: '#137177'}}/>
                    <div className='bar-item' style={{background: '#188977'}}/>
                    <div className='bar-item' style={{background: '#1D9A6C'}}/>
                    <div className='bar-item' style={{background: '#39A96B'}}/>
                    <div className='bar-item' style={{background: '#56B870'}}/>
                    <div className='bar-item' style={{background: '#99D492'}}/>
                    <div className='bar-item' style={{background: '#DEEDCF'}}/>
                </div>
                <Typography className='text' variant="body2" color="body2">
                    {"Low risk"}
                </Typography>
            </div>
        );
};

export default ColorScaleBar;