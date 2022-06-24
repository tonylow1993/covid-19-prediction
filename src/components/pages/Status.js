import React from 'react';

// Material UI Imports
import Typography from '@material-ui/core/Typography';

const Status = () => { // Stateless Component
        const widgetStyle = {
            position: 'absolute',
            bottom: '0%',
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
                    {"Latest Update: 01 Feb 2022"}
                </Typography>
            </div>
        );
};

export default Status;