// mui
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  CardActions,
} from "@mui/material";

// other
import img from "../images/no-profile-picture.png";

const friendsDesktopSkeleton = () => {
  let arr = Array(18).fill(0);
  return (
    <>
      <Skeleton animation="wave" widht={"100%"} height={65} />
      <Grid container justifyContent="center" paddingTop={2}>
        {arr.map((x, i) => (
          <Card sx={{ width: 150, mb: "20px", mx: "10px" }} key={i}>
            <CardMedia
              sx={{ height: 100 }}
              image={img}
              title="profile picture"
            />
            <CardContent sx={{ p: "8px 8px 3px 8px" }}>
              <Typography gutterBottom component="div" sx={{ m: 0 }}>
                <Skeleton animation="wave" width={"55%"} height={24} />
              </Typography>
              <Typography>
                <Skeleton animation="wave" width={"65%"} height={21} />
              </Typography>
            </CardContent>
            <CardActions
              sx={{ pt: 0, display: "flex", flexDirection: "column" }}
            >
              <Skeleton animation="wave" width={"100%"} height={40} />
            </CardActions>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default friendsDesktopSkeleton;
