/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'i.scdn.co',
			't.scdn.co',
			'charts-images.scdn.co',
			'daily-mix.scdn.co',
			'mosaic.scdn.co',
		],
	},
};

module.exports = nextConfig;
