from pathlib import Path
import zipfile, textwrap, os

root = Path("/mnt/data/pasar-hewan-pati-future-3000")
(root / "assets").mkdir(parents=True, exist_ok=True)

css = r"""
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
:root{--bg:#061713;--bg2:#0a211b;--panel:#102c25;--panel2:#15382f;--gold:#d8b56c;--gold2:#f2d99f;--teal:#42dfb5;--white:#f5f7f1;--muted:#a8bbb0;--line:rgba(255,255,255,.11);--max:1180px;--radius:20px}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--white);font:15px/1.7 "DM Sans",sans-serif}a{color:inherit;text-decoration:none}button,input,select,textarea{font:inherit}img{max-width:100%;display:block}.container{width:min(var(--max),calc(100% - 40px));margin:auto}.topline{height:3px;background:linear-gradient(90deg,transparent,var(--teal),var(--gold),transparent)}.announcement{text-align:center;padding:7px 12px;background:#0b211c;color:var(--gold2);font-size:10px;letter-spacing:2px;text-transform:uppercase}
header{position:sticky;top:0;z-index:20;background:rgba(6,23,19,.92);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}.nav{min-height:78px;display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{display:flex;align-items:center;gap:12px;flex-shrink:0}.brand-mark{width:43px;height:43px;border:1px solid #42dfb588;border-radius:14px;display:grid;place-items:center;color:var(--teal);font:700 19px "Space Grotesk";box-shadow:0 0 24px #42dfb51c}.brand-name{font:700 14px "Space Grotesk";letter-spacing:.5px}.brand-sub{font-size:9px;color:var(--gold);letter-spacing:2px}.nav-links{display:flex;align-items:center;gap:19px}.nav-links a{font-size:12px;color:#c8d5cd;transition:.2s}.nav-links a:hover,.nav-links a.active{color:var(--teal)}.nav-cta,.btn-primary{display:inline-flex;align-items:center;justify-content:center;padding:11px 18px;border:0;border-radius:999px;background:linear-gradient(110deg,var(--gold2),var(--gold));color:#102019;font-weight:800;font-size:12px;transition:.2s}.nav-cta:hover,.btn-primary:hover{transform:translateY(-2px);box-shadow:0 9px 25px #d8b56c33}.menu-toggle{display:none;background:transparent;border:1px solid var(--line);border-radius:10px;color:white;padding:8px 12px;font-size:20px}
.hero{position:relative;min-height:560px;display:flex;align-items:center;overflow:hidden;background:linear-gradient(90deg,rgba(4,20,16,.98),rgba(4,20,16,.82) 48%,rgba(4,20,16,.28)),linear-gradient(0deg,var(--bg),transparent 22%),url('https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=2000&q=85') center/cover}.hero:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 75% 38%,#42dfb51c,transparent 34%);pointer-events:none}.hero-content{position:relative;z-index:1;max-width:720px;padding:85px 0}.eyebrow,.kicker{color:var(--teal);font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase}.eyebrow:before{content:"";display:inline-block;width:27px;height:1px;background:var(--teal);vertical-align:middle;margin-right:10px}h1,h2,h3{font-family:"Space Grotesk",sans-serif;line-height:1.12;margin:0}h1{font-size:clamp(42px,7vw,76px);letter-spacing:-3px;margin-top:20px}h1 span{color:var(--gold)}h2{font-size:clamp(29px,4vw,45px);letter-spacing:-1.4px}h3{font-size:20px}.lead{max-width:610px;color:#d0ddd5;font-size:16px;margin:22px 0 28px}.actions{display:flex;gap:12px;flex-wrap:wrap}.btn-outline{display:inline-flex;align-items:center;justify-content:center;padding:10px 18px;border:1px solid #ffffff55;border-radius:999px;font-size:12px;font-weight:700}.btn-outline:hover{border-color:var(--teal);color:var(--teal)}.hero-note{margin-top:30px;color:#c2d0c7;font-size:10px;letter-spacing:1px}.hero-note strong{color:var(--gold2)}
.stats-wrap{position:relative;margin-top:-38px;z-index:2}.stats{display:grid;grid-template-columns:repeat(3,1fr);background:#102c25f2;border:1px solid var(--line);border-radius:18px;overflow:hidden;backdrop-filter:blur(15px)}.stat{text-align:center;padding:22px}.stat+.stat{border-left:1px solid var(--line)}.stat strong{display:block;color:var(--gold2);font:700 24px "Space Grotesk"}.stat span{font-size:11px;color:var(--muted)}
section{padding:82px 0}.section-alt{background:#091f1a}.section-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:30px}.section-head .kicker{margin-bottom:12px}.section-desc{color:var(--muted);max-width:620px;font-size:13px;margin:12px 0 0}.text-link{color:var(--gold2);font-size:12px;font-weight:700;white-space:nowrap}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}.tile,.feature,.panel,.animal-card,.region{background:linear-gradient(145deg,var(--panel2),var(--panel));border:1px solid var(--line);border-radius:18px}.tile{padding:22px;transition:.25s}.tile:hover,.animal-card:hover{transform:translateY(-5px);border-color:#42dfb577}.tile-icon{font-size:27px;margin-bottom:12px}.tile p,.feature p,.panel p{color:var(--muted);font-size:13px;margin:9px 0 0}.feature{padding:26px}.feature-no{color:var(--gold);font:700 12px "Space Grotesk";letter-spacing:1px}.feature h3{margin:14px 0 8px}.catalog-tools{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:24px}.search-box,.filter-select,.field{background:var(--panel);border:1px solid var(--line);border-radius:11px;color:white;padding:12px 14px;outline:none;min-height:46px}.search-box{flex:1;min-width:220px}.filter-select{min-width:160px}.search-box:focus,.filter-select:focus,.field:focus{border-color:var(--teal)}.animal-card{overflow:hidden;transition:.25s}.animal-image{height:215px;position:relative;background:#17382e}.animal-image img{width:100%;height:100%;object-fit:cover}.demo-tag{position:absolute;top:12px;left:12px;background:#061713e8;color:var(--gold2);border:1px solid #d8b56c66;border-radius:30px;padding:4px 9px;font-size:9px;letter-spacing:1px;text-transform:uppercase}.animal-body{padding:18px}.animal-type{color:var(--teal);font-size:10px;letter-spacing:1.4px;text-transform:uppercase}.animal-body h3{margin:7px 0}.animal-meta{font-size:11px;color:var(--muted);display:flex;gap:12px;flex-wrap:wrap}.animal-price{font:700 20px "Space Grotesk";color:var(--gold2);margin:13px 0}.animal-bottom{display:flex;justify-content:space-between;align-items:center;gap:10px}.detail-btn{border:1px solid #42dfb577;background:transparent;color:var(--teal);border-radius:30px;padding:7px 12px;font-size:10px;font-weight:700}.empty-state{grid-column:1/-1;text-align:center;padding:30px;color:var(--muted)}.notice{font-size:10px;color:#91a79a;margin-top:16px}
.page-hero{padding:78px 0 65px;background:radial-gradient(ellipse at 80% 20%,#42dfb51a,transparent 35%),linear-gradient(135deg,#0c2a22,#061713);border-bottom:1px solid var(--line)}.page-hero h1{font-size:clamp(38px,6vw,62px);margin:13px 0}.page-hero p{max-width:700px;color:var(--muted);margin:0}.breadcrumb{font-size:11px;color:var(--gold2);margin-bottom:18px}.panel{padding:26px}.panel h3{margin-bottom:10px}.list-clean{padding-left:19px;color:var(--muted);font-size:13px}.list-clean li{margin:8px 0}.region-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.region{padding:17px;font-size:13px}.region small{display:block;color:var(--teal);font-size:9px;letter-spacing:1px;margin-top:5px}.partner{padding:42px;border-radius:23px;border:1px solid #42dfb544;background:radial-gradient(circle at 85% 20%,#42dfb522,transparent 35%),linear-gradient(120deg,#14382e,#0b211c);display:flex;align-items:center;justify-content:space-between;gap:25px}.partner p{color:var(--muted);max-width:650px;font-size:13px}.form-grid{display:grid;gap:12px}.field{width:100%}textarea.field{min-height:120px;resize:vertical}.footer{padding:48px 0 22px;background:#04130f;border-top:1px solid var(--line)}.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:30px}.footer-grid p,.footer-grid a{font-size:12px;color:var(--muted)}.footer-grid p{max-width:430px;margin-top:14px}.footer-grid h4{color:var(--gold2);font-size:12px;margin:0 0 13px}.footer-grid a{display:block;margin:8px 0}.footer-grid a:hover{color:var(--teal)}.copyright{border-top:1px solid var(--line);margin-top:30px;padding-top:18px;color:#82978c;font-size:10px;display:flex;justify-content:space-between;gap:12px}.whatsapp{position:fixed;right:20px;bottom:20px;z-index:30;width:53px;height:53px;border-radius:50%;display:grid;place-items:center;background:#25d366;color:#062015;font-size:24px;font-weight:800;box-shadow:0 8px 25px #0006}.tag{display:inline-block;color:var(--teal);border:1px solid #42dfb555;border-radius:30px;padding:4px 10px;font-size:10px;margin:4px}
@media(max-width:960px){.nav-links{display:none;position:absolute;top:78px;left:0;right:0;background:#081d18;padding:20px 24px;border-bottom:1px solid var(--line);flex-direction:column;align-items:stretch}.nav-links.open{display:flex}.menu-toggle{display:block}.nav-cta{display:none}.grid-4,.region-grid{grid-template-columns:repeat(2,1fr)}.grid-3{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.container{width:calc(100% - 28px)}.hero{min-height:570px;background-position:62% center}.hero-content{padding:70px 0}.stats-wrap{margin-top:-25px}.stat{padding:15px 6px}.stat strong{font-size:19px}.stat span{font-size:9px}section{padding:62px 0}.section-head{align-items:start;flex-direction:column}.grid-2,.grid-3,.grid-4,.region-grid{grid-template-columns:1fr}.animal-image{height:225px}.partner{padding:28px 22px;align-items:start;flex-direction:column}.footer-grid{grid-template-columns:1fr 1fr}.footer-grid>div:first-child{grid-column:1/-1}.copyright{flex-direction:column}.catalog-tools{flex-direction:column}.filter-select{width:100%}h1{letter-spacing:-2px}}
"""
(root/"assets"/"style.css").write_text(css, encoding="utf-8")

