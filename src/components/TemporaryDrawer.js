import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import CloudIcon from '@material-ui/icons/Cloud';
import People from '@material-ui/icons/People';
import Timeline from '@material-ui/icons/Timeline';
import Description from '@material-ui/icons/Description';
import Warning from '@material-ui/icons/Warning';
import {NavLink} from 'react-router-dom';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class TemporaryDrawer extends Component {
    render() {

        const { classes } = this.props;
        const style_unset = {all:"unset"};

        const sideList = (
            <div className={classes.list}>
                <List>

                    <NavLink className={"unactivePage"} activeClassName="activePage" exact to="/" style={style_unset}>
                        <ListItem button key={'Home'}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary={'COVID Heat Map'} />
                        </ListItem>
                    </NavLink>

                </List>
                <Divider />
                <List>

                    <NavLink className={"unactivePage"}  activeClassName="activePage" exact to="/demo" style={style_unset}>
                        <ListItem button key={'Demo'}>
                            <ListItemIcon><Timeline /></ListItemIcon>
                            <ListItemText primary={'Dashboard'} />
                        </ListItem>
                    </NavLink>

                    <NavLink className={"unactivePage"}  activeClassName="activePage" exact to="/risk-level" style={style_unset}>
                        <ListItem button key={'Warning'}>
                            <ListItemIcon><Warning /></ListItemIcon>
                            <ListItemText primary={'Risk Level'} />
                        </ListItem>
                    </NavLink>

                    <NavLink className={"unactivePage"}  activeClassName="activePage" exact to="/case-details" style={style_unset}>
                        <ListItem button key={'People'}>
                            <ListItemIcon><People /></ListItemIcon>
                            <ListItemText primary={'Cases'} />
                        </ListItem>
                    </NavLink>

                    <NavLink className={"unactivePage"}  activeClassName="activePage" exact to="/phsm" style={style_unset}>
                        <ListItem button key={'Description'}>
                            <ListItemIcon><Description /></ListItemIcon>
                            <ListItemText primary={'Measure'} />
                        </ListItem>
                    </NavLink>

                    <NavLink className={"unactivePage"}  activeClassName="activePage" exact to="/settings" style={style_unset}>
                        <ListItem button key={'Settings'}>
                            <ListItemIcon><Settings /></ListItemIcon>
                            <ListItemText primary={'Settings'} />
                        </ListItem>
                    </NavLink>


                    <ListItem button key={'Version'}>
                        <ListItemIcon><CloudIcon /></ListItemIcon>
                        <ListItemText primary={'Version'} secondary={"v0.1"}/>
                    </ListItem>


                </List>
            </div>
        );

        return (
            <div>

                <SwipeableDrawer open={this.props.isDrawerOpen} onClose={this.props.toggleDrawer(false)} onOpen={this.props.toggleDrawer(true)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.toggleDrawer(false)}
                        onKeyDown={this.props.toggleDrawer(false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

export default withStyles(styles)(TemporaryDrawer);