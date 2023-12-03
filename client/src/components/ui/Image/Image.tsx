import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  loading?: "eager" | "lazy" | undefined;
  className?: string;
  decoding?: "async" | "auto" | "sync" | undefined;
}

const Image: React.FC<ImageProps> = ({
  alt,
  className,
  decoding = "async",
  loading = "lazy",
  src,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={className}
    />
  );
};

export default Image;
