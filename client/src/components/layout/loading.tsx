"use client";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="sticky z-30 scroll-auto w-screen h-screen flex justify-center items-center bg-[rgba(255,255,255,.7)]">
      <CircularProgress />
    </div>
  );
};

export default Loading;
