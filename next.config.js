const { withGoogleFonts } = require("nextjs-google-fonts");
/**
 * @type {import('next').NextConfig}
 */

 const nextConfig = {
    /* config options here */
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
  }

  const withGoogleFonts2 = withGoogleFonts({
    googleFonts: {
      fonts: [
        "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
      ],
    },
  });
  
  module.exports = { nextConfig, withGoogleFonts2 }