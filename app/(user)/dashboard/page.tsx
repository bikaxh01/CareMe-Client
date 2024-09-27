"use client";
import { APIBaseUrl, userBaseUrl } from "@/config/EnvConfig";
import React, { useEffect, useInsertionEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import AppointmentCard from "@/components/AppComponents/AppointmentCard";
import axios from "axios";
import { useSession } from "next-auth/react";

function Dashboard() {
  const [appointments, setAppointments] = useState<any>([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    const getAppointments = async () => {
      if (status !== "loading") {
        const response = await axios.get(
          //@ts-ignore
          `${APIBaseUrl}/user/get-appointments?userId=${session?.id}`
        );
        setAppointments(response.data.data);
      }
    };
    getAppointments();
  }, [status]);

  return (
    <>
      <div className=" m-9 text-2xl">
        <div>
          <h3>UPCOMMING</h3>
          <Separator />
          <div className=" flex ">
          {appointments
              .filter((appointment: any) => appointment.status === "PENDING")
              .map((appointment: any) => (
                <AppointmentCard
                  date={appointment.date}
                  drName={appointment.doctorid.fullName}
                  note={appointment.description}
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
            {appointments
              .filter((appointment: any) => appointment.status === "COMPLETED")
              .map((appointment: any) => (
                <AppointmentCard
                  date={appointment.date}
                  drName={appointment.doctorid.fullName}
                  note={appointment.description}
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
          {appointments
              .filter((appointment: any) => appointment.status === "CANCELLED")
              .map((appointment: any) => (
                <AppointmentCard
                  date={appointment.date}
                  drName={appointment.doctorid.fullName}
                  note={appointment.description}
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
