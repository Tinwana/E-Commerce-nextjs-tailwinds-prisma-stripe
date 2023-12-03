"use client";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-30 scroll-auto w-screen h-screen flex justify-center items-center bg-[rgba(255,255,255,.7)]">
      <CircularProgress />
    </div>
  );
};

export default Loading;
