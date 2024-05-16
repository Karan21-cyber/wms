"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/cypresslogo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/Loader";
import { actionLoginUser } from "@/lib/server-actions/auth-actions";
import SigupBanner from "@/components/signup-login/signup-banner";

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    }
    router.replace("/dashboard");
  };

  return (
    <>
      <div className={`signup-section w-full h-screen flex overflow-hidden`}>
        <div className={`signup-section w-full h-screen flex overflow-hidden`}>
          <div className="part1-container relative w-full hidden  lg:block ">
            <Image
              fill
              alt="backgroundImage"
              src={"/signup/backgroundImage.png"}
              className="background-image"
            />
            <div className="signup-container w-full h-screen absolute z-[99] flex justify-center ">
              <SigupBanner />
            </div>
          </div>
          <div className="part2-container relative w-full flex  justify-center items-center flex-col bg-[#FFF]">
            <div className="part1-container relative w-full lg:w-[50%] flex px-[50px] justify-between items-center flex-col bg-[#FFF]">
              <div className="form-wrapper  flex flex-col ">
                <h1
                  className={`form-highlight mt-9 text-center text-4xl md:text-6xl font-bold -tracking-[1.34px] `}
                >
                  Log In
                </h1>

                <div className="form-container mt-11  ">
                  <Form {...form}>
                    <form
                      onChange={() => {
                        if (submitError) setSubmitError("");
                      }}
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
                    >
                      <FormDescription
                        className="
        text-foreground/60"
                      >
                        An all-In-One Collaboration and Productivity Platform
                      </FormDescription>
                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {submitError && <FormMessage>{submitError}</FormMessage>}
                      <Button
                        type="submit"
                        className="w-full p-6"
                        size="lg"
                        disabled={isLoading}
                      >
                        {!isLoading ? "Login" : <Loader />}
                      </Button>
                      <span className="self-container flex items-center">
                        Dont have an account?{" "}
                        <div className="flex justify-between items-center">
                          {" "}
                          <Link href="/signup" className="text-primary">
                            Sign Up
                          </Link>
                          <Link href="/" className="text-gray-400 md:hidden">
                            Back to home
                          </Link>
                        </div>
                      </span>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
