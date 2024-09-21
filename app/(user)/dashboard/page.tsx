"use client";
import { userBaseUrl } from "@/config/EnvConfig";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import AppointmentCard from "@/components/AppComponents/AppointmentCard";

function Dashboard() {
  const [appointments, setAppointments] = useState([
    {
      drName: "Hamid",
      note: "Zenaida asiatica",
      status: false,
      date: "7/25/2024",
    },
    {
      drName: "Ailene",
      note: "Dipodomys deserti",
      status: false,
      date: "4/29/2024",
    },
    {
      drName: "Charo",
      note: "Upupa epops",
      status: false,
      date: "5/14/2024",
    },
    {
      drName: "Amanda",
      note: "Coluber constrictor",
      status: false,
      date: "11/9/2023",
    },
    {
      drName: "Zaneta",
      note: "Chlamydosaurus kingii",
      status: false,
      date: "5/13/2024",
    },
    {
      drName: "Judas",
      note: "Microcebus murinus",
      status: true,
      date: "5/19/2024",
    },
    {
      drName: "Moria",
      note: "Anser anser",
      status: true,
      date: "10/30/2023",
    },
    {
      drName: "Oran",
      note: "Deroptyus accipitrinus",
      status: true,
      date: "6/14/2024",
    },
    {
      drName: "Aleksandr",
      note: "Francolinus coqui",
      status: true,
      date: "1/3/2024",
    },
    {
      drName: "Rosette",
      note: "Sciurus vulgaris",
      status: false,
      date: "5/27/2024",
    },
  ]);

  return (
    <>
      <div className=" m-9 text-2xl">
        <div>
          <h3>UPCOMMING</h3>
          <Separator />
          <div className=" flex ">
            {appointments.map((appointment) => (
              <AppointmentCard
                date={appointment.date}
                drName={appointment.drName}
                note={appointment.note}
                status={appointment.status}
                key={appointment.date}
              />
            ))}
          </div>
        </div>
        <div>
          <h3>PREVIOUS</h3>
          <Separator />
          <div className=" flex h-full w-full">
            {appointments.map((appointment) => (
              <AppointmentCard
                date={appointment.date}
                drName={appointment.drName}
                note={appointment.note}
                status={appointment.status}
                key={appointment.date}
              />
            ))}
          </div>
        </div>
        <div>
          <h3>CANCELLED</h3>
          <Separator />
          <div className=" flex h-full w-full">
            {appointments.map((appointment) => (
              <AppointmentCard
                date={appointment.date}
                drName={appointment.drName}
                note={appointment.note}
                status={appointment.status}
                key={appointment.date}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
