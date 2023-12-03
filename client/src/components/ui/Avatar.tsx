import { Image } from "@/components/ui";
import React, { memo } from "react";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="avatar"
        className="rounded-full h-[30px] w-[30px]"
      />
    );
  }

  return <FaUserCircle size={24} />;
};

export default memo(Avatar);
