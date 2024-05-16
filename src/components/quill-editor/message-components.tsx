import React from "react";

export const MessageComponents = () => {
  return (
    <div className="p-4 w-full relative flex flex-col gap-6 border bg-slate-700">
      <div className="sticky bg-white w-full">
        <p className="text-sm max-w-fit text-blueshade4">
          Message your corresponding messages
        </p>
      </div>

      <div className="h-[500px] overflow-y-scroll no-scrollbar flex flex-col gap-4">
        {/* {messages?.map((comment: any, index: number) => {
          const { adminUser, clientUser, createdAt } = comment;
          return (
            <div key={index}>
              {adminUser ? (
                <Send adminUser={adminUser} comment={comment} />
              ) : (
                <Reply
                  date={createdAt}
                  clientUser={clientUser}
                  message={comment}
                />
              )}
            </div>
          );
        })} */}
      </div>

      <form
        onSubmit={(e) => {
          console.log("submit");
        }}
        className="bg-blue-200 rounded-lg flex flex-row gap-2 items-center px-2"
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
          className="bg-primaryorange text-white px-4 py-2 rounded-lg"
        >
          send
        </button>
      </form>
    </div>
  );
};