js = r"""
// KONFIGURASI: isi nomor WhatsApp resmi format internasional tanpa +, spasi, atau strip.
// Contoh format Indonesia: 628xxxxxxxxxx. Biarkan kosong sampai nomor dikonfirmasi.
const WHATSAPP_NUMBER = "";
const waLink = (message) => {
  if (!/^[0-9]{8,15}$/.test(WHATSAPP_NUMBER)) {
    alert("Nomor WhatsApp resmi belum dipasang. Silakan hubungi pengelola PASAR HEWAN PATI.");
    return;
  }
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
};
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }
  document.querySelectorAll("[data-wa]").forEach(el => el.addEventListener("click", () => waLink(el.dataset.wa || "Halo PASAR HEWAN PATI, saya ingin mendapatkan informasi.")));
  const year = document.querySelectorAll(".year");
  year.forEach(el => el.textContent = new Date().getFullYear());

  const search = document.querySelector("#searchInput");
  const category = document.querySelector("#categoryFilter");
  const location = document.querySelector("#locationFilter");
  const cards = [...document.querySelectorAll(".animal-card")];
  function filterCards() {
    if (!search) return;
    const q = search.value.toLowerCase().trim();
    let count = 0;
    cards.forEach(card => {
      const ok = (card.dataset.search || "").toLowerCase().includes(q)
        && (!category || !category.value || card.dataset.category === category.value)
        && (!location || !location.value || card.dataset.location === location.value);
      card.hidden = !ok;
      if (ok) count++;
    });
    const grid = document.querySelector("#animalGrid");
    let empty = document.querySelector(".empty-state");
    if (!count && grid) {
      if (!empty) { empty = document.createElement("div"); empty.className = "empty-state"; grid.appendChild(empty); }
      empty.textContent = "Belum ada listing yang cocok. Coba kata kunci atau filter lain.";
    } else if (empty) empty.remove();
  }
  [search, category, location].filter(Boolean).forEach(el => el.addEventListener(el === search ? "input" : "change", filterCards));
  document.querySelectorAll("[data-category-link]").forEach(link => link.addEventListener("click", () => {
    if (category) { category.value = link.dataset.categoryLink; filterCards(); }
  }));
  const form = document.querySelector("#contactForm");
  if (form) form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const message = `Halo PASAR HEWAN PATI.\nNama: ${data.get("name")}\nNomor: ${data.get("phone")}\nKeperluan: ${data.get("purpose")}\nPesan: ${data.get("message")}`;
    waLink(message);
  });
});
"""
(root/"assets"/"script.js").write_text(js, encoding="utf-8")

