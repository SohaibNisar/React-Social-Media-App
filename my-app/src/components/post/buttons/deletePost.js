import React, { Component } from 'react';

// component
import MyButton from '../../../util/myButton';

// mui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Divider } from '@mui/material';

// mui icons
import { DeleteOutline } from '@mui/icons-material';

// redux
import { connect } from 'react-redux';
import { deletePost } from '../../../redux/actions/dataActions';

class DeletePostButton extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    deletePost = () => {
        this.props.deletePost(this.props.postId)
        this.setState({ open: false })
    }
    render() {
        return (
            <>
                <div onClick={this.handleClickOpen}>
                    <MyButton tip='Delete Post' color='secondary' content={<DeleteOutline />} />
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle>
                        <Typography sx={{ fontWeight: 'bold' }}>
                            Delete Post
                        </Typography>
                    </DialogTitle>
                    <Divider variant='middle' />
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this post ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" sx={{ fontWeight: 'bold' }}>
                            CANCEL
                        </Button>
                        <Button onClick={this.deletePost} color="secondary" sx={{ fontWeight: 'bold' }}>
                            DELETE
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapActionsToProps = {
    deletePost,
}

export default connect(mapStateToProps, mapActionsToProps)(DeletePostButton);