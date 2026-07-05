import { getEnv, isEntitlementActive } from './env';

export type ReleaseAsset = {
	name: string;
	url: string;
	tag: string;
	publishedAt: string;
};

type GhRelease = {
	tag_name: string;
	published_at: string;
	prerelease: boolean;
	draft: boolean;
	assets: { name: string; browser_download_url: string }[];
};

function githubHeaders(): Record<string, string> {
	return {
		Authorization: `Bearer ${getEnv('GITHUB_TOKEN')}`,
		Accept: 'application/vnd.github+json',
		'User-Agent': 'cbfs-pro-website'
	};
}

async function listStableReleases(): Promise<GhRelease[]> {
	const repo = getEnv('GITHUB_REPO');
	const releases: GhRelease[] = [];
	let page = 1;

	while (page <= 5) {
		const res = await fetch(
			`https://api.github.com/repos/${repo}/releases?per_page=100&page=${page}`,
			{ headers: githubHeaders() }
		);

		if (!res.ok) {
			throw new Error(`GitHub API error: ${res.status}`);
		}

		const batch = (await res.json()) as GhRelease[];
		if (batch.length === 0) break;

		releases.push(...batch.filter((r) => !r.draft && !r.prerelease));
		if (batch.length < 100) break;
		page += 1;
	}

	return releases.sort(
		(a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
	);
}

function zipAsset(release: GhRelease): ReleaseAsset {
	const zip = release.assets.find((a) => a.name.endsWith('.zip'));
	if (!zip) throw new Error(`No ZIP asset on release ${release.tag_name}`);

	return {
		name: zip.name,
		url: zip.browser_download_url,
		tag: release.tag_name,
		publishedAt: release.published_at
	};
}

/** Active licence → latest stable; expired → newest stable with published_at ≤ expiresAt. */
export async function getReleaseZipForEntitlement(expiresAt: number): Promise<ReleaseAsset> {
	const releases = await listStableReleases();
	if (releases.length === 0) throw new Error('No stable releases found');

	if (isEntitlementActive(expiresAt)) {
		return zipAsset(releases[0]);
	}

	const frozen = releases.find((r) => new Date(r.published_at).getTime() <= expiresAt);
	if (!frozen) {
		throw new Error('No release was published during your active licence period');
	}

	return zipAsset(frozen);
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
