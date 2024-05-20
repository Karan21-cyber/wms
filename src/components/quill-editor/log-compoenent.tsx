"use client";

export const LogComponent = ({ logList }: { logList: any[] }) => {
  console.log("date", logList[0]?.createdAt?.toString());
  return (
    <>
      <div className="p-4 w-full relative flex flex-col gap-6 text-black bg-gray-300 rounded">
        <div className="sticky w-full">
          <p className="text-sm max-w-fit text-blueshade4">
            Logs your corresponding collaborators
          </p>
        </div>

        <div className="p-2 h-[500px] overflow-y-auto flex flex-col gap-2 bg-white no-scrollbar ">
          {logList?.map((log: any, index: number) => (
            <div
              key={index}
              className="flex p-1 flex-col flex-wrap border rounded "
            >
              <p className="text-sm px-1 py-[2px] bg-gray-300  ">
                {log?.content === " "
                  ? "Space Added"
                  : log?.content === "\n"
                  ? "Added new line" + log?.content
                  : "Content Added : " + log?.content}
              </p>
              <div className=" w-full flex flex-col flex-wrap">
                <span className="text-xs text-violet-600 ">{log?.email}</span>
                <span className="text-xs text-violet-600">
                  {log?.createdAt?.toString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
