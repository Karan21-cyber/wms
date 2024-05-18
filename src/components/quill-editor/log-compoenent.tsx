"use client";

export const LogComponent = ({ logList }: { logList: any[] }) => {
  return (
    <>
      <div className="p-4 w-full relative flex flex-col gap-6 text-black bg-gray-300 rounded">
        <div className="sticky w-full">
          <p className="text-sm max-w-fit text-blueshade4">
            Logs your corresponding collaborators
          </p>
        </div>

        <div className="h-[500px] overflow-y-auto bg-white no-scrollbar ">
          {logList?.map((log: any, index: number) => (
            <div key={index} className="flex flex-col gap-2 flex-wrap">
              <p className="text-sm px-1 py-[2px] bg-gray-300 rounded ">
                {log?.content}
              </p>
              <div className=" w-full flex gap-2 flex-wrap">
                <span className="text-xs ">{log?.email}</span>
                <span className="text-xs ">{log?.createdAt as string}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
