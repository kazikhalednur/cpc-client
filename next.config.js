/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.istockphoto.com",
      "images.unsplash.com",
      "localhost",
      "127.0.0.1",
      "res.cloudinary.com", // If you're using Cloudinary
      "storage.googleapis.com", // If you're using Google Cloud Storage
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
