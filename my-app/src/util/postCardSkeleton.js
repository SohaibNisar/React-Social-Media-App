// mui
import {
  Card,
  CardHeader,
  Skeleton,
  CardContent,
  Typography,
} from "@mui/material";

const postCardSkeleton = () => {
  return (
    <>
      <Card sx={{ mb: "40px" }}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              width="25%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" width="35%" />}
        />
        <CardContent>
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
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              width="25%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" width="35%" />}
        />
        <CardContent>
          <Skeleton animation="wave" width="80%" />
          <Skeleton animation="wave" width="40%" />
          <Skeleton animation="wave" width="60%" />
        </CardContent>
      </Card>
      <Card sx={{ mb: "40px" }}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              width="25%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" width="35%" />}
        />
        <CardContent>
          <Skeleton animation="wave" width="80%" />
          <Skeleton animation="wave" width="40%" />
        </CardContent>
      </Card>
    </>
  );
};

export default postCardSkeleton;
