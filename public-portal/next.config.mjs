/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       destination: "/",
  //     },
  //   ];
  // },
};

export default nextConfig;
