"use client";
import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export const MessageComponents = ({
  user,
  messages,
}: {
  user: any;
  messages?: any;
}) => {
  // const [messages, setMessages] = React.useState([]);

  console.log("user", user);

  const message: any = [
    {
      email: "karandk536@gmail.com",
      message:
        "hi aitc hi karanuagsdf kjgask jdgfhakjsdfga kjsd gfahsgdf kjah hi karanuagsdf kjgask jdgfhakjsdfga kjsd gfahsgdf kjah",
    },
    {
      email: "karan.chaudhary@aitc.ai",
      message:
        "hi karanuagsdf kjgask jdgfhakjsdfga kjsd gfahsgdf kjah hi karanuagsdf kjgask jdgfhakjsdfga kjsd gfahsgdf kjah",
    },
    { email: "karandk536@gmail.com", message: "change this docs" },
    { email: "karan.chaudhary@aitc.ai", message: "this is message" },
    { email: "karandk536@gmail.com", message: "this is new message " },
    { email: "karan.chaudhary@aitc.ai", message: "I have changed the things " },
    { email: "karan.chaudhary@aitc.ai", message: "I am new users" },
  ];

  return (
    <div className="p-4 w-full relative flex flex-col gap-6  text-black bg-gray-300 rounded">
      <div className="sticky w-full">
        <p className="text-sm max-w-fit text-blueshade4">
          Message your corresponding collaborators
        </p>
      </div>

      <div className="h-[500px] overflow-y-scroll no-scrollbar bg-white text-black flex flex-col gap-4 rounded">
        {message?.map((msg: any, index: number) => (
          <div
            key={index}
            className={clsx(
              " w-full flex p-2 ",
              user?.email === msg?.email && "justify-end"
            )}
          >
            {" "}
            <div
              className={clsx(
                "max-w-[60%] w-auto flex flex-col gap-1 rounded-lg"
              )}
            >
              <p className="text-sm bg-gray-200 px-2 py-[2px] flex-wrap rounded">
                {msg?.message}
              </p>
              <p
                className={clsx(
                  "text-xs text-start ",
                  user?.email === msg?.email && "text-end"
                )}
              >
                <span className="px-2 py-[2px] rounded bg-blue-600 text-white">
                  {msg?.email}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          console.log("submit");
        }}
        className="rounded-lg flex flex-row gap-2 items-center px-2"
      >
        <div className="common-input-wrapper w-full flex flex-row gap-2 items-center">
          <div className="w-full flex flex-col">
            <input
              type="text"
              id="message"
              className="common-input w-full h-[42px] outline-none text-black px-4 text-sm  mt-2 mb-1.5 rounded-lg bg-blueshade8"
              placeholder="Type your message here"
            />
          </div>
        </div>
        <div className="message-file-input flex flex-row gap-2 items-center">
          {/* <label htmlFor="fileInput" className="file-input-label">
              <FiPaperclip className="clip-icon" /> 
              <input
                id="fileInput"
                type="file"
                onChange={(event) => {
                  handleFileUpload(event);
                }}
                disabled={!access}
                className={classNames("file-input cursor-pointer")}
              />
            </label> */}
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-white px-4 py-2 rounded-lg"
        >
          send
        </button>
      </form>
    </div>
  );
};
