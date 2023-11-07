import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import './userPhotos.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


/**
 * Define UserPhotos, a React componment of project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      isDialogOpen: false
    };
  }

  componentDidMount() {
    this.getPhotoData();
  }

  getPhotoData() {
    axios.get("http://localhost:3000/photosOfUser/" + this.props.match.params.userId).then((response) => {
      this.setState({ photos: response.data });
    });
  }

  handleDialogOpen = () => {
    this.setState({isDialogOpen: true});
  };

  handleDialogClose = () => {
    this.setState({isDialogOpen: false});
  };

  render() {
    return (
      <div>
        <Grid container spacing={6}>
          
          {this.state.photos && (
            this.state.photos.map((photo) => (
              <Grid item md={3} key={photo._id}>
                <Card sx={{ maxWidth: 500 }}>
                  <CardMedia
                    sx={{ height: 300 }}
                    image={"/images/" + photo.file_name}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      Created at: <i>{photo.date_time}</i>
                    </Typography>
                    <Divider/>
                    {
                      (photo.comments.length !== 0) ? photo.comments.map((comment) => (
                        <div key={comment._id}>
                          <Typography className="photos-comment-link" gutterBottom variant="body2" component="div">
                            <Link to={"/users/" + comment.user._id}>
                              <b>{comment.user.first_name + " " + comment.user.last_name}</b>
                            </Link>
                              {" @ "}
                              <i>{comment.date_time}</i>
                              {": "}
                              {comment.comment}
                          </Typography>
                          <Divider/>
                        </div>
                      )) : null
                    }
                    <IconButton className="comment-plus-button" variant="outlined" onClick={this.handleDialogOpen}> + </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
          <Dialog className="comment-dialog" open={this.state.isDialogOpen} onClose={this.handleDialogClose}>
            <DialogTitle>Add a comment</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id="comment-text"
                label="Comment"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose}>Cancel</Button>
              <Button onClick={this.handleDialogClose}>Add</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

export default UserPhotos;
