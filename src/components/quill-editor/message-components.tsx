/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSocket } from "@/lib/providers/socket-provider";
import { createMessage, getMessages } from "@/lib/supabase/queries";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const MessageComponents = ({
  user,
  fileId,
}: {
  user: any;
  fileId?: any;
}) => {
  const { socket, isConnected } = useSocket();
  const [messagess, setMessagess] = useState<any>([]);
  const [message, setMessage] = useState<any>("");

  const fetchMessages = async () => {
    const { data, error } = await getMessages(fileId);
    if (error) {
      console.error("error", error);
    }
    console.log("messages from db", data);
    setMessagess(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (socket === null || !fileId) return;
    socket.emit("create-room", fileId);
  }, [socket, fileId]);

  useEffect(() => {
    if (socket === null) return;
    const socketHandler = (data: any) => {
      if (data?.fileId !== fileId) return;
      setMessagess((prev: any) => [...prev, data]);
    };
    // listen for changes from server
    socket.on("receive-message", socketHandler);
    return () => {
      socket.off("receive-message", socketHandler);
    };
  }, [socket, message]);

  const sendMessage = async () => {
    if (socket === null) return;
    setMessagess((prev: any) => [
      ...prev,
      { senderEmail: user?.email, message, fileId },
    ]);
    socket.emit("send-message", message, fileId, user?.email, user?.id);
    // const { error, data } = await createMessage(message, user?.id, fileId);

    // if (error) {
    //   console.error("Error creating message", error);
    //   return;
    // }
    setMessage("");
  };

  return (
    <div className="p-4 w-full relative flex flex-col gap-6 text-black bg-gray-300 rounded">
      <div className="sticky w-full">
        <p className="text-sm max-w-fit text-blueshade4">
          Message your corresponding collaborators
        </p>
      </div>

      <div className="message-section-preview h-[500px] overflow-y-scroll no-scrollbar bg-white text-black flex flex-col gap-4 rounded">
        {messagess?.map((msg: any, index: number) => (
          <div
            key={index}
            className={clsx(
              " w-full flex p-2 ",
              user?.email === msg?.senderEmail && "justify-end"
            )}
          >
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
                  user?.email === msg?.senderEmail && "text-end"
                )}
              >
                <span className="px-2 py-[2px] rounded bg-blue-600 text-white">
                  {msg?.senderEmail}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
        className="rounded-lg flex flex-row gap-2 items-center px-2"
      >
        <div className="common-input-wrapper w-full flex flex-row gap-2 items-center">
          <div className="w-full flex flex-col">
            <input
              type="text"
              id="message"
              onChange={(e) => {
                e.preventDefault();
                setMessage(e.target.value);
              }}
              value={message}
              className="common-input w-full h-[42px] outline-none text-black px-4 text-sm mt-2 mb-1.5 rounded-lg bg-blueshade8"
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
