// components
import { FriendsList } from "../util/homeFriendlistSkeleton";

// mui
import { Grid, Skeleton, Paper } from "@mui/material";

const friendsMobileSkeleton = () => {
  return (
    <Grid container justifyContent="space-around">
      <Grid item sm={9} xs={11}>
        <Skeleton animation="wave" widht={"100%"} height={65} />
        <Paper>
          <FriendsList size={10} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default friendsMobileSkeleton;
