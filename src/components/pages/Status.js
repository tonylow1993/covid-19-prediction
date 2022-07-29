import React from 'react';

// Material UI Imports
import Typography from '@material-ui/core/Typography';

const Status = ({lastUpdateDate}) => { // Stateless Component
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
                    {`Latest Update: ${lastUpdateDate}`}
                </Typography>
            </div>
        );
};

export default Status;