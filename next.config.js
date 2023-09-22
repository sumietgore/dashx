/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images2.imgbox.com', "i.imgur.com", "imgur.com"],
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig
