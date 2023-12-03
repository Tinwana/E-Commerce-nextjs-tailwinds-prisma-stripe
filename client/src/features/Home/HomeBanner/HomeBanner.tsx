import { Image } from "@/components/ui";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";

const HomeBanner: React.FC = async () => {
  return (
    <article className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <section className="mb-8 md:mb-0 text-center ">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Summer Sale
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Enjoys discounts on selected items
          </p>
          <p className="text-2xl md:text-5xl text-yellow-400 font-bold animate-bounce">
            GET 50% OFF
          </p>
        </section>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner-image.png"
            alt="Banner image"
            className="object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </article>
  );
};

export default HomeBanner;
