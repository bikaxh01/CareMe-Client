import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CardInterface {
 drName:string,
 note:string,
 status:boolean,
 date:string
}

function AppointmentCard({drName,note,status,date}:CardInterface) {
  return (
    <div className=" m-3 border border-gray-400 w-96 h-58 p-3 rounded-md">
      <div>
        <div className=" flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h4 className=" text-1xl font-semibold">Dr. {drName} </h4>
        </div>
      </div>
      <div className=" m-3">
        <p className=" text-xs">
          {note}
        </p>
      </div>
      <div className=" flex justify-center items-center space-x-4 gap-2">
        <p className=" text-sm">
          <span className=" font-semibold">DATE:</span>{date}
        </p>
        <p className=" text-sm">
          <span className=" font-semibold">STATUS:</span>
          {status}
        </p>
      </div>
    </div>
  );
}

export default AppointmentCard;
