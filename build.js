/* The Threat Desk page builder.
   buildSite(posts) returns an object of { "<path>": "<html>" } for every post page plus archive.html.
   posts: array of {slug, date, cat, sev, title, dek, body, who, todo, cves, sources:[{name,url}]}.
   body uses "## " lines for subheadings, "- " lines for bullet items, blank-line-free paragraphs per line. */
function buildSite(posts) {
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const longDate = d => { const [y,m,dd] = d.split("-").map(Number); return months[m-1] + " " + dd + ", " + y; };
  const sevLabel = {critical:"Critical", high:"High", info:"Brief"};
  const sorted = posts.slice().sort((a,b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

  const favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 132 132'%3E%3Crect width='132' height='132' rx='26' fill='%230f131b'/%3E%3Cpath d='M26 40H70M48 40V100' stroke='%23e8eaf0' stroke-width='15' stroke-linecap='round' fill='none'/%3E%3Cpath d='M70 58H82A20 20 0 0 1 82 98H70Z' stroke='%237d93ff' stroke-width='13' stroke-linejoin='round' fill='none'/%3E%3Ccircle cx='104' cy='28' r='14' fill='%23ff5a52'/%3E%3C/svg%3E";
  const logo = '<svg width="44" height="44" viewBox="0 0 132 132" aria-hidden="true"><rect x="6" y="6" width="120" height="120" rx="18" fill="none" stroke="#e8eaf0" stroke-width="8"/><path d="M28 40 H70 M49 40 V96" stroke="#e8eaf0" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M70 58 H82 A19 19 0 0 1 82 96 H70 Z" stroke="#7d93ff" stroke-width="10" stroke-linejoin="round" fill="none"/><circle cx="104" cy="28" r="10" fill="#ff5a52"/></svg>';

  const css = `
:root{--bg:#0f131b;--surface:#171c26;--raised:#1d2330;--ink:#e8eaf0;--muted:#9aa2b2;--rule:#2a3140;--accent:#7d93ff;--alert:#ff5a52;--high:#f5a524;--info:#4cc490;--body:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;--mono:"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace;color-scheme:dark}
*{box-sizing:border-box}html,body{margin:0}
body{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.65}
a{color:var(--accent)}:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:4px}
.wrap{max-width:1100px;margin:0 auto;padding:0 20px}
.top{border-bottom:1px solid var(--rule)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-top:14px;padding-bottom:14px}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--ink)}
.brand b{font-size:24px;letter-spacing:-.03em;font-weight:700;line-height:1}.brand b span{font-weight:400}.brand b em{font-style:normal;color:var(--accent)}
.brand small{display:block;font:500 10.5px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-top:4px}
.topnav{display:flex;gap:6px;flex-wrap:wrap}
.topnav a{font:600 14px var(--body);text-decoration:none;color:var(--muted);padding:9px 12px;border-radius:8px;border:1px solid var(--rule);background:var(--surface);min-height:40px;display:inline-flex;align-items:center}
.topnav a:hover,.topnav a[aria-current="page"]{color:var(--ink);border-color:var(--accent)}
.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:13px;color:var(--muted)}
.tag{font:500 12px var(--mono);text-transform:uppercase;letter-spacing:.08em;color:var(--accent)}
.sev{font:600 11px var(--mono);text-transform:uppercase;letter-spacing:.05em;padding:1px 7px;border-radius:3px;color:var(--bg)}
.sev.critical{background:var(--alert)}.sev.high{background:var(--high)}.sev.info{background:var(--info)}
.cve{font-family:var(--mono);font-size:12.5px;background:var(--surface);border:1px solid var(--rule);padding:1px 7px;border-radius:4px;color:var(--ink)}
.crumbs{font-size:13.5px;color:var(--muted);padding:22px 0 0}.crumbs a{color:var(--muted)}
footer{border-top:1px solid var(--rule);margin-top:56px;padding:24px 0 44px;font-size:13.5px;color:var(--muted)}
footer .wrap{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}footer p{margin:0 0 6px;max-width:70ch}
`;
  const head = (title, desc, extra) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:site_name" content="The Threat Desk">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta name="twitter:card" content="summary">
<link rel="icon" type="image/svg+xml" href="${favicon}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
${extra || ""}`;
  const topbar = current => `<header class="top"><div class="wrap">
  <a class="brand" href="index.html">${logo}<span><b><span>the</span>threat<em>desk</em></b><small>Filed from the front lines of cybersecurity</small></span></a>
  <nav class="topnav" aria-label="Site"><a href="index.html"${current === "home" ? ' aria-current="page"' : ""}>Latest news</a><a href="archive.html"${current === "archive" ? ' aria-current="page"' : ""}>Archive</a></nav>
</div></header>`;
  const foot = `<footer><div class="wrap">
  <div><p><b style="color:var(--ink)">The Threat Desk</b>: cybersecurity news in plain language.</p><p><a href="index.html">Latest news</a> · <a href="archive.html">Archive</a></p></div>
  <div><p>Our posts are written independently from public reporting and link to the original sources.</p></div>
</div></footer>`;

  const renderBody = body => {
    const out = []; let list = null;
    for (const raw of body.split("\n")) {
      const line = raw.trim();
      if (!line) continue;
      if (line.startsWith("- ")) { if (!list) list = []; list.push(`<li>${esc(line.slice(2))}</li>`); continue; }
      if (list) { out.push(`<ul>${list.join("")}</ul>`); list = null; }
      if (line.startsWith("## ")) out.push(`<h2>${esc(line.slice(3))}</h2>`);
      else out.push(`<p>${esc(line)}</p>`);
    }
    if (list) out.push(`<ul>${list.join("")}</ul>`);
    return out.join("\n");
  };

  const postCss = `
.post{max-width:720px}
.post h1{font-size:clamp(30px,4.6vw,44px);line-height:1.12;letter-spacing:-.025em;margin:14px 0 14px;text-wrap:balance}
.dek{font-size:19.5px;color:#cdd2dc;margin:0 0 18px;line-height:1.5}
.byline{border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);padding:10px 0;margin-bottom:26px;font-size:13.5px;color:var(--muted);display:flex;gap:14px;flex-wrap:wrap}
.post h2{font-size:23px;letter-spacing:-.015em;margin:32px 0 10px}
.post p{margin:0 0 18px;color:#d9dde5}
.post ul{margin:0 0 18px;padding-left:22px;color:#d9dde5}.post li{margin-bottom:8px}
.box{background:var(--surface);border:1px solid var(--rule);border-radius:12px;padding:18px 20px;margin:28px 0}
.box h3{font:500 12.5px var(--mono);text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin:0 0 8px}
.box p{margin:0;color:var(--ink)}
.box.todo{background:rgba(125,147,255,.08);border-color:rgba(125,147,255,.3)}
.sources{margin:30px 0 0;padding:18px 20px;border:1px dashed var(--rule);border-radius:12px}
.sources h3{font:500 12.5px var(--mono);text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin:0 0 10px}
.sources ul{margin:0;padding-left:20px}.sources li{margin-bottom:6px;font-size:15px}
.related{margin-top:44px}
.related h2{font:500 13px var(--mono);text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin:0 0 12px}
.rgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}
.rcard{display:block;text-decoration:none;color:var(--ink);background:var(--surface);border:1px solid var(--rule);border-radius:10px;padding:16px}
.rcard:hover{border-color:var(--accent)}.rcard b{display:block;font-size:16.5px;line-height:1.3;margin-top:6px;letter-spacing:-.01em}
.share{display:flex;gap:10px;flex-wrap:wrap;margin:26px 0 0}
.share button,.share a{font:600 13.5px var(--body);padding:9px 14px;min-height:40px;border-radius:999px;border:1px solid var(--rule);background:var(--surface);color:var(--ink);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center}
.share button:hover,.share a:hover{border-color:var(--accent)}
`;

  const files = {};
  for (const p of sorted) {
    const related = sorted.filter(x => x.slug !== p.slug && x.cat === p.cat).slice(0, 3)
      .concat(sorted.filter(x => x.slug !== p.slug && x.cat !== p.cat)).slice(0, 4);
    const ld = {
      "@context": "https://schema.org", "@type": "NewsArticle",
      headline: p.title, description: p.dek, datePublished: p.date, dateModified: p.date,
      articleSection: p.cat,
      author: {"@type": "Organization", name: "The Threat Desk"},
      publisher: {"@type": "Organization", name: "The Threat Desk"}
    };
    const title = p.title + " | The Threat Desk";
    files[p.slug + ".html"] = head(title, p.dek,
      `<meta property="og:type" content="article">
<meta property="article:published_time" content="${p.date}">
<meta property="article:section" content="${esc(p.cat)}">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`) + `
<style>${css}${postCss}</style>
</head>
<body>
${topbar("post")}
<main class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="archive.html#${p.cat.toLowerCase().replace(/[^a-z]+/g, "-")}">${esc(p.cat)}</a></nav>
  <article class="post">
    <div class="row" style="margin-top:14px"><span class="tag">${esc(p.cat)}</span><span class="sev ${p.sev}">${sevLabel[p.sev]}</span></div>
    <h1>${esc(p.title)}</h1>
    <p class="dek">${esc(p.dek)}</p>
    <div class="byline"><span>By The Threat Desk</span><time datetime="${p.date}">${longDate(p.date)}</time></div>
    ${renderBody(p.body)}
    ${p.who ? `<div class="box"><h3>Who's affected</h3><p>${esc(p.who)}</p></div>` : ""}
    ${p.todo ? `<div class="box todo"><h3>What to do</h3><p>${esc(p.todo)}</p></div>` : ""}
    ${p.cves && p.cves.length ? `<div class="row" style="margin:0 0 8px"><span>Tracked flaws:</span>${p.cves.map(c => `<span class="cve">${esc(c)}</span>`).join("")}</div>` : ""}
    <div class="sources"><h3>Sources</h3><ul>${p.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)} ↗</a></li>`).join("")}</ul></div>
    <div class="share" aria-label="Share this story">
      <button type="button" id="copy-link">Copy link</button>
      <a id="share-x" href="#" target="_blank" rel="noopener">Share on X</a>
      <a id="share-li" href="#" target="_blank" rel="noopener">Share on LinkedIn</a>
    </div>
  </article>
  <section class="related" aria-label="More stories">
    <h2>More from The Threat Desk</h2>
    <div class="rgrid">${related.map(r => `<a class="rcard" href="${r.slug}.html"><span class="row"><span class="tag">${esc(r.cat)}</span><span>${longDate(r.date)}</span></span><b>${esc(r.title)}</b></a>`).join("")}</div>
    <p style="margin-top:18px"><a href="archive.html">Browse every story in the archive →</a></p>
  </section>
</main>
${foot}
<script>
(function(){
  var u = location.href.split("#")[0], t = document.title;
  var x = document.getElementById("share-x"), li = document.getElementById("share-li"), c = document.getElementById("copy-link");
  x.href = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(u) + "&text=" + encodeURIComponent(t);
  li.href = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(u);
  c.addEventListener("click", function(){
    try { navigator.clipboard.writeText(u).then(function(){ c.textContent = "Link copied"; }, function(){ c.textContent = u; }); }
    catch(e) { c.textContent = u; }
  });
})();
</script>
</body>
</html>
`;
  }

  // Archive page: grouped by month, with a topic jump list
  const cats = ["Vulnerabilities", "Threat actors", "Ransomware", "Breaches", "Policy & takedowns"];
  const byMonth = {};
  for (const p of sorted) { const k = p.date.slice(0, 7); (byMonth[k] = byMonth[k] || []).push(p); }
  const archCss = `
.ahead h1{font-size:clamp(30px,4.4vw,42px);letter-spacing:-.025em;margin:22px 0 8px}
.ahead p{color:#cdd2dc;margin:0 0 18px;max-width:64ch}
.jump{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 10px}
.jump a{font:600 13.5px var(--body);text-decoration:none;color:var(--muted);border:1px solid var(--rule);background:var(--surface);border-radius:999px;padding:7px 13px}
.jump a:hover{color:var(--ink);border-color:var(--accent)}
.month h2{font:500 13px var(--mono);text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin:34px 0 12px;padding-bottom:8px;border-bottom:1px solid var(--rule)}
.alist{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.alist li a{display:grid;grid-template-columns:110px 1fr;gap:14px;text-decoration:none;color:var(--ink);background:var(--surface);border:1px solid var(--rule);border-radius:10px;padding:14px 16px;position:relative}
.alist li a:hover{border-color:var(--accent)}
.alist time{font:500 13px var(--mono);color:var(--muted);padding-top:2px}
.alist b{display:block;font-size:17px;line-height:1.3;letter-spacing:-.01em}
.alist span.d{display:block;color:#b9bfcb;font-size:14.5px;margin-top:4px}
@media (max-width:560px){.alist li a{grid-template-columns:1fr;gap:4px}}
.topics{margin-top:40px}
.topics h2{font:500 13px var(--mono);text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin:30px 0 10px}
.topics ul{margin:0;padding-left:20px}.topics li{margin-bottom:6px}
`;
  files["archive.html"] = head("News archive | The Threat Desk", "Every cybersecurity story The Threat Desk has published, newest first: vulnerabilities, ransomware, breaches, threat actors and policy.",
    `<meta property="og:type" content="website">`) + `
<style>${css}${archCss}</style>
</head>
<body>
${topbar("archive")}
<main class="wrap">
  <div class="ahead">
    <h1>News archive</h1>
    <p>Every story we've published, newest first. ${sorted.length} posts so far. Stories leave the front page after a couple of weeks, but they stay here permanently.</p>
    <nav class="jump" aria-label="Jump to a topic">${cats.map(c => `<a href="#${c.toLowerCase().replace(/[^a-z]+/g, "-")}">${esc(c)}</a>`).join("")}</nav>
  </div>
  ${Object.keys(byMonth).sort().reverse().map(k => {
    const [y, m] = k.split("-").map(Number);
    return `<section class="month" aria-label="${months[m-1]} ${y}"><h2>${months[m-1]} ${y}</h2><ul class="alist">${byMonth[k].map(p => `<li><a href="${p.slug}.html"><time datetime="${p.date}">${longDate(p.date).replace(/, \d{4}$/, "")}</time><span><span class="row"><span class="tag">${esc(p.cat)}</span><span class="sev ${p.sev}">${sevLabel[p.sev]}</span></span><b>${esc(p.title)}</b><span class="d">${esc(p.dek)}</span></span></a></li>`).join("")}</ul></section>`;
  }).join("\n")}
  <section class="topics" aria-label="By topic">
    ${cats.map(c => { const list = sorted.filter(p => p.cat === c); return list.length ? `<h2 id="${c.toLowerCase().replace(/[^a-z]+/g, "-")}">${esc(c)} (${list.length})</h2><ul>${list.map(p => `<li><a href="${p.slug}.html">${esc(p.title)}</a> <span class="row" style="display:inline">· ${longDate(p.date)}</span></li>`).join("")}</ul>` : ""; }).join("\n")}
  </section>
</main>
${foot}
</body>
</html>
`;
  return files;
}
