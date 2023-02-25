import React, { Component } from 'react';

// MUI
import { Box, Button, CircularProgress, TextField } from '@mui/material';

// redux
import { connect } from "react-redux";
import { commentPost } from '../../redux/actions/dataActions';

class CommentForm extends Component {
    state = {
        body: "",
        errors: {},
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.UI.errors) {
            this.setState({ errors: nextprops.UI.errors });
        } else {
            this.setState({ errors: {}, body: "" });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            body: this.state.body,
        };
        this.props.commentPost(this.props.postId, data);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        const { errors } = this.state;
        const { UI: { loading } } = this.props;
        return (
            <Box component='form' textAlign='center' sx={{ p: '16px' }} onSubmit={this.handleSubmit}>
                <TextField
                    name="body"
                    type="text"
                    label="Comment on post"
                    error={errors.comment ? true : false}
                    helperText={errors.comment}
                    value={this.state.body}
                    onChange={this.handleChange}
                    fullWidth
                    variant='standard'
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size='small'
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    Submit
                </Button>
                {loading && (
                    <CircularProgress size={25} />
                )}
            </Box>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
})

const mapActionsToProps = {
    commentPost,
}
export default connect(mapStateToProps, mapActionsToProps)(CommentForm);