nav_items = [
    ("index.html","Beranda"),("kategori.html","Kategori"),("katalog.html","Katalog"),
    ("layanan.html","Layanan"),("wilayah.html","Wilayah"),("kemitraan.html","Kemitraan"),
    ("panduan.html","Panduan"),("tentang.html","Tentang"),("kontak.html","Kontak")
]
def header(active):
    links = "".join(f'<a href="{f}" class="{"active" if f==active else ""}">{n}</a>' for f,n in nav_items)
    return f'''<div class="topline"></div><div class="announcement">DIGITAL LIVESTOCK MARKETPLACE · PATI, CENTRAL JAVA</div>
<header><div class="container nav"><a class="brand" href="index.html"><div class="brand-mark">PH</div><div><div class="brand-name">PASAR HEWAN PATI</div><div class="brand-sub">FUTURE 3000 PLATFORM</div></div></a>
<nav class="nav-links">{links}</nav><a class="nav-cta" href="kemitraan.html">Jadi Mitra ↗</a><button class="menu-toggle" aria-label="Buka menu">☰</button></div></header>'''
def footer():
    return '''<footer class="footer"><div class="container"><div class="footer-grid">
<div><a class="brand" href="index.html"><div class="brand-mark">PH</div><div><div class="brand-name">PASAR HEWAN PATI</div><div class="brand-sub">FUTURE 3000 PLATFORM</div></div></a><p>Platform pemasaran hewan ternak yang berawal dari Kabupaten Pati untuk membangun koneksi pasar yang lebih luas melalui teknologi digital.</p></div>
<div><h4>Jelajahi</h4><a href="kategori.html">Kategori ternak</a><a href="katalog.html">Katalog</a><a href="wilayah.html">Wilayah</a><a href="layanan.html">Layanan</a></div>
<div><h4>Informasi</h4><a href="kemitraan.html">Kemitraan</a><a href="panduan.html">Panduan transaksi</a><a href="tentang.html">Tentang kami</a><a href="kontak.html">Kontak</a></div>
</div><div class="copyright"><span>© <span class="year"></span> PASAR HEWAN PATI. All rights reserved.</span><span>THE FUTURE OF ANIMAL COMMERCE</span></div></div></footer>
<a class="whatsapp" href="javascript:void(0)" data-wa="Halo PASAR HEWAN PATI, saya ingin mendapatkan informasi." aria-label="WhatsApp">✆</a>'''
def page(title, desc, active, body, page_title=None):
    return f'''<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="theme-color" content="#061713"><meta name="description" content="{desc}"><title>{page_title or title+" | PASAR HEWAN PATI"}</title><link rel="stylesheet" href="assets/style.css"></head><body>{header(active)}<main>{body}</main>{footer()}<script src="assets/script.js"></script></body></html>'''

