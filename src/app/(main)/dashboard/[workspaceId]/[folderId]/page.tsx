export const dynamic = "force-dynamic";
import React from "react";
import { getFolderDetails } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import LottieFolder from "@/components/dashboard-setup/lottie-folder";
import {
  ChangeFolderName,
  CommonBreadCrum,
} from "@/components/bread-crum/common-brecrum";

const Folder = async ({ params }: { params: { folderId: string } }) => {
  const { data, error } = await getFolderDetails(params.folderId);
  if (error || !data.length) redirect("/dashboard");

  return (
    <div className="relative ">
      <div className="h-screen flex flex-col gap-4">
        <div className="h-[10vh] flex  items-center px-4 py-1 border">
          <CommonBreadCrum />
        </div>

        <div className="h-[80vh] p-6 flex flex-col gap-3 justify-center items-center">
          <LottieFolder />
          <h3 className="text-changes font-medium text-center text-lg ">
            Now you can start adding files to this {}<ChangeFolderName /> {" "}
            folder.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Folder;
