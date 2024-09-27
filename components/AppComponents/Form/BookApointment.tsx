"use client";
import React, { useEffect, useState } from "react";
import { date, z } from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { BookAppointmentSchema } from "@/config/zodModels";
import { useToast } from "@/components/ui/use-toast";

import { format } from "date-fns";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios, { AxiosError } from "axios";
import { APIBaseUrl } from "@/config/EnvConfig";
import { AnyMxRecord } from "dns";
import { extractDate } from "@/config/dateExtract";
import { toast } from "sonner";
import { ApiResponse } from "@/config/ApiResponse";
import { useRouter } from "next/navigation";

function BookAppointment() {
  const [specialization, setSpecialization] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const route= useRouter()
  const form = useForm<z.infer<typeof BookAppointmentSchema>>({
    resolver: zodResolver(BookAppointmentSchema),
  });

  useEffect(() => {
    const getTime = async () => {
      if (selectedDate) {
        try {
          const response = await axios.post(
            `${APIBaseUrl}/user/getAppointmentTime`,
            {
              date: selectedDate,
            }
          );
          setAvailableTimes(response.data.data);
        } catch (error) {
          console.log("🚀 ~ getTime ~ error:", error);
        }
      }
    };
    getTime();
  }, [selectedDate]);

  useEffect(() => {
    const getSpecialization = async () => {
      try {
        const response = await axios.get(
          `${APIBaseUrl}/doctors/specialization`
        );
        setSpecialization(response.data.data);
      } catch (error) {}
    };
    getSpecialization();
  }, []);

  useEffect(() => {
    const getDoctor = async () => {
      if (selectedSpecialist) {
        try {
          const response = await axios.get(
            `${APIBaseUrl}/doctors/get-specialist-doctors?specializationID=${selectedSpecialist}`
          );
          setDoctors(response.data.data);
        } catch (error) {
          console.log("🚀 ~ getDoctor ~ error:", error);
        }
      }
    };
    getDoctor();
  }, [selectedSpecialist]);

  async function onSubmit(data: any) {
    if (data) {
      try {
        const response = await axios.post(
          `${APIBaseUrl}/user/create-appointment`,
          //@ts-ignore
          { ...data, patientID: session?.id,startTime:data.time,date:extractDate(data.date) }
        );
        toast.success(response.data.message);
        route.push('/dashboard')
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data.message);
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 border-2 space-y-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-4xl mb-6">
            Book Your Appointment Now,
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
              <FormField
                control={form.control}
                name="specialist"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Select Specialist</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        setSelectedSpecialist(e);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                          <SelectValue placeholder="Select Your Specialist" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialization.map((item: any) => (
                          <SelectItem value={item.id}>
                            {item.specialization}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Select Doctor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                          <SelectValue placeholder="Select Doctor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {doctors.map((doctor: any) => (
                          <SelectItem value={doctor.id}>
                            {doctor.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-6 ">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel className="font-semibold text-gray-700">
                        Select Date
                      </FormLabel>
                      <Popover open={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full font-normal text-gray-700 border-gray-300 rounded-md",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                `${format(field.value, "PPP")}`
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-white shadow-lg rounded-lg"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={field.value}
                            onSelect={(selectedDate) => {
                              field.onChange(selectedDate);
                              const date = extractDate(selectedDate);
                              setSelectedDate(date);
                            }}
                            onDayClick={() => setIsOpen(false)}
                            fromYear={2000}
                            toYear={new Date().getFullYear()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                            <SelectValue placeholder="Select Doctor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableTimes.map((item: any) => (
                            <SelectItem value={item}>{item}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="block bg-green-600 mt-4 py-2 px-4 rounded-2xl text-white font-semibold mb-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </Form>
        </div>
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-white to-blue-600 justify-around items-center hidden"></div>
      </div>
    </div>
  );
}

export default BookAppointment;
