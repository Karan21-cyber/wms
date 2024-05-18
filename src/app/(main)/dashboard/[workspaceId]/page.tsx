export const dynamic = "force-dynamic";
import LottieDashboard from "@/components/dashboard-setup/lottie-animation";
import { getWorkspaceDetails } from "@/lib/supabase/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
  const { data, error } = await getWorkspaceDetails(params.workspaceId);
  if (error || !data.length) redirect("/dashboard");
  return (
    <div className="h-screen flex flex-col gap-4">
      <div className="h-[10vh] flex  items-center px-4 py-1 border">
        {data[0]?.logo && (
          <Image
            src={data[0]?.logo as string}
            alt="Workspace Logo"
            width={100}
            height={100}
            loading="lazy"
            className="rounded-full"
          />
        )}
        <h1 className="text-2xl font-semibold text-center text-violet-800">
          {data[0]?.title}
        </h1>
      </div>

      <div className="h-[80vh] p-6 flex flex-col gap-3 justify-center items-center">
        <LottieDashboard />
        <h3 className="text-changes font-semibold text-center text-lg text-violet-800">
          Organizing your workspace efficiently starts with creating the
          necessary folders and files.
        </h3>
      </div>
    </div>
  );
};

export default Workspace;