home = '''<section class="hero"><div class="container"><div class="hero-content"><div class="eyebrow">A New Era of Animal Commerce</div><h1>Connecting<br>Farmers.<br><span>Building Future.</span></h1><p class="lead">Platform pemasaran hewan ternak yang menghubungkan peternak, penjual, dan pembeli melalui pengalaman digital yang modern, informatif, dan terpercaya. Berawal dari Pati untuk Jawa Tengah.</p><div class="actions"><a class="btn-primary" href="katalog.html">Jelajahi Katalog ↗</a><a class="btn-outline" href="kemitraan.html">Gabung Menjadi Mitra</a></div><div class="hero-note"><strong>LOCAL ROOTS.</strong> WIDER CONNECTIONS. FUTURE READY.</div></div></div></section>
<div class="container stats-wrap"><div class="stats"><div class="stat"><strong>PATI</strong><span>Wilayah awal pengembangan</span></div><div class="stat"><strong>JATENG</strong><span>Target jangkauan bertahap</span></div><div class="stat"><strong>24/7</strong><span>Akses informasi online</span></div></div></div>
<section><div class="container"><div class="section-head"><div><div class="kicker">Explore Ecosystem</div><h2>Ekosistem Pasar Ternak Digital</h2><p class="section-desc">Satu pintu informasi untuk menemukan kategori ternak, melihat listing, dan menjalin komunikasi antara penjual dan calon pembeli.</p></div><a class="text-link" href="kategori.html">Semua kategori ↗</a></div><div class="grid-4">
<a class="tile" href="katalog.html"><div class="tile-icon">🐂</div><h3>Sapi</h3><p>Informasi pemasaran sapi potong dan bibit.</p></a><a class="tile" href="katalog.html"><div class="tile-icon">🐐</div><h3>Kambing</h3><p>Ragam jenis kambing untuk kebutuhan pasar.</p></a><a class="tile" href="katalog.html"><div class="tile-icon">🐑</div><h3>Domba</h3><p>Informasi dan listing domba ternak.</p></a><a class="tile" href="katalog.html"><div class="tile-icon">🐃</div><h3>Kerbau</h3><p>Kategori pemasaran kerbau.</p></a></div></div></section>
<section class="section-alt"><div class="container"><div class="section-head"><div><div class="kicker">Why This Platform</div><h2>Informasi Lebih Terstruktur</h2><p class="section-desc">Pengalaman digital yang dirancang untuk membantu pengguna mendapatkan informasi sebelum menghubungi penjual.</p></div></div><div class="grid-3"><article class="feature"><div class="feature-no">01 / DISCOVERY</div><h3>Pencarian Katalog</h3><p>Temukan listing berdasarkan kategori, kata kunci, dan wilayah yang tersedia.</p></article><article class="feature"><div class="feature-no">02 / CONNECTION</div><h3>Koneksi Langsung</h3><p>Alur komunikasi dapat diarahkan ke kanal resmi setelah kontak pengelola dikonfirmasi.</p></article><article class="feature"><div class="feature-no">03 / TRANSPARENCY</div><h3>Informasi Terbuka</h3><p>Detail kondisi, lokasi, harga, dan ketersediaan perlu ditampilkan secara jelas dan diverifikasi.</p></article></div></div></section>
<section><div class="container"><div class="partner"><div><div class="kicker">Grow With Us</div><h2>Bangun Masa Depan Peternakan Bersama.</h2><p>Peternak, pedagang, dan pelaku usaha dapat menjajaki peluang kemitraan pemasaran melalui PASAR HEWAN PATI.</p></div><a class="btn-primary" href="kemitraan.html">Pelajari Kemitraan ↗</a></div></div></section>'''
(root/"index.html").write_text(page("Beranda","PASAR HEWAN PATI, platform pemasaran hewan ternak digital dari Pati untuk Jawa Tengah.","index.html",home,"PASAR HEWAN PATI | The Future of Animal Commerce"),encoding="utf-8")

