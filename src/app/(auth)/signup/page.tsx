"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Loader from "@/components/global/Loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";
import { FormSchema } from "@/lib/types";
import { actionSignUpUser } from "@/lib/server-actions/auth-actions";
import SigupBanner from "@/components/signup-login/signup-banner";
import { lstat } from "fs";

const SignUpFormSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid Email" }),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be minimum 6 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, "Password must be minimum 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExchangeError,
        "border-red-500/50": codeExchangeError,
        "text-red-700": codeExchangeError,
      }),
    [codeExchangeError]
  );

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async ({ email, password }: z.infer<typeof FormSchema>) => {
    const { error } = await actionSignUpUser({ email, password });
    if (error) {
      setSubmitError(error.message);
      form.reset();
      return;
    }
    setConfirmation(true);
  };

  return (
    <>
      <div className={`signup-section w-full md:h-screen  flex pt-16 md:pt-0 `}>
        <div className="part1-container hidden h-screen lg:flex justify-center items-center relative w-full    ">
          <Image
            fill
            alt="backgroundImage"
            src={"/signup/backgroundImage.png"}
            className="background-image"
          />
          <div className="signup-container w-ful  absolute z-[99] flex justify-center ">
            <SigupBanner />
          </div>
        </div>
        <div className="part2-container relative w-full flex  justify-center items-center flex-col bg-[#FFF]">
          <div className="part1-container relative w-full lg:w-[50%] flex px-[50px] justify-between items-center flex-col bg-[#FFF]">
            <div className="form-wrapper  flex flex-col gap-6 ">
              <Link
                href="/"
                className="w-full flex justify-center items-center"
              >
                <Image
                  src={"/logo.png"}
                  alt="space-world Logo"
                  className=""
                  width={150}
                  height={50}
                />
              </Link>
              <h1
                className={`form-highlight  text-center text-4xl md:text-6xl font-bold -tracking-[1.34px] `}
              >
                Sign Up
              </h1>

              <div className="form-container  ">
                <Form {...form}>
                  <form
                    onChange={() => {
                      if (submitError) setSubmitError("");
                    }}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full sm:justify-center sm:w-[400px]
        space-y-6 flex
        flex-col
        "
                  >
                    <FormDescription
                      className="
        text-foreground/60"
                    >
                      An all-In-One Collaboration and Productivity Platform
                    </FormDescription>
                    {!confirmation && !codeExchangeError && (
                      <>
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
                        <FormField
                          disabled={isLoading}
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Confirm Password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full p-6"
                          disabled={isLoading}
                        >
                          {!isLoading ? "Create Account" : <Loader />}
                        </Button>
                      </>
                    )}

                    {submitError && <FormMessage>{submitError}</FormMessage>}

                    <div className="self-container flex   items-center justify-between">
                      <div className="w-full flex items-center">
                        <p>Already have an account?</p>
                        <Link href="/login" className="text-primary pl-[4px]">
                          Login
                        </Link>
                      </div>
                      <Link href="/" className="text-gray-400 ">
                        Back
                      </Link>
                    </div>
                    {(confirmation || codeExchangeError) && (
                      <>
                        <Alert className={confirmationAndErrorStyles}>
                          {!codeExchangeError && (
                            <MailCheck className="h-4 w-4" />
                          )}
                          <AlertTitle>
                            {codeExchangeError
                              ? "Invalid Link"
                              : "Check your email."}
                          </AlertTitle>
                          <AlertDescription>
                            {codeExchangeError ||
                              "An email confirmation has been sent."}
                          </AlertDescription>
                        </Alert>
                      </>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
