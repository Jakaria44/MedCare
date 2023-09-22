import { Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "./../../HTTP/httpCommonParam";
import AppointmentCard from "./appointmentCard";
import UpcomingTable from "./UpcomingTable";
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
      {ongoing?.length !== 0 && (
        <AppointmentCard
          doctorId={ongoing?.doctorid}
          userId={ongoing?.userid}
          appoint={ongoing}
        />
      )}
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
      {upcoming?.length !== 0 && <UpcomingTable list={upcoming} />}
    </>
  );
};

export default AppointmentPage;