category_body='''<section class="page-hero"><div class="container"><div class="breadcrumb">BERANDA / KATEGORI</div><div class="kicker">Livestock Categories</div><h1>Kategori <span style="color:var(--gold)">Ternak</span></h1><p>Jelajahi kelompok hewan ternak yang dapat ditampilkan dalam katalog PASAR HEWAN PATI. Ketersediaan aktual mengikuti data penjual yang telah diverifikasi.</p></div></section><section><div class="container"><div class="grid-2">
<div class="panel"><div class="tile-icon">🐂</div><h3>Sapi</h3><p>Listing sapi potong, sapi bibit, dan kategori lain sesuai data yang disediakan penjual.</p><a class="text-link" href="katalog.html">Lihat katalog sapi ↗</a></div>
<div class="panel"><div class="tile-icon">🐐</div><h3>Kambing</h3><p>Informasi kambing ternak dengan detail umur, jenis, kondisi, dan lokasi bila tersedia.</p><a class="text-link" href="katalog.html">Lihat katalog kambing ↗</a></div>
<div class="panel"><div class="tile-icon">🐑</div><h3>Domba</h3><p>Ruang informasi dan pemasaran domba untuk kebutuhan peternak dan calon pembeli.</p><a class="text-link" href="katalog.html">Lihat katalog domba ↗</a></div>
<div class="panel"><div class="tile-icon">🐃</div><h3>Kerbau</h3><p>Kategori kerbau untuk memperluas pilihan dan jangkauan informasi pasar ternak.</p><a class="text-link" href="katalog.html">Lihat katalog kerbau ↗</a></div></div><p class="notice">Kategori di atas adalah struktur platform, bukan pernyataan bahwa stok hewan tersedia saat ini.</p></div></section>'''
(root/"kategori.html").write_text(page("Kategori","Kategori sapi, kambing, domba, dan kerbau di PASAR HEWAN PATI.","kategori.html",category_body),encoding="utf-8")

animals = [
("Sapi","Sapi Potong","Pati","sapi limosin sapi potong pati","https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=900&q=80"),
("Kambing","Kambing Ternak","Kudus","kambing ternak kudus","https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=900&q=80"),
("Domba","Domba Ternak","Jepara","domba ternak jepara","https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=900&q=80"),
("Kerbau","Kerbau Ternak","Pati","kerbau ternak pati","https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=900&q=80"),
("Sapi","Sapi Bibit","Rembang","sapi bibit rembang","https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=900&q=80"),
("Kambing","Kambing Pedaging","Pati","kambing pedaging pati","https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=900&q=80")
]
cards=""
for cat,name,loc,search,img in animals:
    cards += f'''<article class="animal-card" data-category="{cat}" data-location="{loc}" data-search="{search}"><div class="animal-image"><img src="{img}" alt="Foto contoh {cat.lower()}" loading="lazy"><span class="demo-tag">Contoh / Demo</span></div><div class="animal-body"><div class="animal-type">{cat} · Contoh listing</div><h3>{name}</h3><div class="animal-meta"><span>◷ Detail belum tersedia</span><span>◇ Perlu verifikasi</span></div><div class="animal-price">Harga belum ditentukan</div><div class="animal-bottom"><span class="animal-meta">⌖ {loc}, Jawa Tengah</span><button class="detail-btn" data-wa="Halo, saya ingin bertanya tentang contoh listing {name} di PASAR HEWAN PATI.">Tanya informasi</button></div></div></article>'''
catalog_body=f'''<section class="page-hero"><div class="container"><div class="breadcrumb">BERANDA / KATALOG</div><div class="kicker">Livestock Marketplace</div><h1>Katalog <span style="color:var(--gold)">Ternak</span></h1><p>Telusuri contoh struktur listing dengan pencarian dan filter. Data pada halaman ini masih demo dan harus diganti dengan data penjual yang nyata sebelum dipublikasikan sebagai penawaran.</p></div></section><section class="section-alt"><div class="container"><div class="catalog-tools"><input class="search-box" id="searchInput" type="search" placeholder="Cari jenis hewan atau nama..."><select class="filter-select" id="categoryFilter"><option value="">Semua kategori</option><option>Sapi</option><option>Kambing</option><option>Domba</option><option>Kerbau</option></select><select class="filter-select" id="locationFilter"><option value="">Semua wilayah</option><option>Pati</option><option>Kudus</option><option>Jepara</option><option>Rembang</option></select></div><div class="grid-3" id="animalGrid">{cards}</div><p class="notice">Seluruh kartu, foto, lokasi, dan informasi adalah contoh desain. Jangan menganggapnya sebagai stok nyata atau penawaran jual beli.</p></div></section>'''
(root/"katalog.html").write_text(page("Katalog","Katalog digital contoh untuk pemasaran sapi, kambing, domba, dan kerbau.","katalog.html",catalog_body),encoding="utf-8")

