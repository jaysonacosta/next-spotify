/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SPOTIFY_CLIENT_ID: 'bf963c15511f4e4ebce4961adaa3be5c',
		SPOTIFY_CLIENT_SECRET: 'e31290b52e214313b9ddc0d029132617',
		JWT_SECRET: 'V33emBwrKppIny0jMJLVcU/QXEHCQrk9htwj5ROR6IQ=',
	},
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
