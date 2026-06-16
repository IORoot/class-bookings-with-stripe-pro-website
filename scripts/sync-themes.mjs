#!/usr/bin/env node
/**
 * Sync theme metadata and screenshots from the themes repo into the website.
 * Local path: THEMES_REPO_PATH or ../class_bookings_for_stripe_pro_themes
 * Fallback: GitHub raw (IORoot/class-bookings-with-stripe-pro-themes)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_JSON = path.join(ROOT, 'src/lib/data/themes.json');
const OUT_STATIC = path.join(ROOT, 'static/themes');

const GITHUB_REPO = 'IORoot/class-bookings-with-stripe-pro-themes';
const GITHUB_BRANCH = 'master';
const GITHUB_BASE = `https://github.com/${GITHUB_REPO}/tree/${GITHUB_BRANCH}`;
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}`;

const SCREENSHOT_NAMES = ['screenshot.svg', 'screenshot.jpg', 'screenshot.png', 'screenshot.gif'];

function resolveLocalRepo() {
	if (process.env.THEMES_REPO_PATH) {
		return path.resolve(process.env.THEMES_REPO_PATH);
	}
	return path.resolve(ROOT, '../class_bookings_for_stripe_pro_themes');
}

async function pathExists(p) {
	try {
		await fs.access(p);
		return true;
	} catch {
		return false;
	}
}

async function listThemeSlugsFromGitHub() {
	const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/`, {
		headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'cbfs-pro-website-sync' }
	});
	if (!res.ok) {
		throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
	}
	const items = await res.json();
	return items.filter((item) => item.type === 'dir').map((item) => item.name);
}

async function readThemeJsonLocal(themeDir) {
	const jsonPath = path.join(themeDir, 'theme.json');
	const raw = await fs.readFile(jsonPath, 'utf8');
	return JSON.parse(raw);
}

async function readThemeJsonGitHub(slug) {
	const res = await fetch(`${RAW_BASE}/${slug}/theme.json`, {
		headers: { 'User-Agent': 'cbfs-pro-website-sync' }
	});
	if (!res.ok) {
		throw new Error(`Missing theme.json for ${slug} (${res.status})`);
	}
	return res.json();
}

async function findScreenshotLocal(themeDir, themeJson) {
	if (themeJson.screenshot) {
		const candidate = path.join(themeDir, themeJson.screenshot);
		if (await pathExists(candidate)) return themeJson.screenshot;
	}
	for (const name of SCREENSHOT_NAMES) {
		if (await pathExists(path.join(themeDir, name))) return name;
	}
	return null;
}

async function findScreenshotGitHub(slug, themeJson) {
	const candidates = themeJson.screenshot
		? [themeJson.screenshot, ...SCREENSHOT_NAMES.filter((n) => n !== themeJson.screenshot)]
		: SCREENSHOT_NAMES;

	for (const name of candidates) {
		const res = await fetch(`${RAW_BASE}/${slug}/${name}`, {
			method: 'HEAD',
			headers: { 'User-Agent': 'cbfs-pro-website-sync' }
		});
		if (res.ok) return name;
	}
	return null;
}

async function copyScreenshotLocal(themeDir, slug, filename) {
	const destDir = path.join(OUT_STATIC, slug);
	await fs.mkdir(destDir, { recursive: true });
	await fs.copyFile(path.join(themeDir, filename), path.join(destDir, filename));
	return `/themes/${slug}/${filename}`;
}

async function downloadScreenshotGitHub(slug, filename) {
	const res = await fetch(`${RAW_BASE}/${slug}/${filename}`, {
		headers: { 'User-Agent': 'cbfs-pro-website-sync' }
	});
	if (!res.ok) throw new Error(`Screenshot download failed for ${slug}/${filename}`);
	const destDir = path.join(OUT_STATIC, slug);
	await fs.mkdir(destDir, { recursive: true });
	const buffer = Buffer.from(await res.arrayBuffer());
	await fs.writeFile(path.join(destDir, filename), buffer);
	return `/themes/${slug}/${filename}`;
}

function normalizeTheme(meta, screenshotUrl) {
	const slug = meta.slug;
	return {
		slug,
		name: meta.name ?? slug,
		description: meta.description ?? '',
		version: meta.version ?? '1.0.0',
		provides: Array.isArray(meta.provides) ? meta.provides : [],
		tags: Array.isArray(meta.tags) ? meta.tags : [],
		screenshotUrl,
		repoUrl: `${GITHUB_BASE}/${slug}`
	};
}

async function syncFromLocal(localRepo) {
	const entries = await fs.readdir(localRepo, { withFileTypes: true });
	const slugs = entries.filter((e) => e.isDirectory() && !e.name.startsWith('.')).map((e) => e.name);
	const themes = [];

	for (const slug of slugs.sort()) {
		const themeDir = path.join(localRepo, slug);
		if (!(await pathExists(path.join(themeDir, 'theme.json')))) continue;

		const meta = await readThemeJsonLocal(themeDir);
		const screenshotFile = await findScreenshotLocal(themeDir, meta);
		if (!screenshotFile) {
			console.warn(`  skip ${slug}: no screenshot`);
			continue;
		}
		const screenshotUrl = await copyScreenshotLocal(themeDir, slug, screenshotFile);
		themes.push(normalizeTheme(meta, screenshotUrl));
	}

	return themes;
}

async function syncFromGitHub() {
	const slugs = await listThemeSlugsFromGitHub();
	const themes = [];

	for (const slug of slugs.sort()) {
		try {
			const meta = await readThemeJsonGitHub(slug);
			const screenshotFile = await findScreenshotGitHub(slug, meta);
			if (!screenshotFile) {
				console.warn(`  skip ${slug}: no screenshot`);
				continue;
			}
			const screenshotUrl = await downloadScreenshotGitHub(slug, screenshotFile);
			themes.push(normalizeTheme(meta, screenshotUrl));
		} catch (err) {
			console.warn(`  skip ${slug}: ${err.message}`);
		}
	}

	return themes;
}

async function main() {
	const localRepo = resolveLocalRepo();
	let themes;
	let source;

	if (await pathExists(localRepo)) {
		source = localRepo;
		console.log(`Syncing themes from local repo: ${localRepo}`);
		themes = await syncFromLocal(localRepo);
	} else {
		source = GITHUB_REPO;
		console.log(`Local repo not found; syncing from GitHub: ${GITHUB_REPO}`);
		themes = await syncFromGitHub();
	}

	await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });
	await fs.mkdir(OUT_STATIC, { recursive: true });

	const payload = {
		syncedAt: new Date().toISOString(),
		source: source === localRepo && (await pathExists(localRepo)) ? 'local' : 'github',
		repoUrl: `https://github.com/${GITHUB_REPO}`,
		count: themes.length,
		themes
	};

	await fs.writeFile(OUT_JSON, `${JSON.stringify(payload, null, 2)}\n`);
	console.log(`Wrote ${themes.length} themes → ${path.relative(ROOT, OUT_JSON)}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