def simple_page(title, kicker, intro, sections, active):
    body=f'<section class="page-hero"><div class="container"><div class="breadcrumb">BERANDA / {title.upper()}</div><div class="kicker">{kicker}</div><h1>{title}</h1><p>{intro}</p></div></section><section><div class="container"><div class="grid-2">{sections}</div></div></section>'
    return page(title,intro,active,body)

layanan = '''<article class="feature"><div class="feature-no">01 / MARKETPLACE</div><h3>Pemasaran Digital</h3><p>Menampilkan informasi ternak dalam format katalog yang mudah dijelajahi oleh calon pembeli.</p></article><article class="feature"><div class="feature-no">02 / NETWORK</div><h3>Jaringan Peternak</h3><p>Membuka ruang koneksi informasi antara peternak, pedagang, dan calon pembeli.</p></article><article class="feature"><div class="feature-no">03 / INFORMATION</div><h3>Informasi Listing</h3><p>Struktur data untuk jenis, umur, kondisi, lokasi, harga, foto, dan status ketersediaan.</p></article><article class="feature"><div class="feature-no">04 / PARTNERSHIP</div><h3>Pengembangan Mitra</h3><p>Ruang kolaborasi dengan pelaku usaha dan komunitas peternakan di wilayah pengembangan.</p></article>'''
(root/"layanan.html").write_text(simple_page("Layanan Platform","Our Digital Ecosystem","Layanan dirancang untuk membantu penyajian informasi pemasaran hewan ternak secara terstruktur dan mempertemukan pihak yang berkepentingan.",layanan,"layanan.html"),encoding="utf-8")

wilayah_body='''<section class="page-hero"><div class="container"><div class="breadcrumb">BERANDA / WILAYAH</div><div class="kicker">Regional Network</div><h1>Berawal dari <span style="color:var(--gold)">Pati</span></h1><p>Pengembangan wilayah direncanakan bertahap. Daftar berikut menunjukkan cakupan rencana, bukan bukti operasional atau ketersediaan mitra di setiap daerah.</p></div></section><section><div class="container"><div class="region-grid"><div class="region">Kabupaten Pati<small>WILAYAH AWAL</small></div><div class="region">Kudus<small>RENCANA EKSPANSI</small></div><div class="region">Jepara<small>RENCANA EKSPANSI</small></div><div class="region">Rembang<small>RENCANA EKSPANSI</small></div><div class="region">Blora<small>RENCANA EKSPANSI</small></div><div class="region">Grobogan<small>RENCANA EKSPANSI</small></div><div class="region">Demak<small>RENCANA EKSPANSI</small></div><div class="region">Semarang<small>RENCANA EKSPANSI</small></div></div></div></section>'''
(root/"wilayah.html").write_text(page("Wilayah","Wilayah awal Kabupaten Pati dan rencana ekspansi PASAR HEWAN PATI.","wilayah.html",wilayah_body),encoding="utf-8")

kemitraan_body='''<section class="page-hero"><div class="container"><div class="breadcrumb">BERANDA / KEMITRAAN</div><div class="kicker">Grow With Us</div><h1>Kemitraan <span style="color:var(--gold)">Berkelanjutan</span></h1><p>Membangun koneksi pemasaran yang lebih luas bersama peternak, pedagang, pelaku usaha, dan komunitas terkait.</p></div></section><section><div class="container"><div class="grid-2"><div class="panel"><h3>Untuk Peternak & Penjual</h3><ul class="list-clean"><li>Menyiapkan identitas dan kontak yang dapat diverifikasi.</li><li>Menyediakan foto asli dan informasi kondisi hewan.</li><li>Mencantumkan lokasi, harga, dan status ketersediaan terkini.</li><li>Memberikan informasi secara jujur dan memperbarui perubahan listing.</li></ul></div><div class="panel"><h3>Untuk Pembeli & Mitra Usaha</h3><ul class="list-clean"><li>Gunakan katalog sebagai sumber informasi awal.</li><li>Konfirmasi langsung kondisi, harga, dan ketersediaan.</li><li>Lakukan pemeriksaan fisik sebelum transaksi.</li><li>Sepakati metode pembayaran dan pengiriman secara jelas.</li></ul></div></div><div class="partner" style="margin-top:24px"><div><div class="kicker">Start a Conversation</div><h2>Jajaki peluang kolaborasi.</h2><p>Hubungi pengelola untuk mendiskusikan pendaftaran mitra, publikasi listing, atau bentuk kerja sama lain.</p></div><a class="btn-primary" href="kontak.html">Hubungi Pengelola ↗</a></div></div></section>'''
(root/"kemitraan.html").write_text(page("Kemitraan","Informasi kemitraan peternak, pedagang, dan pelaku usaha PASAR HEWAN PATI.","kemitraan.html",kemitraan_body),encoding="utf-8")

