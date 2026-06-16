import { getEnv } from './env';

export type ReleaseAsset = {
	name: string;
	url: string;
};

export async function getLatestReleaseZip(): Promise<ReleaseAsset> {
	const repo = getEnv('GITHUB_REPO');
	const token = getEnv('GITHUB_TOKEN');

	const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/vnd.github+json',
			'User-Agent': 'cbfs-pro-website'
		}
	});

	if (!res.ok) {
		throw new Error(`GitHub API error: ${res.status}`);
	}

	const release = (await res.json()) as {
		assets: { name: string; url: string; browser_download_url: string }[];
	};

	const zip = release.assets.find((a) => a.name.endsWith('.zip'));
	if (!zip) throw new Error('No ZIP asset on latest release');

	return {
		name: zip.name,
		url: zip.browser_download_url
	};
}

export async function fetchReleaseAsset(downloadUrl: string): Promise<Response> {
	const token = getEnv('GITHUB_TOKEN');
	return fetch(downloadUrl, {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/octet-stream',
			'User-Agent': 'cbfs-pro-website'
		},
		redirect: 'follow'
	});
}
