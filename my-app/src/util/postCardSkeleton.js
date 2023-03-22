// mui
import {
  Card,
  CardHeader,
  Skeleton,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";

// other
import img from "../images/no-profile-picture.png";

const postCardSkeleton = () => {
  return (
    <>
      <Card sx={{ mb: "40px" }}>
        <CardHeader
          avatar={<Avatar alt="no image" src={img} />}
          title={
            <Skeleton
              animation="wave"
              width="25%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" width="35%" />}
        />
        <CardContent sx={{ pt: "3px" }}>
          <Typography variant="body2" color="textSecondary" component="p">
            <Skeleton animation="wave" width="80%" />
            <Skeleton animation="wave" width="40%" />
          </Typography>
        </CardContent>
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <CardContent>
          <Skeleton animation="wave" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" width="80%" sx={{ m: "0 auto" }} />
        </CardContent>
      </Card>
      <Card sx={{ mb: "40px" }}>
        <CardHeader
          avatar={<Avatar alt="no image" src={img} />}
          title={
            <Skeleton
              animation="wave"
              width="25%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" width="35%" />}
        />
        <CardContent sx={{ pt: "3px" }}>
          <Skeleton animation="wave" width="80%" />
          <Skeleton animation="wave" width="40%" />
          <Skeleton animation="wave" width="60%" />
        </CardContent>
      </Card>
      <Card sx={{ mb: "40px" }}>
        <CardHeader
          avatar={<Avatar alt="no image" src={img} />}
          title={
            <Skeleton
              animation="wave"
              width="25%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" width="35%" />}
        />
        <CardContent sx={{ pt: "3px" }}>
          <Skeleton animation="wave" width="80%" />
          <Skeleton animation="wave" width="40%" />
        </CardContent>
      </Card>
    </>
  );
};

export default postCardSkeleton;