panduan_body='''<section class="page-hero"><div class="container"><div class="breadcrumb">BERANDA / PANDUAN</div><div class="kicker">Safer Livestock Trading</div><h1>Panduan <span style="color:var(--gold)">Informasi & Transaksi</span></h1><p>Gunakan tahapan berikut sebagai panduan awal. Website ini merupakan media informasi dan penghubung; verifikasi dan kesepakatan transaksi tetap dilakukan langsung oleh pihak terkait.</p></div></section><section><div class="container"><div class="grid-2"><div class="panel"><span class="tag">01 · Temukan</span><h3>Jelajahi listing</h3><p>Pilih kategori, gunakan pencarian, lalu catat nama penjual dan lokasi yang tercantum pada listing.</p></div><div class="panel"><span class="tag">02 · Konfirmasi</span><h3>Hubungi penjual</h3><p>Tanyakan status ketersediaan, harga terbaru, umur, kondisi kesehatan, riwayat, dan dokumen pendukung jika relevan.</p></div><div class="panel"><span class="tag">03 · Periksa</span><h3>Lakukan pemeriksaan langsung</h3><p>Jangan hanya mengandalkan foto. Atur pemeriksaan fisik hewan dan cocokkan informasi dengan kondisi aktual.</p></div><div class="panel"><span class="tag">04 · Sepakati</span><h3>Buat kesepakatan jelas</h3><p>Pastikan identitas pihak, harga, pembayaran, pengangkutan, biaya, dan tanggung jawab disepakati tertulis.</p></div></div><div class="panel" style="margin-top:22px"><h3>Prinsip keamanan</h3><ul class="list-clean"><li>Jangan mengirim uang sebelum memverifikasi penjual dan objek transaksi.</li><li>Waspadai harga yang tidak wajar, tekanan untuk segera membayar, atau permintaan data rahasia.</li><li>Pastikan ketentuan kesehatan hewan, dokumen, dan pengangkutan dipenuhi sesuai aturan yang berlaku.</li><li>PASAR HEWAN PATI tidak boleh dianggap sebagai penjamin transaksi kecuali ada layanan resmi yang secara jelas diumumkan.</li></ul></div></div></section>'''
(root/"panduan.html").write_text(page("Panduan","Panduan aman mencari informasi dan melakukan transaksi hewan ternak.","panduan.html",panduan_body),encoding="utf-8")

tentang_body='''<section class="page-hero"><div class="container"><div class="breadcrumb">BERANDA / TENTANG</div><div class="kicker">Our Vision</div><h1>Menghubungkan Potensi Lokal dengan <span style="color:var(--gold)">Pasar Lebih Luas</span></h1><p>PASAR HEWAN PATI dikembangkan sebagai platform informasi dan pemasaran digital yang berangkat dari Kabupaten Pati, Jawa Tengah.</p></div></section><section><div class="container"><div class="grid-2"><div class="panel"><h3>Visi</h3><p>Mendorong ekosistem informasi pemasaran hewan ternak yang semakin mudah diakses, terstruktur, dan siap berkembang mengikuti kebutuhan pengguna.</p></div><div class="panel"><h3>Misi</h3><p>Menghubungkan pelaku pasar, menyajikan informasi listing secara lebih jelas, memperluas jangkauan digital, dan mendorong praktik komunikasi yang transparan.</p></div><div class="panel"><h3>Identitas Digital</h3><p>Future 3000 adalah arah visual dan visi pengembangan jangka panjang: modern, adaptif, responsif, dan berorientasi pada teknologi.</p></div><div class="panel"><h3>Komitmen Informasi</h3><p>Keakuratan data bergantung pada informasi yang diberikan dan diverifikasi. Listing contoh pada versi awal bukan penawaran aktual.</p></div></div></div></section>'''
(root/"tentang.html").write_text(page("Tentang Kami","Tentang visi, misi, dan pengembangan PASAR HEWAN PATI.","tentang.html",tentang_body),encoding="utf-8")

