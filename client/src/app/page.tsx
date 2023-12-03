import { Container } from "@/components/layout";
import { HomeBanner, ViewHomeProducts } from "@/features/Home";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "E-commerce",
    description:
      "Welcome to ElectriCity, your one-stop-shop for all your electronic needs! With a vast array of gadgets and gizmos, we're here to energize your world with the latest and greatest in technology. Our exclusive collection ranges from the essential to the extraordinary, ensuring there's something for everyone.",
  };
}

export default async function Home() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <div className="p-8">
        <Container>
          <HomeBanner />
          <ViewHomeProducts />
        </Container>
      </div>
    </Suspense>
  );
}
