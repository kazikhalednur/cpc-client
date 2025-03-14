/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.istockphoto.com",
      "images.unsplash.com",
      "localhost",
      "res.cloudinary.com", // If you're using Cloudinary
      "storage.googleapis.com", // If you're using Google Cloud Storage
    ],
  },
};

module.exports = nextConfig;
