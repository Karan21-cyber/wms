"use client";
import { useAppState } from "@/lib/providers/state-provider";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

export const CommonBreadCrum = () => {
  const { state, workspaceId, folderId, dispatch } = useAppState();
  const pathname = usePathname();

  const breadCrumbs = useMemo(() => {
    if (!pathname || !state.workspaces || !workspaceId) return;
    const segments = pathname
      .split("/")
      .filter((val) => val !== "dashboard" && val);
    const workspaceDetails = state.workspaces.find(
      (workspace) => workspace.id === workspaceId
    );
    const workspaceBreadCrumb = workspaceDetails
      ? `${workspaceDetails.iconId} ${workspaceDetails.title}`
      : "";
    if (segments.length === 1) {
      return workspaceBreadCrumb;
    }

    const folderSegment = segments[1];
    const folderDetails = workspaceDetails?.folders.find(
      (folder) => folder.id === folderSegment
    );
    const folderBreadCrumb = folderDetails
      ? `/ ${folderDetails.iconId} ${folderDetails.title}`
      : "";

    if (segments.length === 2) {
      return `${workspaceBreadCrumb} ${folderBreadCrumb}`;
    }

    const fileSegment = segments[2];
    const fileDetails = folderDetails?.files.find(
      (file) => file.id === fileSegment
    );
    const fileBreadCrumb = fileDetails
      ? `/ ${fileDetails.iconId} ${fileDetails.title}`
      : "";

    return `${workspaceBreadCrumb} ${folderBreadCrumb} ${fileBreadCrumb}`;
  }, [state, pathname, workspaceId]);

  return <div>{breadCrumbs}</div>;
};

export const ChangeFolderName = () => {
  const { state, workspaceId, folderId, dispatch } = useAppState();
  const pathname = usePathname();

  const breadCrumbs = useMemo(() => {
    if (!pathname || !state.workspaces || !workspaceId) return;

    const segments = pathname
      .split("/")
      .filter((val) => val !== "dashboard" && val);

    const workspaceDetails = state.workspaces.find(
      (workspace) => workspace.id === workspaceId
    );

    const folderSegment = segments[1];
    const folderDetails = workspaceDetails?.folders.find(
      (folder) => folder.id === folderSegment
    );

    const folderBreadCrumb = folderDetails
      ? `/ ${folderDetails.iconId} ${folderDetails.title}`
      : "";

    if (segments.length === 2) {
      return `${folderBreadCrumb}`;
    }
  }, [state, pathname, workspaceId]);

  return <span className="font-bold text-violet-800">{breadCrumbs} </span>;
};
