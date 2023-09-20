import { Grid } from "@mui/material";
import CardSkeleton from "../../component/CardSkeleton";
import DoctorCard from "./DoctorCard";

const BloodList = ({ load, data, loading }) => {
  console.log(data);
  return (
    <Grid item xs={12} md={8} lg={9} container direction="row" spacing={2}>
      {data.length === 0 && !loading && (
        <Grid item xs={12} md={12} lg={12}>
          <h3>No Post Found</h3>
        </Grid>
      )}
      {!loading &&
        data?.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={item.id}
            margin="auto"
            paddingX={2}
            paddingY={2}
          >
            <DoctorCard load={load} doctor={item} />
          </Grid>
        ))}
      {/* <SpinnerWithBackdrop backdropOpen={loading} helperText="Loading..." /> */}

      {loading &&
        new Array(8).fill(0).map((_, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            margin="auto"
            paddingX={2}
            paddingY={2}
          >
            <CardSkeleton />
          </Grid>
        ))}
    </Grid>
  );
};

export default BloodList;
