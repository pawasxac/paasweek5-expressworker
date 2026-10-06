import { httpServerHandler } from "cloudflare:node";
import express from "express";

const app = express();

// Challenge: Middleware Logger Express
app.use((req, res, next) => {
	console.log(`[LOGGER] ${req.method} ${req.url} - ${new Date().toISOString()}`);
	next();
});

app.get("/", (req, res) => {
	res.json({ message: "Hello Express on Cloudflare Workers!" });
});

app.get("/api/status", (req, res) => {
	res.json({
		status: "ok",
		subject: "PaaS",
		week: 5,
		platform: "Cloudflare Workers",
	});
});

app.get("/api/info", (req, res) => {
	res.json({
		framework: "Express",
		runtime: "Cloudflare Workers",
		course: "Platform as a Service",
	});
});

app.get("/api/log-test", (req, res) => {
	console.log("Endpoint /api/log-test dipanggil");
	res.json({
		logged: true,
	});
});

app.get("/api/time", (req, res) => {
	const now = new Date();
	res.json({
		iso: now.toISOString(),
		unix: Math.floor(now.getTime() / 1000),
		wib: now.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
	});
});

// Challenge: Route Parameter /hello/:name
app.get("/hello/:name", (req, res) => {
	const { name } = req.params;
	res.json({
		message: `Hello, ${name}!`,
		framework: "Express on Cloudflare Workers",
	});
});

// Challenge: Response HTML Sederhana
app.get("/html", (req, res) => {
	res.send(`
		<!DOCTYPE html>
		<html lang="id">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Cloudflare Workers + Express</title>
			<style>
				body {
					font-family: system-ui, -apple-system, sans-serif;
					background: #0f172a;
					color: #f8fafc;
					display: flex;
					justify-content: center;
					align-items: center;
					min-height: 100vh;
					margin: 0;
				}
				.card {
					background: #1e293b;
					padding: 2.5rem;
					border-radius: 1rem;
					box-shadow: 0 10px 25px rgba(0,0,0,0.5);
					text-align: center;
					border: 1px solid #334155;
					max-width: 420px;
				}
				h1 { color: #f97316; margin-bottom: 0.5rem; }
				p { color: #94a3b8; line-height: 1.6; }
				.badge {
					background: #0284c7;
					color: white;
					padding: 0.35rem 0.85rem;
					border-radius: 9999px;
					font-size: 0.875rem;
					font-weight: 600;
					display: inline-block;
					margin-top: 1rem;
				}
			</style>
		</head>
		<body>
			<div class="card">
				<h1>⚡ Cloudflare Workers</h1>
				<p>Express.js berjalan langsung di jaringan Edge Cloudflare menggunakan <code>httpServerHandler</code></p>
				<span class="badge">PaaS Week 5 Challenge</span>
			</div>
		</body>
		</html>
	`);
});

app.listen(3000);

export default httpServerHandler({ port: 3000 });
