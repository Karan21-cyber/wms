export const dynamic = "force-dynamic";
import React from "react";
import { getFolderDetails } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import LottieFolder from "@/components/dashboard-setup/lottie-folder";

const Folder = async ({ params }: { params: { folderId: string } }) => {
  const { data, error } = await getFolderDetails(params.folderId);
  if (error || !data.length) redirect("/dashboard");

  return (
    <div className="relative ">
      {/* <QuillEditor
        dirType="folder"
        fileId={params.folderId}
        dirDetails={data[0] || {}}
      /> */}
      <div className="h-screen flex flex-col gap-4">
        <div className="h-[10vh] flex  items-center px-4 py-1 border">
          <h1 className="text-2xl font-semibold text-center text-violet-800">
            {data[0]?.title}
          </h1>
        </div>

        <div className="h-[80vh] p-6 flex flex-col gap-3 justify-center items-center">
          <LottieFolder />
          <h3 className="text-changes font-semibold text-center text-lg text-violet-800">
            Now you can start adding files to this{" "}
            <span className="font-bold text-xl text-black">
              {data[0]?.title}{" "}
            </span>
            folder.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Folder;
