import { Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "./../../HTTP/httpCommonParam";
import UpcomingTable from "./UpcomingTable";
import AppointmentCard from "./appointmentCard";
const AppointmentPage = () => {
  const [loading, setLoading] = useState(false);

  const [ongoing, setOngoing] = useState();
  const [upcoming, setUpcoming] = useState();

  useEffect(() => {
    loadAllOngoing();
  }, []);

  const loadAllOngoing = async () => {
    try {
      setLoading(true);
      const user = localStorage.getItem("user_id");
      const doctor = localStorage.getItem("doctor_id");
      let res, res2;
      console.log(user, doctor);
      if (typeof doctor === "undefined" || !doctor) {
        res = await api.get(`/protect/appointment/user/upcoming/${user}`);
        res2 = await api.get(`/protect/appointment/user/ongoing/${user}`);
      } else {
        res = await api.get(`/protect/appointment/doctor/upcoming/${doctor}`);
        res2 = await api.get(`/protect/appointment/doctor/ongoing/${doctor}`);
      }
      console.log(res.data, res2.data);
      // res.data.filter((item) => new Date(item.startTime) > new Date()),

      setUpcoming(res.data);
      setOngoing(res2.data);
    } catch (err) {
      setOngoing([]);
      setUpcoming([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Typography
        variant="body2"
        fontSize={25}
        align="center"
        gutterBottom
        pb={6}
      >
        All Appointments
      </Typography>

      <Typography
        variant="body2"
        fontSize={20}
        align="left"
        gutterBottom
        pl={3}
        mb={2}
      >
        Ongoing Appointments
      </Typography>
      <Divider sx={{ marginBottom: "2vh" }} />
      <Stack spacing={2}>
        {ongoing?.length !== 0 ? (
          ongoing?.map((item, i) => (
            <AppointmentCard
              key={i}
              appoint={item}
              doctorId={item?.doctorid}
              userId={item?.userid}
              upcoming={false}
            />
          ))
        ) : (
          <Typography
            variant="body2"
            fontSize={20}
            align="center"
            gutterBottom
            pl={3}
            mb={2}
          >
            No Ongoing Appointments
          </Typography>
        )}
      </Stack>
      <Typography
        variant="body2"
        fontSize={20}
        align="left"
        gutterBottom
        pl={3}
        mb={2}
      >
        Upcoming Appointments
      </Typography>
      <Divider />
      {upcoming?.length !== 0 ? (
        <UpcomingTable list={upcoming} />
      ) : (
        <Typography
          variant="body2"
          fontSize={20}
          align="center"
          gutterBottom
          pl={3}
          mb={2}
        >
          No Upcoming Appointments
        </Typography>
      )}
    </>
  );
};

export default AppointmentPage;
