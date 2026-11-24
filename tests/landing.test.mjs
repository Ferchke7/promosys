import assert from 'node:assert/strict';
import test from 'node:test';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const TEST_PORT = 3099;

test('production server renders PROMSYS landing page', async (t) => {
	const server = spawn('node', ['build/index.js'], {
		env: { ...process.env, PORT: String(TEST_PORT), HOST: '127.0.0.1' },
		stdio: 'ignore'
	});

	t.after(() => {
		server.kill();
	});

	// Wait for server to bind
	let healthy = false;
	for (let i = 0; i < 20; i++) {
		try {
			const res = await fetch(`http://127.0.0.1:${TEST_PORT}/`);
			if (res.status === 200) {
				healthy = true;
				break;
			}
		} catch {
			await sleep(200);
		}
	}

	assert.ok(healthy, 'Server did not start in time');

	const res = await fetch(`http://127.0.0.1:${TEST_PORT}/`);
	assert.equal(res.status, 200);
	const html = await res.text();

	assert.match(html, /PROMSYS/i);
	assert.match(html, /MES/i);
	assert.match(html, /APS/i);
	assert.match(html, /\+998 \(77\) 117-66-96/);
	assert.match(html, /promsys_uz/);
	assert.match(html, /ferchke@yandex\.ru/);
	assert.match(html, /3D-ЦЕХ/i);
	assert.match(html, /ИНТЕРАКТИВНЫЙ 3D-ЗАВОД PROMSYS/i);
	assert.doesNotMatch(html, /TAKT \/\/ OS/);
});

test('production server serves 3D models', async (t) => {
	const server = spawn('node', ['build/index.js'], {
		env: { ...process.env, PORT: String(TEST_PORT + 2), HOST: '127.0.0.1' },
		stdio: 'ignore'
	});

	t.after(() => {
		server.kill();
	});

	let healthy = false;
	for (let i = 0; i < 20; i++) {
		try {
			const res = await fetch(`http://127.0.0.1:${TEST_PORT + 2}/models/factory_cell.glb`, { method: 'HEAD' });
			if (res.status === 200) {
				healthy = true;
				break;
			}
		} catch {
			await sleep(200);
		}
	}

	assert.ok(healthy, 'Model endpoint did not respond with 200');
	const headRes = await fetch(`http://127.0.0.1:${TEST_PORT + 2}/models/factory_cell.glb`, { method: 'HEAD' });
	assert.equal(headRes.status, 200);
});

test('production server serves robots.txt and sitemap.xml', async (t) => {
	const server = spawn('node', ['build/index.js'], {
		env: { ...process.env, PORT: String(TEST_PORT + 1), HOST: '127.0.0.1' },
		stdio: 'ignore'
	});

	t.after(() => {
		server.kill();
	});

	let healthy = false;
	for (let i = 0; i < 20; i++) {
		try {
			const res = await fetch(`http://127.0.0.1:${TEST_PORT + 1}/robots.txt`);
			if (res.status === 200) {
				healthy = true;
				break;
			}
		} catch {
			await sleep(200);
		}
	}

	assert.ok(healthy, 'Server did not start in time');

	const robotsRes = await fetch(`http://127.0.0.1:${TEST_PORT + 1}/robots.txt`);
	assert.equal(robotsRes.status, 200);
	const robots = await robotsRes.text();
	assert.match(robots, /User-agent:\s*\*/i);
	assert.match(robots, /sitemap\.xml/i);

	const sitemapRes = await fetch(`http://127.0.0.1:${TEST_PORT + 1}/sitemap.xml`);
	assert.equal(sitemapRes.status, 200);
	const sitemap = await sitemapRes.text();
	assert.match(sitemap, /https:\/\/promosys\.duda\.uz\//);
});
