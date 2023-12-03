/** @type {import('next').NextConfig} */
// const nextConfig = {};

module.exports = () => {
  // const rewrites = () => {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3000/api/:path*",
  //     },
  //   ];
  // };
  return {
    // rewrites,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "firebasestorage.googleapis.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
  };
};
