import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// mui
import { Button, Card, CardContent, Typography } from '@mui/material';

class NoFriends extends Component {
    render() {
        return (
            <Typography component='span' align='center' gutterBottom>
                <Card style={this.props.noShadow && { boxShadow: 'none' }}>
                    {this.props.mainText && <Typography style={{ fontWeight: 'bolder', marginTop: '20px' }}>
                        {this.props.mainText}
                    </Typography>}
                    {this.props.subText && <CardContent style={{ paddingBottom: '0' }}>
                        <Typography color="textSecondary" align='center'>
                            {this.props.subText}
                        </Typography>
                    </CardContent>}
                    <Link to='/friends'>
                        <Button size={this.props.size} variant="contained" color="primary" component="span" style={{ margin: '20px auto' }} >
                            Find Friends
                        </Button>
                    </Link>
                </Card>
            </Typography >
        )
    }
}

export default NoFriends;
