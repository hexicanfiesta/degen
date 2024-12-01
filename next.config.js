/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crimson-secure-rabbit-370.mypinata.cloud",
        port: "",
        pathname: "/ipfs/**",
        search: "",
      },
    ],
  },
};

export default config;