kontak_body='''<section class="page-hero"><div class="container"><div class="breadcrumb">BERANDA / KONTAK</div><div class="kicker">Let's Connect</div><h1>Hubungi <span style="color:var(--gold)">Tim Kami</span></h1><p>Untuk pertanyaan katalog, pemasaran, pendaftaran mitra, atau penjajakan kerja sama.</p></div></section><section><div class="container"><div class="grid-2"><div class="panel"><div class="kicker">Our Commitment</div><h3>Connecting Local Potential to Wider Markets.</h3><p>Lokasi pengembangan: Kabupaten Pati, Jawa Tengah, Indonesia.</p><p>Nomor WhatsApp resmi belum dicantumkan. Tambahkan nomor pengelola pada konfigurasi website setelah dikonfirmasi.</p><p><span class="tag">Informasi</span><span class="tag">Kemitraan</span><span class="tag">Katalog</span></p></div><form class="panel form-grid" id="contactForm"><input class="field" name="name" placeholder="Nama Anda" required><input class="field" name="phone" type="tel" placeholder="Nomor WhatsApp Anda" required><select class="field" name="purpose"><option>Informasi pemasaran</option><option>Pendaftaran mitra</option><option>Informasi katalog</option><option>Kerja sama</option></select><textarea class="field" name="message" placeholder="Tuliskan pesan Anda..." required></textarea><button class="btn-primary" type="submit">Kirim melalui WhatsApp ↗</button><p class="notice">Formulir ini menyiapkan pesan WhatsApp. Form tidak menyimpan data ke server. Fitur kirim baru aktif setelah nomor WhatsApp resmi diisi di assets/script.js.</p></form></div></div></section>'''
(root/"kontak.html").write_text(page("Kontak","Kontak PASAR HEWAN PATI untuk pemasaran, kemitraan, dan informasi katalog.","kontak.html",kontak_body),encoding="utf-8")

readme = """# PASAR HEWAN PATI — FUTURE 3000

Website statis multi-halaman untuk GitHub Pages.

## Isi website
- `index.html` — Beranda
- `kategori.html` — Kategori ternak
- `katalog.html` — Katalog dengan pencarian dan filter
- `layanan.html` — Layanan platform
- `wilayah.html` — Wilayah awal dan rencana ekspansi
- `kemitraan.html` — Informasi kemitraan
- `panduan.html` — Panduan informasi dan transaksi
- `tentang.html` — Visi, misi, dan identitas
- `kontak.html` — Formulir yang menyiapkan pesan WhatsApp
- `assets/style.css` — Desain global
- `assets/script.js` — Navigasi, filter, dan WhatsApp

## Cara memasang ke GitHub
1. Unduh dan ekstrak ZIP ini di komputer.
2. Buka repository GitHub tujuan.
3. Pilih **Add file → Upload files**.
4. Unggah seluruh isi folder hasil ekstrak (file HTML dan folder `assets`), bukan ZIP-nya saja.
5. Pastikan `index.html` berada langsung di root repository.
6. Commit perubahan.
7. Buka **Settings → Pages** dan pastikan sumber publikasi sesuai konfigurasi repository Anda.
8. Tunggu proses deployment, lalu buka alamat GitHub Pages.

## Konfigurasi WhatsApp
Buka `assets/script.js`, cari:
`const WHATSAPP_NUMBER = "";`
Isi nomor resmi format internasional tanpa tanda plus, spasi, atau strip. Contoh format Indonesia: `628xxxxxxxxxx`. Jangan mengisi nomor contoh; gunakan nomor resmi milik pengelola.

## Sebelum dipublikasikan secara komersial
- Ganti foto contoh dengan foto ternak asli yang Anda miliki izin untuk gunakan.
- Ganti seluruh listing demo dengan data penjual yang telah diverifikasi.
- Tambahkan harga, umur, kondisi, lokasi rinci seperlunya, kontak, dan status ketersediaan yang benar.
- Konfirmasi alamat, nomor resmi, kebijakan privasi, dan mekanisme penanganan keluhan.
- Form kontak versi ini tidak menyimpan data ke server; pengiriman WhatsApp memerlukan nomor resmi.
- Website statis ini belum memiliki login, database, dashboard penjual, pembayaran, atau sistem verifikasi otomatis.

## Catatan
Desain memakai Google Fonts dan foto eksternal Unsplash sehingga tampilan gambar/font memerlukan koneksi internet. Semua listing bawaan adalah DEMO, bukan penawaran hewan nyata.
"""
(root/"README.md").write_text(readme,encoding="utf-8")

zip_path=Path("/mnt/data/PASAR_HEWAN_PATI_FUTURE_3000_MULTIHALAMAN.zip")
with zipfile.ZipFile(zip_path,"w",zipfile.ZIP_DEFLATED) as z:
    for p in root.rglob("*"):
        if p.is_file():
            z.write(p, p.relative_to(root.parent))
print(zip_path, zip_path.stat().st_size, len(list(root.rglob('*'))))
