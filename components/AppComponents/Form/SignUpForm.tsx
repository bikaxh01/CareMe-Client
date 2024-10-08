"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { City, Country, State } from "country-state-city";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpFormSchema } from "@/config/zodModels";
import { useState } from "react";
import DropZone from "@/components/AppComponents/dropZone";
import { ModeToggle } from "@/components/AppComponents/ThemeToggler";
import { useToast } from "@/components/ui/use-toast";
import { useDebounceCallback } from "usehooks-ts";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { APIBaseUrl } from "@/config/EnvConfig";
import { ApiResponse } from "@/config/ApiResponse";

export function SignUpForm({ handleSubmit }: any) {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [UploadedDocumentURL, setUploadedDocumentURL] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidatorMessage, setEmailValidatorMessage] = useState("");
  const emailDebounced = useDebounceCallback(setEmail, 500);

  const [step, setStep] = useState(1);

  const validateStep = async (step: number) => {
    let result = false;
    switch (step) {
      case 1:
        result = await form.trigger(["fullName", "email", "phone"]);
        break;
      case 2:
        result = await form.trigger([
          "dateOfBirth",
          "gender",
          "country",
          "state",
          "city",
        ]);
        break;
      case 3:
        result = await form.trigger(["documentNumber"]);
        break;
      case 4:
        result = await form.trigger(["password", "confirmPassword"]);
        break;
    }

    return result;
  };
  //Validate Email
  useEffect(() => {
    const validateEmail = async () => {
      if (email) {
        try {
          const response = await axios.get(
            `${APIBaseUrl}/user/validate-email?email=${email}`
          );
          setEmailValidatorMessage(response.data.message);
          console.log("🚀 ~ validateEmail ~ response:", response);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          console.log("🚀 ~ validateEmail ~ axiosError:", axiosError);
          setEmailValidatorMessage(
            axiosError.response?.data.message ?? "Error while checking email"
          );
        }
      }
    };
    validateEmail();
  }, [email]);
  const nextStep = async () => {
    const isValid = await validateStep(step);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  function onSubmit(data: z.infer<typeof SignUpFormSchema>) {
    console.log("🚀 ~ onSubmit ~ data:", data);

    if (!data) {
      toast({
        title: "Invalid Form Data",
        variant: "destructive",
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast({
        title: "Invalid confirm password",
        variant: "destructive",
      });
      return;
    }

    //@ts-ignore
    delete data.confirmPassword;

    const finalData = {
      ...data,
      documentUrl: UploadedDocumentURL,
    };

    handleSubmit(finalData);
  }

  const handelDocURL = (URl: string) => {
    setUploadedDocumentURL(URl);

    toast({
      title: "Document uploaded",
    });
  };

  return (
    <div
      className="  justify-center items-center  bg-cover bg-center  bg-opacity-80"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/03/09/78/04/360_F_309780437_bztYRNRTMDZYw3tYMSvxY3taQcE7mJqE.jpg')`,
      }}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 border-2 space-y-25 bg-slate-50 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-1xl mb-4">
              Get Started With Care Mee
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
                <h1 className="text-gray-800 font-bold text-2xl mb-1">
                  Hi there, ....
                </h1>
                <p className="text-sm font-normal text-gray-600 mb-7">
                  Get Started with Appointments....
                </p>

                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="font-semibold text-gray-700">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="font-semibold text-gray-700">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="example@gmail.com"
                              {...field}
                              onChange={(e) => emailDebounced(e.target.value)}
                              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                          </FormControl>
                          <FormDescription>
                            {emailValidatorMessage === "Looks Great 😲" ? (
                              <span className=" text-green-500">
                                {emailValidatorMessage}
                              </span>
                            ) : (
                              <span className=" text-red-600">
                                {emailValidatorMessage}
                              </span>
                            )}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="font-semibold text-gray-700">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="98XXXXXXX"
                              type="number"
                              {...field}
                              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                {step === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="font-semibold text-gray-700">
                            Date of Birth
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
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="font-semibold text-gray-700">
                            Gender
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                                <SelectValue placeholder="Select Your Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MALE">Male</SelectItem>
                              <SelectItem value="FEMALE">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-1 justify-evenly ">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem className="text-left">
                            <FormLabel className="font-semibold text-gray-700">
                              Country
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                setSelectedCountry(value);
                                const countryName =
                                  Country.getCountryByCode(value)?.name;
                                field.onChange(countryName);
                              }}
                              // defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                                  <SelectValue placeholder="Select Your Country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Country.getAllCountries().map((country) => (
                                  <SelectItem
                                    key={country.isoCode}
                                    value={country.isoCode}
                                  >
                                    {country.name}
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
                        name="state"
                        render={({ field }) => (
                          <FormItem className="text-left">
                            <FormLabel className="font-semibold text-gray-700">
                              State
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                setSelectedState(value);
                                const stateName =
                                  State.getStateByCode(value)?.name;
                                field.onChange(stateName);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                                  <SelectValue placeholder="Select Your State" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {State.getStatesOfCountry(selectedCountry).map(
                                  (state) => (
                                    <SelectItem
                                      key={state.isoCode}
                                      value={state.isoCode}
                                    >
                                      {state.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="text-left">
                            <FormLabel className="font-semibold text-gray-700">
                              City
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                                  <SelectValue placeholder="Select Your City" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {City.getCitiesOfState(
                                  selectedCountry,
                                  selectedState
                                ).map((city) => (
                                  <SelectItem key={city.name} value={city.name}>
                                    {city.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <DropZone sendDocumentURL={handelDocURL} />

                    <FormField
                      control={form.control}
                      name="documentNumber"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="font-semibold   ">
                            Document Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1XU89BW0BH"
                              {...field}
                              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                {step === 4 && (
                  <>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="font-semibold text-gray-700">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="font-semibold text-gray-700">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <div className="flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      className="block bg-gray-300 mt-4 py-2 px-4 rounded-2xl text-white font-semibold mb-2"
                      onClick={prevStep}
                    >
                      Back
                    </button>
                  )}

                  {step < 4 && (
                    <button
                      type="button"
                      className="block bg-indigo-600 mt-4 py-2 px-4 rounded-2xl text-white font-semibold mb-2"
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  )}

                  {step === 4 && (
                    <button
                      type="submit"
                      className="block bg-green-600 mt-4 py-2 px-4 rounded-2xl text-white font-semibold mb-2"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
              <div>
                Already have account ?{" "}
                <Link href="/auth/sign-in" className=" text-blue-600 underline">
                  Click Here
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-white to-blue-600 justify-around items-center hidden"></div>
    </div>
  );
}
