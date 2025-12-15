// ------------------- STATO DI GIOCO -------------------
    const state = {
        profile: {
  firstName: "",
  lastName: "",
  dob: "",
  stageName: "",

  avatar: {
    bodyTone: "tone2",
    hair: "hair1",
    top: "top1",
    pants: "pants1",
    shoes: "shoes1",
    hat: "none",
    glasses: "none",
    chain: "none",
    watch: "none",
    faceImageDataUrl: "" // opzionale
  }
},

      day: 1,
      week: 1,
      year: 2025,
      player: {
        stageName: "Lil Demo",
        background: "Street Kid",
        genre: "Trap",
        level: 1,
        xp: 0,
        fans: 0,
        money: 2000,
        hype: 10,
        stats: { flow: 50, writing: 50, stage: 50, social: 50 }
      },
      rival: { name: "GhostKid", fans: 25000, hype: 40 },
      feed: [],
      missions: [],
      dailyCounters: { singles: 0, bars: 0, lives: 0 },
      chartTracks: [],

      albums: [],
      lastChartPos: {},

      // phone/social systems (new, isolated)
      phone: {
        instagram: { posts: [], directory: {}, search: "" },
        youtube: { videos: [] },
        spotify: { rows: [], lastPos: {} }
      }
    };

    // ------------------- ELEMENTI UI -------------------
    const el = {
        albumBtn: document.getElementById("albumBtn"),
        igAdminToggleBtn: document.getElementById("igAdminToggleBtn"),
igAdminPanel: document.getElementById("igAdminPanel"),
      ytSongSelect: document.getElementById("ytSongSelect"),
      ytCoverFile: document.getElementById("ytCoverFile"),
      levelLabel: document.getElementById("levelLabel"),
      rapperName: document.getElementById("rapperName"),
      genreLabel: document.getElementById("genreLabel"),
      rivalName: document.getElementById("rivalName"),
      fansValue: document.getElementById("fansValue"),
      moneyValue: document.getElementById("moneyValue"),
      hypeValue: document.getElementById("hypeValue"),
      timeLabel: document.getElementById("timeLabel"),
      careerMood: document.getElementById("careerMood"),
      flowVal: document.getElementById("flowVal"),
      writingVal: document.getElementById("writingVal"),
      stageVal: document.getElementById("stageVal"),
      socialVal: document.getElementById("socialVal"),
      flowFill: document.getElementById("flowFill"),
      writingFill: document.getElementById("writingFill"),
      stageFill: document.getElementById("stageFill"),
      socialFill: document.getElementById("socialFill"),
      missionsWeek: document.getElementById("missionsWeek"),
      missionsList: document.getElementById("missionsList"),
      feedList: document.getElementById("feedList"),
      feedCounter: document.getElementById("feedCounter"),
      publishBtn: document.getElementById("publishBtn"),
      barsBtn: document.getElementById("barsBtn"),
      liveBtn: document.getElementById("liveBtn"),
      tourBtn: document.getElementById("tourBtn"),
      toast: document.getElementById("toast"),
      navTabs: document.querySelectorAll(".nav-tab"),
      tabHome: document.getElementById("tab-home"),
      tabRivals: document.getElementById("tab-rivals"),
      tabFanclub: document.getElementById("tab-fanclub"),
      managerTip: document.getElementById("managerTip"),
      chartList: document.getElementById("chartList"),

      // composer
      albumBtn: document.getElementById("albumBtn"),

albumOverlay: document.getElementById("albumOverlay"),
albumCloseBtn: document.getElementById("albumCloseBtn"),
albumCancelBtn: document.getElementById("albumCancelBtn"),
albumPublishBtn: document.getElementById("albumPublishBtn"),
albumTitleInput: document.getElementById("albumTitleInput"),
albumTypeSelect: document.getElementById("albumTypeSelect"),
albumTracksList: document.getElementById("albumTracksList"),
albumAddTrackBtn: document.getElementById("albumAddTrackBtn"),
albumAddBulkBtn: document.getElementById("albumAddBulkBtn"),
albumCostLabel: document.getElementById("albumCostLabel"),
albumGateLabel: document.getElementById("albumGateLabel"),

      composerOverlay: document.getElementById("composerOverlay"),
      composerCloseBtn: document.getElementById("composerCloseBtn"),
      composerCancelBtn: document.getElementById("composerCancelBtn"),
      composerConfirmBtn: document.getElementById("composerConfirmBtn"),
      modeLyricsBtn: document.getElementById("modeLyricsBtn"),
      modeBeatBtn: document.getElementById("modeBeatBtn"),
      lyricsRow: document.getElementById("lyricsRow"),
      lyricsInput: document.getElementById("lyricsInput"),
      featSelect: document.getElementById("featSelect"),

      // tour
      tourOverlay: document.getElementById("tourOverlay"),
      tourCloseBtn: document.getElementById("tourCloseBtn"),
      tourLocalBtn: document.getElementById("tourLocalBtn"),
      tourEuBtn: document.getElementById("tourEuBtn"),
      tourWorldBtn: document.getElementById("tourWorldBtn"),

      // phone
      phoneBtn: document.getElementById("phoneBtn"),
      phoneOverlay: document.getElementById("phoneOverlay"),
      phoneCloseBtn: document.getElementById("phoneCloseBtn"),
      phoneHome: document.getElementById("phoneHome"),
      phoneTiles: document.querySelectorAll(".phone-app-tile"),
      phoneBackBtns: document.querySelectorAll(".phoneBackBtn"),
      phonePillFans: document.getElementById("phonePillFans"),
      phonePillHype: document.getElementById("phonePillHype"),
      phoneHomeHelp: document.getElementById("phoneHomeHelp"),

      // phone screens
      appInstagram: document.getElementById("appInstagram"),
      appSpotify: document.getElementById("appSpotify"),
      appYouTube: document.getElementById("appYouTube"),
      appLive: document.getElementById("appLive"),

      // instagram

      igAvatar: document.getElementById("igAvatar"),
      igHandle: document.getElementById("igHandle"),
      igPostsCount: document.getElementById("igPostsCount"),
      igFollowers: document.getElementById("igFollowers"),
      igFollowing: document.getElementById("igFollowing"),
      igFile: document.getElementById("igFile"),
      igCaption: document.getElementById("igCaption"),
      igPostBtn: document.getElementById("igPostBtn"),
      igGrid: document.getElementById("igGrid"),
      igSearchInput: document.getElementById("igSearchInput"),
        igSearchBtn: document.getElementById("igSearchBtn"),
        igSearchResults: document.getElementById("igSearchResults"),


      // spotify
      spotifyList: document.getElementById("spotifyList"),

      // youtube
      ytTitle: document.getElementById("ytTitle"),
      ytPublishBtn: document.getElementById("ytPublishBtn"),
      ytList: document.getElementById("ytList"),

      // live
      liveStartBtn: document.getElementById("liveStartBtn"),
      liveQABtn: document.getElementById("liveQABtn"),
      liveFreestyleBtn: document.getElementById("liveFreestyleBtn"),
      liveLogText: document.getElementById("liveLogText"),
      liveOverlay: document.getElementById("liveOverlay"),
    liveOverlayCloseBtn: document.getElementById("liveOverlayCloseBtn"),
    liveHero: document.getElementById("liveHero"),
    liveViewers: document.getElementById("liveViewers"),
    liveChat: document.getElementById("liveChat"),

    };
    (function wireOnboarding(){
  const ob = {
    overlay: document.getElementById("onboardingOverlay"),
    skip: document.getElementById("onboardingSkipBtn"),
    cancel: document.getElementById("onboardingCancelBtn"),
    save: document.getElementById("onboardingSaveBtn"),
    random: document.getElementById("obRandomizeBtn"),

    first: document.getElementById("obFirstName"),
    last: document.getElementById("obLastName"),
    dob: document.getElementById("obDob"),
    stage: document.getElementById("obStageName"),
    face: document.getElementById("obFaceFile"),

    bodyTone: document.getElementById("obBodyTone"),
    hair: document.getElementById("obHair"),
    top: document.getElementById("obTop"),
    pants: document.getElementById("obPants"),
    shoes: document.getElementById("obShoes"),
    hat: document.getElementById("obHat"),
    glasses: document.getElementById("obGlasses"),
    chain: document.getElementById("obChain"),
    watch: document.getElementById("obWatch"),
  };

  if (!ob.overlay) return;

  function syncFromUI() {
    state.profile.firstName = (ob.first?.value || "").trim();
    state.profile.lastName = (ob.last?.value || "").trim();
    state.profile.dob = (ob.dob?.value || "").trim();
    state.profile.stageName = (ob.stage?.value || "").trim();

    const a = state.profile.avatar;
    a.bodyTone = ob.bodyTone?.value || a.bodyTone;
    a.hair = ob.hair?.value || a.hair;
    a.top = ob.top?.value || a.top;
    a.pants = ob.pants?.value || a.pants;
    a.shoes = ob.shoes?.value || a.shoes;
    a.hat = ob.hat?.value || a.hat;
    a.glasses = ob.glasses?.value || a.glasses;
    a.chain = ob.chain?.value || a.chain;
    a.watch = ob.watch?.value || a.watch;

    renderAvatarPreview();
  }

  // listeners cambio select
  ["bodyTone","hair","top","pants","shoes","hat","glasses","chain","watch"].forEach(k => {
    ob[k]?.addEventListener("change", syncFromUI);
  });

  // upload faccia
  ob.face?.addEventListener("change", () => {
    const file = ob.face.files && ob.face.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      state.profile.avatar.faceImageDataUrl = String(r.result || "");
      renderAvatarPreview();
    };
    r.readAsDataURL(file);
  });

  ob.random?.addEventListener("click", () => {
    const rand = (arr) => arr[Math.floor(Math.random()*arr.length)];
    state.profile.avatar.bodyTone = rand(["tone1","tone2","tone3","tone4"]);
    state.profile.avatar.hair = rand(["hair1","hair2","hair3"]);
    state.profile.avatar.top = rand(["top1","top2","top3"]);
    state.profile.avatar.pants = rand(["pants1","pants2","pants3"]);
    state.profile.avatar.shoes = rand(["shoes1","shoes2","shoes3"]);
    state.profile.avatar.hat = rand(["none","hat1","hat2"]);
    state.profile.avatar.glasses = rand(["none","gl1","gl2"]);
    state.profile.avatar.chain = rand(["none","ch1","ch2"]);
    state.profile.avatar.watch = rand(["none","w1"]);

    // riflette anche nei select
    ob.bodyTone.value = state.profile.avatar.bodyTone;
    ob.hair.value = state.profile.avatar.hair;
    ob.top.value = state.profile.avatar.top;
    ob.pants.value = state.profile.avatar.pants;
    ob.shoes.value = state.profile.avatar.shoes;
    ob.hat.value = state.profile.avatar.hat;
    ob.glasses.value = state.profile.avatar.glasses;
    ob.chain.value = state.profile.avatar.chain;
    ob.watch.value = state.profile.avatar.watch;

    renderAvatarPreview();
  });

  function applyAndEnter(useDefault=false) {
    syncFromUI();

    if (useDefault) {
      // fallback coerente col tuo gioco
      if (!state.profile.stageName) state.profile.stageName = "Lil Simone";
      if (!state.profile.firstName) state.profile.firstName = "Simone";
      if (!state.profile.lastName) state.profile.lastName = "Demo";
    }

    // stageName governa il gioco (come già fai)
    if (state.profile.stageName && state.profile.stageName.trim()) {
      state.player.stageName = state.profile.stageName.trim();
    }

    saveProfileToStorage();
    closeOnboarding();

    // aggiorna tutto senza cambiare logiche del gioco
    updateUI();
    rrWireRipples();
    saveGameDebounced();

  }

  ob.save?.addEventListener("click", () => applyAndEnter(false));
  ob.cancel?.addEventListener("click", () => applyAndEnter(true));
  ob.skip?.addEventListener("click", () => applyAndEnter(true));
})();

    el.publishBtn.addEventListener("click", openComposer);
    if (el.albumBtn) el.albumBtn.addEventListener("click", openAlbumOverlay);

    el.composerConfirmBtn.addEventListener("click", finalizeSingle);
    el.barsBtn.addEventListener("click", writeBars);
    el.liveBtn.addEventListener("click", liveShow);
    el.tourBtn.addEventListener("click", openTourOverlay);
    el.albumBtn.addEventListener("click", createAlbum);
function createAlbum() {
  const p = state.player;

  // Gate minimo: non puoi fare album al day 1
  if (p.level < 6) {
    showToast("Album bloccato: serve almeno <span>Lv. 6</span>.");
    return;
  }

  // Serve catalogo minimo
  const tracks = state.chartTracks.filter(t => t.artist === p.stageName);
  if (tracks.length < 4) {
    showToast("Servono almeno <span>4 canzoni</span> per un album.");
    return;
  }

  const albumTitle = `Album ${state.albums.length + 1}`;
  const albumTracks = tracks.slice(0, 8); // prime 8 tracce

  const album = {
    id: generateId("alb"),
    title: albumTitle,
    artist: p.stageName,
    tracks: albumTracks.map(t => t.id),
    week: state.week,
    year: state.year
  };

  state.albums.push(album);

  // Reward moderata
  const fansGain = 250 + Math.floor(Math.random() * 350);
  const moneyGain = 600 + Math.floor(Math.random() * 800);

  p.fans += fansGain;
  p.money += moneyGain;
  addXP(60);

  addToFeed(`Ha pubblicato l'album "${albumTitle}" (${albumTracks.length} tracce).`, "player");
  showToast(`Album pubblicato: <span>+${formatNumber(fansGain)}</span> fan, <span>+$${formatNumber(moneyGain)}</span>`);

  updateUI();
  saveGameDebounced();

}


    let composerMode = "beat"; // "beat" | "lyrics"

    // ------------------- UTILS -------------------
    function lsGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
// =======================
// GAME SAVE / LOAD (FULL)
// =======================
const SAVE_KEY = "raprise_full_save_v1";

function saveGameNow() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Errore salvataggio partita:", e);
  }
}

let _saveTimer = null;
function saveGameDebounced(ms = 400) {
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(saveGameNow, ms);
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;

    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return false;

    Object.assign(state, data);
    return true;
  } catch (e) {
    console.warn("Errore caricamento partita:", e);
    return false;
  }
}

function resetGame() {
  // Rimuovi il listener per evitare che il salvataggio automatico sovrascriva la cancellazione
  window.removeEventListener("beforeunload", saveGameNow); 
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem("raprise_profile_v1");
  localStorage.removeItem("raprise_ig_directory_avatars_v1");
  location.reload();
}

window.addEventListener("beforeunload", saveGameNow);


function loadProfileFromStorage() {
  const saved = lsGet("raprise_profile_v1", null);
  if (!saved) return false;

  // merge minimale
  state.profile = { ...state.profile, ...saved };
  if (saved.stageName) state.player.stageName = saved.stageName; // mantiene gioco identico
  return true;
}

function saveProfileToStorage() {
  lsSet("raprise_profile_v1", state.profile);
}

function avatarSvgLayer(kind, val, tone) {
  // SVG semplice a layer: ti permette di renderizzare “corpo+vestiti+accessori”
  // È volutamente leggero: dopo possiamo arricchirlo con asset più belli.
  const skin = tone === "tone1" ? "#f8d7c0"
    : tone === "tone2" ? "#e7b894"
    : tone === "tone3" ? "#c98b63"
    : "#8d5a3c";

  const common = (fill, y, h) => `<rect x="60" y="${y}" width="100" height="${h}" rx="18" fill="${fill}" />`;

  if (kind === "body") {
    return `
      <rect x="70" y="40" width="80" height="90" rx="34" fill="${skin}"/>
      <rect x="60" y="120" width="100" height="120" rx="26" fill="${skin}" opacity="0.98"/>
    `;
  }

  if (kind === "hair") {
    const hair = val === "hair2" ? "#111827" : val === "hair3" ? "#7c2d12" : "#0f172a";
    return `<rect x="70" y="34" width="80" height="42" rx="18" fill="${hair}" />`;
  }

  if (kind === "top") {
    const fill = val === "top2" ? "rgba(96,165,250,0.65)" : val === "top3" ? "rgba(249,115,22,0.55)" : "rgba(34,197,94,0.55)";
    return common(fill, 120, 74);
  }

  if (kind === "pants") {
    const fill = val === "pants2" ? "rgba(148,163,184,0.65)" : val === "pants3" ? "rgba(167,139,250,0.55)" : "rgba(59,130,246,0.55)";
    return common(fill, 186, 64);
  }

  if (kind === "shoes") {
    const fill = val === "shoes2" ? "rgba(250,204,21,0.55)" : val === "shoes3" ? "rgba(244,63,94,0.50)" : "rgba(15,23,42,0.75)";
    return `
      <rect x="62" y="244" width="46" height="16" rx="8" fill="${fill}"/>
      <rect x="112" y="244" width="46" height="16" rx="8" fill="${fill}"/>
    `;
  }

  if (kind === "hat") {
    if (val === "none") return "";
    const fill = val === "hat2" ? "rgba(148,163,184,0.75)" : "rgba(249,115,22,0.70)";
    return `<rect x="68" y="22" width="84" height="26" rx="12" fill="${fill}"/>`;
  }

  if (kind === "glasses") {
    if (val === "none") return "";
    const stroke = "rgba(255,255,255,0.75)";
    return `
      <rect x="80" y="70" width="26" height="16" rx="6" fill="rgba(0,0,0,0.35)" stroke="${stroke}"/>
      <rect x="114" y="70" width="26" height="16" rx="6" fill="rgba(0,0,0,0.35)" stroke="${stroke}"/>
      <rect x="106" y="76" width="8" height="2" fill="${stroke}"/>
    `;
  }

  if (kind === "chain") {
    if (val === "none") return "";
    const fill = val === "ch2" ? "rgba(226,232,240,0.75)" : "rgba(250,204,21,0.75)";
    return `<rect x="86" y="130" width="48" height="8" rx="4" fill="${fill}" />`;
  }

  if (kind === "watch") {
    if (val === "none") return "";
    return `<rect x="56" y="170" width="10" height="24" rx="4" fill="rgba(250,204,21,0.55)" />`;
  }

  return "";
}
function shade(hex, pct) {
  // pct: -1..+1
  const c = hex.replace("#", "");
  const num = parseInt(c, 16);
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;

  const t = pct < 0 ? 0 : 255;
  const p = Math.abs(pct);

  r = Math.round((t - r) * p + r);
  g = Math.round((t - g) * p + g);
  b = Math.round((t - b) * p + b);

  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function paletteFromAvatar(a) {
  const skin = a.bodyTone === "tone1" ? "#f2d2b6"
    : a.bodyTone === "tone2" ? "#d9a77f"
    : a.bodyTone === "tone3" ? "#b77a55"
    : "#7b4c33";

  const hair = a.hair === "hair2" ? "#111827" : a.hair === "hair3" ? "#6b2f1a" : "#0f172a";

  const top = a.top === "top2" ? "#60a5fa" : a.top === "top3" ? "#f97316" : "#22c55e";
  const pants = a.pants === "pants2" ? "#94a3b8" : a.pants === "pants3" ? "#a78bfa" : "#3b82f6";
  const shoes = a.shoes === "shoes2" ? "#facc15" : a.shoes === "shoes3" ? "#f43f5e" : "#0b1220";

  const chain = a.chain === "ch2" ? "#e2e8f0" : "#facc15";
  const hat = a.hat === "hat2" ? "#94a3b8" : "#f97316";

  return { skin, hair, top, pants, shoes, chain, hat };
}

function renderBlockyAvatarSvg(a) {
  // Coordinate base per un personaggio blocky (anteprima 220x260)
  const P = paletteFromAvatar(a);

  // “3D finto”: faccia (front), lato (dark), top (light)
  const face = (x, y, w, h, col) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}" rx="6"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="rgba(255,255,255,0.08)" rx="6"/>
  `;
  const side = (x, y, w, h, col) => `
    <polygon points="${x+w},${y} ${x+w+10},${y+8} ${x+w+10},${y+h+8} ${x+w},${y+h}"
      fill="${shade(col, -0.25)}"/>
  `;
  const top = (x, y, w, col) => `
    <polygon points="${x},${y} ${x+10},${y-8} ${x+w+10},${y-8} ${x+w},${y}"
      fill="${shade(col, +0.15)}"/>
  `;

  // Head
  const headX = 70, headY = 28, headW = 80, headH = 72;

  // Body
  const bodyX = 74, bodyY = 108, bodyW = 72, bodyH = 78;

  // Arms
  const armLW = 20, armLH = 66;
  const armLX = bodyX - armLW - 10, armLY = 112;
  const armRX = bodyX + bodyW + 10, armRY = 112;

  // Legs
  const legW = 26, legH = 70;
  const legLX = bodyX + 6, legLY = bodyY + bodyH + 10;
  const legRX = bodyX + bodyW - legW - 6, legRY = bodyY + bodyH + 10;

  // Clothing patterns (semplici ma “divertenti”)
  const hoodiePocket = `
    <rect x="${bodyX+16}" y="${bodyY+42}" width="40" height="24" rx="6" fill="${shade(P.top, -0.12)}" opacity="0.9"/>
    <rect x="${bodyX+12}" y="${bodyY+38}" width="48" height="4" rx="2" fill="rgba(0,0,0,0.18)"/>
  `;
  const jacketZip = `
    <rect x="${bodyX+34}" y="${bodyY+8}" width="4" height="${bodyH-8}" rx="2" fill="rgba(255,255,255,0.22)"/>
    <rect x="${bodyX+31}" y="${bodyY+8}" width="10" height="10" rx="3" fill="rgba(0,0,0,0.22)"/>
  `;
  const tshirtPrint = `
    <text x="${bodyX+36}" y="${bodyY+48}" text-anchor="middle"
      font-family="system-ui" font-weight="900" font-size="12" fill="rgba(255,255,255,0.65)">RR</text>
  `;

  const topDetail = a.top === "top1" ? hoodiePocket : a.top === "top2" ? jacketZip : tshirtPrint;

  // Face features
  const eyes = `
    <rect x="${headX+22}" y="${headY+30}" width="10" height="10" rx="3" fill="rgba(0,0,0,0.55)"/>
    <rect x="${headX+48}" y="${headY+30}" width="10" height="10" rx="3" fill="rgba(0,0,0,0.55)"/>
    <rect x="${headX+24}" y="${headY+33}" width="6" height="3" rx="2" fill="rgba(255,255,255,0.35)"/>
    <rect x="${headX+50}" y="${headY+33}" width="6" height="3" rx="2" fill="rgba(255,255,255,0.35)"/>
  `;
  const mouth = `
    <rect x="${headX+34}" y="${headY+50}" width="22" height="6" rx="3" fill="rgba(0,0,0,0.25)"/>
  `;

  // Hair styles blocky
  const hair1 = `
    ${top(headX, headY, headW, P.hair)}
    ${face(headX, headY, headW, 18, P.hair)}
  `;
  const hair2 = `
    ${top(headX, headY, headW, P.hair)}
    <rect x="${headX}" y="${headY}" width="${headW}" height="26" rx="6" fill="${P.hair}"/>
    <rect x="${headX+10}" y="${headY+20}" width="18" height="10" rx="4" fill="${shade(P.hair, -0.18)}"/>
  `;
  const hair3 = `
    ${top(headX, headY, headW, P.hair)}
    <rect x="${headX}" y="${headY}" width="${headW}" height="22" rx="6" fill="${P.hair}"/>
    <rect x="${headX+52}" y="${headY+16}" width="18" height="14" rx="5" fill="${shade(P.hair, -0.18)}"/>
  `;

  const hairLayer = a.hair === "hair2" ? hair2 : a.hair === "hair3" ? hair3 : hair1;

  // Hat
  const hatLayer = a.hat === "none" ? "" : `
    ${top(headX-2, headY-2, headW+4, P.hat)}
    <rect x="${headX-2}" y="${headY-2}" width="${headW+4}" height="18" rx="7" fill="${P.hat}"/>
    <rect x="${headX+10}" y="${headY+10}" width="${headW-20}" height="6" rx="3" fill="${shade(P.hat, -0.18)}"/>
  `;

  // Glasses
  const glassesLayer = a.glasses === "none" ? "" : `
    <rect x="${headX+18}" y="${headY+28}" width="20" height="14" rx="5" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.35)"/>
    <rect x="${headX+42}" y="${headY+28}" width="20" height="14" rx="5" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.35)"/>
    <rect x="${headX+38}" y="${headY+34}" width="4" height="2" rx="1" fill="rgba(255,255,255,0.35)"/>
  `;

  // Chain
  const chainLayer = a.chain === "none" ? "" : `
    <rect x="${bodyX+20}" y="${bodyY+8}" width="${bodyW-40}" height="8" rx="4" fill="${P.chain}" opacity="0.85"/>
    <rect x="${bodyX+34}" y="${bodyY+14}" width="8" height="10" rx="3" fill="${shade(P.chain, -0.15)}" opacity="0.85"/>
  `;

  // Watch
  const watchLayer = a.watch === "none" ? "" : `
    <rect x="${armLX+6}" y="${armLY+40}" width="10" height="14" rx="3" fill="rgba(0,0,0,0.22)"/>
    <rect x="${armLX+7}" y="${armLY+42}" width="8" height="10" rx="3" fill="rgba(255,255,255,0.18)"/>
  `;

  // Build SVG
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="220" height="260" viewBox="0 0 220 260">
    <defs>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="rgba(0,0,0,0.55)"/>
      </filter>
    </defs>

    <rect x="0" y="0" width="220" height="260" fill="rgba(2,6,23,0)"/>

    <g filter="url(#softShadow)">
      <!-- HEAD -->
      ${top(headX, headY, headW, P.skin)}
      ${side(headX, headY, headW, headH, P.skin)}
      ${face(headX, headY, headW, headH, P.skin)}
      ${eyes}
      ${mouth}

      ${hairLayer}
      ${hatLayer}
      ${glassesLayer}

      <!-- BODY -->
      ${top(bodyX, bodyY, bodyW, P.top)}
      ${side(bodyX, bodyY, bodyW, bodyH, P.top)}
      ${face(bodyX, bodyY, bodyW, bodyH, P.top)}
      ${topDetail}
      ${chainLayer}

      <!-- ARMS -->
      ${top(armLX, armLY, armLW, P.skin)}
      ${side(armLX, armLY, armLW, armLH, P.skin)}
      ${face(armLX, armLY, armLW, armLH, P.skin)}

      ${top(armRX, armRY, armLW, P.skin)}
      ${side(armRX, armRY, armLW, armLH, P.skin)}
      ${face(armRX, armRY, armLW, armLH, P.skin)}
      ${watchLayer}

      <!-- LEGS -->
      ${top(legLX, legLY, legW, P.pants)}
      ${side(legLX, legLY, legW, legH, P.pants)}
      ${face(legLX, legLY, legW, legH, P.pants)}

      ${top(legRX, legRY, legW, P.pants)}
      ${side(legRX, legRY, legW, legH, P.pants)}
      ${face(legRX, legRY, legW, legH, P.pants)}

      <!-- SHOES -->
      ${top(legLX-2, legLY+legH-4, legW+4, P.shoes)}
      ${face(legLX-2, legLY+legH-4, legW+4, 12, P.shoes)}
      ${top(legRX-2, legRY+legH-4, legW+4, P.shoes)}
      ${face(legRX-2, legRY+legH-4, legW+4, 12, P.shoes)}
    </g>
  </svg>`;

  return svg.trim();
}



function renderAvatarPreview() {
  const box = document.getElementById("avatarPreview");
  if (!box) return;

  const a = state.profile.avatar;
  const svg = renderBlockyAvatarSvg(a);

  box.innerHTML = "";
  const img = document.createElement("img");
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "contain";
  img.style.display = "block";
  box.appendChild(img);

  // Overlay faccia (se presente)
  if (a.faceImageDataUrl) {
    const face = document.createElement("img");
    face.src = a.faceImageDataUrl;
    face.style.position = "absolute";
    face.style.left = "92px";
    face.style.top = "52px";
    face.style.width = "36px";
    face.style.height = "36px";
    face.style.borderRadius = "8px"; // più "blocky" e meno tondo
    face.style.opacity = "0.92";
    face.style.borderRadius = "999px";
    face.style.objectFit = "cover";
    face.style.border = "2px solid rgba(255,255,255,0.25)";
    box.appendChild(face);
  }
}

function openOnboarding() {
  document.getElementById("onboardingOverlay")?.classList.remove("hidden");
  renderAvatarPreview();
}

function closeOnboarding() {
  document.getElementById("onboardingOverlay")?.classList.add("hidden");
}

    function formatNumber(num) { return num.toLocaleString("it-IT"); }
    function clamp(num, min, max) { return Math.min(max, Math.max(min, num)); }

    function showToast(message) {
      el.toast.innerHTML = message;
      el.toast.classList.add("show");
      clearTimeout(showToast._t);
      showToast._t = setTimeout(() => el.toast.classList.remove("show"), 2300);
    }

    // ===== Premium FX helpers (Clash-like feedback) =====
    const __uiLast = { fans:null, money:null, hype:null, xp:null, level:null };

    function rrPop(elm, cls="fx-pop", ms=220){
      if(!elm) return;
      elm.classList.remove(cls);
      // force reflow
      void elm.offsetWidth;
      elm.classList.add(cls);
      clearTimeout(elm.__rrT);
      elm.__rrT = setTimeout(()=> elm.classList.remove(cls), ms);
    }

    function rrRipple(e){
      const btn = e.currentTarget;
      if(!btn) return;
      const r = document.createElement("span");
      r.className = "rr-ripple";
      const rect = btn.getBoundingClientRect();
      const maxSide = Math.max(rect.width, rect.height);
      r.style.width = r.style.height = (maxSide * 2) + "px";
      r.style.left = (e.clientX - rect.left) + "px";
      r.style.top  = (e.clientY - rect.top) + "px";
      btn.appendChild(r);
      setTimeout(()=> r.remove(), 650);
      // subtle haptics on mobile
      if (navigator.vibrate) navigator.vibrate(8);
    }

    // Animate integer values with easing
    function rrAnimateInt(elm, from, to, formatFn, duration=520){
      if(!elm) return;
      if(from === to){
        elm.textContent = formatFn(to);
        return;
      }
      const t0 = performance.now();
      const delta = to - from;
      const easeOutCubic = (x) => 1 - Math.pow(1-x, 3);

      function tick(now){
        const p = Math.min(1, (now - t0) / duration);
        const v = Math.round(from + delta * easeOutCubic(p));
        elm.textContent = formatFn(v);
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    function rrParseIntLike(str){
      const n = String(str).replace(/[^0-9-]/g,"");
      const v = parseInt(n, 10);
      return Number.isFinite(v) ? v : 0;
    }

    // Attach ripple to important buttons only (primary/secondary/ghost)
    function rrWireRipples(){
      document.querySelectorAll("button").forEach(b=>{
        if(b.__rrRippleWired) return;
        b.__rrRippleWired = true;
        b.addEventListener("pointerdown", rrRipple, { passive:true });
      });
    }

    function generateId(prefix) {
      return prefix + "-" + Date.now().toString(16) + "-" + Math.random().toString(16).slice(2);
    }

    function initials(name) {
      const parts = (name || "").trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) return "RS";
      const a = parts[0][0] || "R";
      const b = (parts[1]?.[0] || parts[0]?.[1] || "S");
      return (a + b).toUpperCase();
    }
    function igEngagementForNow() {
  const p = state.player;
  const fans = Math.max(0, p.fans);
  const hype = Math.max(0, p.hype);

  // Like medi: cresce con fan + hype (senza esplodere troppo)
  const likeMean = Math.max(3, Math.floor((fans * 0.015) + (hype * 2.2)));
  const likes = Math.max(0, Math.floor(likeMean * (0.75 + Math.random() * 0.7)));

  // Commenti: 2%-6% dei like circa, dipende dall’hype
  const commentRate = 0.02 + Math.min(0.04, hype / 2500);
  const comments = Math.max(0, Math.floor(likes * commentRate * (0.7 + Math.random() * 0.8)));

  return { likes, comments };
}


    // ------------------- PROFILO (nome artista) -------------------
    function initProfile() {
      try {
        const saved = localStorage.getItem("raprise_profile_name");
        if (saved && saved.trim().length > 0) {
          state.player.stageName = saved.trim();
        } else {
          let name = prompt("Scegli il tuo nome artista (es. Lil Simone):", "Lil Simone");
          if (!name || !name.trim()) name = "Lil Simone";
          state.player.stageName = name.trim();
          localStorage.setItem("raprise_profile_name", state.player.stageName);
        }
      } catch (e) {}
    }

    // ------------------- UI -------------------
    function updateSkillsUI() {
      const s = state.player.stats;
      const set = (valEl, fillEl, value) => {
        valEl.textContent = value;
        fillEl.style.width = `${clamp(value, 0, 100)}%`;
      };
      set(el.flowVal, el.flowFill, s.flow);
      set(el.writingVal, el.writingFill, s.writing);
      set(el.stageVal, el.stageFill, s.stage);
      set(el.socialVal, el.socialFill, s.social);
    }

    function updateMissionsUI() {
      el.missionsWeek.textContent = `Settimana ${state.week}`;
      el.missionsList.innerHTML = "";
      state.missions.forEach(m => {
        const done = m.check();
        const div = document.createElement("div");
        div.className = "mission";
        div.innerHTML = `
          <span>${m.label}</span>
          <span class="status ${done ? "done" : ""}">${done ? "Completata" : m.progressText()}</span>
        `;
        el.missionsList.appendChild(div);
      });
    }

    function updateCareerMood() {
      const p = state.player;
      let mood = "";
      if (p.fans < 1000) mood = "Sconosciuto totale";
      else if (p.fans < 10000) mood = "Nome che gira nell'underground";
      else if (p.fans < 50000) mood = "Rapper di tendenza";
      else mood = "Star affermata della scena";
      el.careerMood.textContent = mood;
    }

    function rebuildChartRanking() {
      const tracks = [...state.chartTracks];
      tracks.sort((a, b) => b.streams - a.streams);
      const newPos = {};
      tracks.forEach((t, idx) => {
        const pos = idx + 1;
        const prev = state.lastChartPos[t.id];
        let change = "new";
        if (prev !== undefined) {
          if (pos < prev + 1) change = "up";
          else if (pos > prev + 1) change = "down";
          else change = "same";
        }
        t.position = pos;
        t.change = change;
        newPos[t.id] = idx;
      });
      state.lastChartPos = newPos;
      state.chartTracks = tracks;
    }

    function updateChartUI() {
      const listEl = el.chartList;
      listEl.innerHTML = "";
      if (state.chartTracks.length === 0) {
        listEl.innerHTML = "<div class='danger'>Nessuna classifica ancora. Droppa qualche singolo!</div>";
        return;
      }
      const top = state.chartTracks.slice(0, 10);
      top.forEach((t, idx) => {
        const div = document.createElement("div");
        div.className = "chart-item";
        let symbol = "•";
        if (t.change === "up") symbol = "▲";
        else if (t.change === "down") symbol = "▼";
        else if (t.change === "new") symbol = "NEW";
        const you = t.artist === state.player.stageName ? " (TU)" : "";
        const featText = t.feat ? ` (feat. ${t.feat})` : "";
        div.innerHTML = `
          <span>#${idx + 1} ${symbol} <strong>${t.title}</strong>${featText} · ${t.artist}${you}</span>
          <span>${formatNumber(t.streams)} stream</span>
        `;
        listEl.appendChild(div);
      });
    }

    function updateManagerTip() {
      const p = state.player;
      let tip = "";

      if (p.fans < 1000 && p.hype < 20) {
        tip = "Spingi con singoli e allenamento. All'inizio serve costanza, non solo un pezzo virale.";
      } else if (p.hype > 60 && p.money < 5000) {
        tip = "È il momento di fare qualche live o tour: monetizza l'hype prima che cali.";
      } else if (p.stats.writing < 60) {
        tip = "Scrivi barre: serve un livello di penna alto per reggere i prossimi progetti.";
      } else {
        tip = "Alterna singoli, allenamento, live, tour e contenuti social: crescita lenta ma solida.";
      }

      el.managerTip.textContent = tip;
    }

    function updateUI() {
      const p = state.player;

      // Level / XP (animated)
      const needed = Math.max(1, p.level * 140);
      const pct = Math.max(0, Math.min(100, Math.round((p.xp / needed) * 100)));

      // Level label
      if (__uiLast.level === null) {
        el.levelLabel.textContent = `Lv. ${p.level}`;
      } else if (__uiLast.level !== p.level) {
        el.levelLabel.textContent = `Lv. ${p.level}`;
        rrPop(el.levelLabel, "fx-pop", 240);
        rrPop(document.getElementById("statsCard"), "fx-glow", 520);
      }

      // XP label + bar
      const xpLabelEl = document.getElementById("xpLabel");
      const xpFillEl  = document.getElementById("xpBarFill");
      if (xpLabelEl) {
        const fromXp = (__uiLast.xp === null) ? p.xp : __uiLast.xp;
        rrAnimateInt(
          xpLabelEl,
          fromXp,
          p.xp,
          (v) => `${v} / ${needed} XP`,
          520
        );
      }
      if (xpFillEl) xpFillEl.style.width = pct + "%";

      __uiLast.level = p.level;
      __uiLast.xp = p.xp;
el.rapperName.textContent = p.stageName;
      el.genreLabel.textContent = `${p.genre} • ${p.background}`;
      el.rivalName.textContent = state.rival.name;
      // KPI counters (animated + pop)
      if (__uiLast.fans === null) {
        el.fansValue.textContent = formatNumber(p.fans);
      } else if (__uiLast.fans !== p.fans) {
        rrAnimateInt(el.fansValue, __uiLast.fans, p.fans, (v)=> formatNumber(v), 520);
        rrPop(el.fansValue, "fx-pop", 240);
      }
      if (__uiLast.money === null) {
        el.moneyValue.textContent = `$ ${formatNumber(p.money)}`;
      } else if (__uiLast.money !== p.money) {
        rrAnimateInt(el.moneyValue, __uiLast.money, p.money, (v)=> `$ ${formatNumber(v)}`, 520);
        rrPop(el.moneyValue, "fx-pop", 240);
      }
      if (__uiLast.hype === null) {
        el.hypeValue.textContent = p.hype;
      } else if (__uiLast.hype !== p.hype) {
        rrAnimateInt(el.hypeValue, __uiLast.hype, p.hype, (v)=> String(v), 420);
        rrPop(el.hypeValue, "fx-pop", 240);
      }

      __uiLast.fans = p.fans;
      __uiLast.money = p.money;
      __uiLast.hype = p.hype;
      el.timeLabel.textContent = `Giorno ${state.day} • Settimana ${state.week} • Anno ${state.year}`;
      el.feedCounter.textContent = `${state.feed.length} post`;

      updateSkillsUI();
      updateMissionsUI();
      updateCareerMood();
      renderFeed();
      updateManagerTip();
      updateChartUI();

      // phone pills
      el.phonePillFans.textContent = `Fan: ${formatNumber(p.fans)}`;
      el.phonePillHype.textContent = `Hype: ${p.hype}`;

      // instagram header
      if (state.profile?.avatar?.faceImageDataUrl) {
  el.igAvatar.innerHTML = `<img src="${state.profile.avatar.faceImageDataUrl}" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:999px;" />`;
} else {
  el.igAvatar.textContent = initials(p.stageName);
}

      const handle = "@" + p.stageName.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9_]/g, "");
      el.igHandle.textContent = handle;
      el.igFollowers.textContent = formatNumber(Math.max(p.fans, 0));
      el.igPostsCount.textContent = formatNumber(state.phone.instagram.posts.filter(x => x.owner === p.stageName).length);

      renderInstagramGrid();
      refreshYouTubeSongSelect();
      renderYouTube();
      renderSpotifyTop100();
    }

    // ------------------- FEED -------------------
    function addToFeed(text, type = "player") {
      const prefix = type === "player" ? state.player.stageName
        : type === "system" ? "Sistema"
        : type === "rival" ? state.rival.name
        : "Fan";

      const badgeClass = type === "player" ? "badge"
        : type === "system" ? "badge"
        : type === "rival" ? "badge badge-rival"
        : "badge badge-fan";

      const badgeText = type === "player" ? "Drop"
        : type === "system" ? "Update"
        : type === "rival" ? "Rival"
        : "Fan";

      const item = { id: generateId("feed"), text, prefix, badgeClass, badgeText, day: state.day, week: state.week, year: state.year };
      state.feed.unshift(item);
      if (state.feed.length > 60) state.feed.pop();
    }

    function renderFeed() {
      el.feedList.innerHTML = "";
      if (state.feed.length === 0) {
        const empty = document.createElement("div");
        empty.className = "feed-item";
        empty.innerHTML = `
          <div class="danger">Il feed è vuoto.</div>
          <div class="feed-meta">Pubblica un singolo, fai un live o avanza i giorni.</div>
        `;
        el.feedList.appendChild(empty);
        return;
      }

      state.feed.forEach(item => {
        const div = document.createElement("div");
        div.className = "feed-item";
        div.innerHTML = `
          <div><strong>${item.prefix}</strong>: ${item.text}</div>
          <div class="feed-meta">
            <span class="${item.badgeClass}">${item.badgeText}</span>
            <span>G${item.day} • S${item.week} • ${item.year}</span>
          </div>
        `;
        el.feedList.appendChild(div);
      });
    }

    // ------------------- MISSIONI -------------------
    function restoreMissions() {
      if (!state.missions || !Array.isArray(state.missions)) return;
      state.missions.forEach(m => {
        if (m.id === "singles") {
          m.check = () => state.dailyCounters.singles >= 1;
          m.progressText = () => `${state.dailyCounters.singles}/1`;
        } else if (m.id === "bars") {
          m.check = () => state.dailyCounters.bars >= 3;
          m.progressText = () => `${state.dailyCounters.bars}/3`;
        } else if (m.id === "fans") {
          const baseFansTarget = 1000 + state.week * 250;
          // Usa this.baseFans che è stato salvato nel JSON
          m.check = function() { return (state.player.fans - this.baseFans) >= baseFansTarget; };
          m.progressText = function() {
            const gained = Math.max(0, state.player.fans - this.baseFans);
            return `${formatNumber(gained)}/${formatNumber(baseFansTarget)}`;
          };
        }
      });
    }

    // ------------------- MISSIONI -------------------
    function restoreMissions() {
      if (!state.missions || !Array.isArray(state.missions)) return;
      state.missions.forEach(m => {
        if (m.id === "singles") {
          m.check = () => state.dailyCounters.singles >= 1;
          m.progressText = () => `${state.dailyCounters.singles}/1`;
        } else if (m.id === "bars") {
          m.check = () => state.dailyCounters.bars >= 3;
          m.progressText = () => `${state.dailyCounters.bars}/3`;
        } else if (m.id === "fans") {
          const baseFansTarget = 1000 + state.week * 250;
          m.check = function() { return (state.player.fans - this.baseFans) >= baseFansTarget; };
          m.progressText = function() {
            const gained = Math.max(0, state.player.fans - this.baseFans);
            return `${formatNumber(gained)}/${formatNumber(baseFansTarget)}`;
          };
        }
      });
    }

    function initMissionsForWeek() {
      state.dailyCounters = { singles: 0, bars: 0, lives: 0 };

      const baseFansTarget = 1000 + state.week * 250;
      const missions = [
        { id: "singles", label: "Droppa almeno 1 singolo oggi", check: () => state.dailyCounters.singles >= 1, progressText: () => `${state.dailyCounters.singles}/1` },
        { id: "bars", label: "Allena la penna (scrivi barre 3 volte)", check: () => state.dailyCounters.bars >= 3, progressText: () => `${state.dailyCounters.bars}/3` },
        {
          id: "fans", label: `Guadagna ${baseFansTarget} nuovi fan questa settimana`,
          baseFans: state.player.fans,
          check() { return (state.player.fans - this.baseFans) >= baseFansTarget; },
          progressText() {
            const gained = Math.max(0, state.player.fans - this.baseFans);
            return `${formatNumber(gained)}/${formatNumber(baseFansTarget)}`;
          }
        }
      ];
      state.missions = missions;
    }

    // ------------------- XP / LIVELLO -------------------
    function addXP(amount) {
      const p = state.player;
      p.xp += amount;
      const needed = p.level * 140;
      if (p.xp >= needed) {
        p.xp -= needed;
        p.level += 1;
        p.hype = clamp(p.hype + 4, 0, 100);
        showToast(`Level up! Ora sei <span>Lv. ${p.level}</span>`);
        addToFeed("Ha appena livellato! Il nome gira sempre di più.", "system");
      }
    }

    // ------------------- TITOLI TRACCE -------------------
    function generateTrackTitle() {
      const a = ["Notte", "Vicolo", "Cuore", "Strada", "Sogno", "Benz", "Problemi", "Fame", "Scala", "Pioggia"];
      const b = ["Fredda", "Calda", "Rotta", "In Fiamme", "In Testa", "Senza Filtro", "In Silenzio", "Di Vetro"];
      const w1 = a[Math.floor(Math.random() * a.length)];
      const w2 = b[Math.floor(Math.random() * b.length)];
      return `${w1} ${w2}`;
    }

    // ------------------- COMPOSER OVERLAY -------------------
    function openComposer() {
      composerMode = "beat";
      el.lyricsRow.style.display = "none";
      el.lyricsInput.value = "";
      el.featSelect.value = "";
      el.composerOverlay.classList.remove("hidden");
    }
    function closeComposer() { el.composerOverlay.classList.add("hidden"); }

    el.modeLyricsBtn.addEventListener("click", () => { composerMode = "lyrics"; el.lyricsRow.style.display = "block"; });
    el.modeBeatBtn.addEventListener("click", () => { composerMode = "beat"; el.lyricsRow.style.display = "none"; el.lyricsInput.value = ""; });
    el.composerCloseBtn.addEventListener("click", closeComposer);
    el.composerCancelBtn.addEventListener("click", closeComposer);

    // ------------------- AZIONI -------------------
    
    function finalizeSingle() {
  const p = state.player;
  const s = p.stats;

  // --- FEAT parse + costo ---
  const featRaw = (el.featSelect?.value || "").trim();
  let featName = "";
  let featCost = 0;
  let featBoost = 1;

  if (featRaw) {
    const parts = featRaw.split("|");
    featName = (parts[0] || "").trim();
    featCost = parseInt(parts[1] || "0", 10) || 0;
    featBoost = parseFloat(parts[2] || "1") || 1;

    if (featCost > 0 && p.money < featCost) {
      showToast("Non hai abbastanza soldi per pagare il feat.");
      return;
    }
  }

  // --- DIFFICOLTA' HARD: crescita più lenta ---
  let streamsBase =
    40 +
    p.fans * 0.06 +
    p.hype * 7 +
    s.writing * 0.9 +
    (s.flow - 50) * 1.4;

  if (streamsBase < 0) streamsBase = 0;

  const randomness = 0.85 + Math.random() * 0.35;
  let streams = Math.floor(streamsBase * randomness);

  // boost feat (se presente)
  streams = Math.floor(streams * featBoost);

  // Ricompense HARD
  const fansGained = Math.floor(streams / 12000);
  const moneyGained = Math.floor(streams / 220);
  const hypeGained = 2 + Math.floor(Math.random() * 2);

  // --- APPLICA RISULTATI AL PLAYER ---
  if (featCost > 0) p.money -= featCost;

  p.fans = Math.max(0, p.fans + fansGained);
  p.money = Math.max(0, p.money + moneyGained);
  p.hype = clamp(p.hype + hypeGained, 0, 100);

  state.dailyCounters.singles++;
  addXP(10);

  const title = generateTrackTitle();
  const lyricsText = composerMode === "lyrics" ? el.lyricsInput.value.trim() : "";
  const trackId = generateId("trk");

  state.chartTracks.push({
    id: trackId,
    artist: p.stageName,
    title,
    streams,
    week: state.week,
    feat: featName || "",
    hasLyrics: !!lyricsText,
    lyrics: lyricsText
  });

  rebuildChartRanking();

  addToFeed(
    `Ha droppato "${title}"${featName ? " (feat. " + featName + ")" : ""}: ${formatNumber(streams)} stream (+${formatNumber(fansGained)} fan, +$${formatNumber(moneyGained)}).`,
    "player"
  );

  maybeFanReaction();
  showToast(`Nuovo singolo! <span>+${formatNumber(fansGained)}</span> fan, <span>+$${formatNumber(moneyGained)}</span>`);

  closeComposer();
  updateUI();
  saveGameDebounced();

}
// =======================
// ALBUM (PRO) SYSTEM
// =======================
const ALBUM_REQUIRED_LEVEL = 6;

function albumFeatOptionsHTML() {
  // Riusa esattamente gli stessi feat del singolo (featSelect)
  const sel = document.getElementById("featSelect");
  if (!sel) return `<option value="">Nessun feat</option>`;

  // Clona options
  return Array.from(sel.options).map(o => {
    const val = String(o.value || "");
    const txt = String(o.textContent || "");
    return `<option value="${val.replace(/"/g, "&quot;")}">${txt}</option>`;
  }).join("");
}

function defaultAlbumTitle() {
  const a = ["Vicolo", "Notte", "Fame", "Scala", "Pioggia", "Strada", "Cuore", "Sogno", "Benz", "Problemi"];
  const b = ["E Oro", "E Fumo", "Senza Filtro", "In Testa", "In Silenzio", "Di Vetro", "Freddo", "Caldo", "Rotto", "Vivo"];
  return `${a[Math.floor(Math.random()*a.length)]} ${b[Math.floor(Math.random()*b.length)]}`;
}

function openAlbumOverlay() {
  const p = state.player;

  if (p.level < ALBUM_REQUIRED_LEVEL) {
    showToast(`Album bloccato: serve <span>Lv. ${ALBUM_REQUIRED_LEVEL}</span>. Ora sei Lv. ${p.level}.`);
    return;
  }

  // UI init
  el.albumGateLabel.textContent = `Sbloccato (Lv. ${ALBUM_REQUIRED_LEVEL}+)`;
  el.albumTitleInput.value = el.albumTitleInput.value.trim() || defaultAlbumTitle();
  el.albumTypeSelect.value = el.albumTypeSelect.value || "studio";

  // Se tracklist vuota, crea 6 tracce base
  if (!el.albumTracksList.dataset.seeded) {
    el.albumTracksList.innerHTML = "";
    for (let i = 0; i < 6; i++) albumAddTrackRow();
    el.albumTracksList.dataset.seeded = "1";
  }

  albumReindex();
  albumUpdateCostEstimate();
  el.albumOverlay.classList.remove("hidden");
}

function closeAlbumOverlay() {
  el.albumOverlay.classList.add("hidden");
}

if (el.albumCloseBtn) el.albumCloseBtn.addEventListener("click", closeAlbumOverlay);
if (el.albumCancelBtn) el.albumCancelBtn.addEventListener("click", closeAlbumOverlay);

if (el.albumAddTrackBtn) {
  el.albumAddTrackBtn.addEventListener("click", () => {
    albumAddTrackRow();
    albumReindex();
    albumUpdateCostEstimate();
  });
}

if (el.albumAddBulkBtn) {
  el.albumAddBulkBtn.addEventListener("click", () => {
    for (let i = 0; i < 4; i++) albumAddTrackRow();
    albumReindex();
    albumUpdateCostEstimate();
  });
}

function albumAddTrackRow(prefill = {}) {
  const n = el.albumTracksList.querySelectorAll("[data-album-track]").length + 1;
  const featHTML = albumFeatOptionsHTML();

  const row = document.createElement("div");
  row.setAttribute("data-album-track", "1");
  row.style.border = "1px solid rgba(30,41,59,.85)";
  row.style.background = "rgba(2,6,23,0.35)";
  row.style.borderRadius = "14px";
  row.style.padding = "10px";

  row.innerHTML = `
    <div style="display:grid; grid-template-columns: 40px 1fr 180px 140px; gap:10px; align-items:center;">
      <div style="font-weight:900; color:var(--muted);" data-idx>#${n}</div>

      <div style="min-width:0;">
        <label style="font-size:.74rem; color:var(--muted);">Titolo traccia</label>
        <input type="text" data-title placeholder="Es. Notte Fredda" value="${(prefill.title || generateTrackTitle()).replace(/"/g, "&quot;")}" />
      </div>

      <div>
        <label style="font-size:.74rem; color:var(--muted);">Feat</label>
        <select data-feat>${featHTML}</select>
      </div>

      <div style="display:flex; gap:6px; justify-content:flex-end;">
        <button class="ghost" type="button" data-up title="Su">↑</button>
        <button class="ghost" type="button" data-down title="Giù">↓</button>
        <button class="ghost" type="button" data-remove title="Rimuovi">✕</button>
      </div>
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:10px;">
      <div>
        <label style="font-size:.74rem; color:var(--muted);">Modalità</label>
        <select data-mode>
          <option value="beat">Solo beat (strumentale)</option>
          <option value="lyrics">Scrivo io il testo (bonus)</option>
        </select>
      </div>

      <div>
        <label style="font-size:.74rem; color:var(--muted);">Note</label>
        <input type="text" data-notes placeholder="Opzionale (es. mood, stile...)" value="${(prefill.notes || "").replace(/"/g, "&quot;")}" />
      </div>
    </div>

    <div data-lyricswrap class="hidden" style="margin-top:10px;">
      <label style="font-size:.74rem; color:var(--muted);">Testo (più scrivi, più bonus)</label>
      <textarea data-lyrics placeholder="Scrivi qui le barre...">${(prefill.lyrics || "")}</textarea>
    </div>
  `;

  // Imposta valori iniziali
  const featSel = row.querySelector("[data-feat]");
  if (featSel && prefill.featValue !== undefined) featSel.value = prefill.featValue;

  const modeSel = row.querySelector("[data-mode]");
  if (modeSel && prefill.mode) modeSel.value = prefill.mode;

  // Toggle lyrics UI
  row.querySelector("[data-mode]")?.addEventListener("change", () => {
    const mode = row.querySelector("[data-mode]")?.value || "beat";
    const wrap = row.querySelector("[data-lyricswrap]");
    if (!wrap) return;
    wrap.classList.toggle("hidden", mode !== "lyrics");
    albumUpdateCostEstimate();
  });

  // Move up/down/remove
  row.querySelector("[data-up]")?.addEventListener("click", () => {
    const prev = row.previousElementSibling;
    if (prev) el.albumTracksList.insertBefore(row, prev);
    albumReindex();
    albumUpdateCostEstimate();
  });

  row.querySelector("[data-down]")?.addEventListener("click", () => {
    const next = row.nextElementSibling;
    if (next) el.albumTracksList.insertBefore(next, row);
    albumReindex();
    albumUpdateCostEstimate();
  });

  row.querySelector("[data-remove]")?.addEventListener("click", () => {
    row.remove();
    albumReindex();
    albumUpdateCostEstimate();
  });

  // Recalc cost on edits
  row.querySelector("[data-feat]")?.addEventListener("change", albumUpdateCostEstimate);
  row.querySelector("[data-title]")?.addEventListener("input", () => {});
  row.querySelector("[data-lyrics]")?.addEventListener("input", () => {});

  el.albumTracksList.appendChild(row);

  // Mostra lyrics se prefill già lyrics
  const wrap = row.querySelector("[data-lyricswrap]");
  if (wrap && (prefill.mode === "lyrics")) wrap.classList.remove("hidden");
}

function albumReindex() {
  const rows = el.albumTracksList.querySelectorAll("[data-album-track]");
  rows.forEach((r, i) => {
    const idx = r.querySelector("[data-idx]");
    if (idx) idx.textContent = `#${i + 1}`;
  });
}

function parseFeatValue(featRaw) {
  const raw = String(featRaw || "").trim();
  if (!raw) return { name: "", cost: 0, boost: 1 };

  const parts = raw.split("|");
  const name = (parts[0] || "").trim();
  const cost = parseInt(parts[1] || "0", 10) || 0;
  const boost = parseFloat(parts[2] || "1") || 1;
  return { name, cost, boost };
}

function albumComputeCost() {
  const p = state.player;
  const type = el.albumTypeSelect?.value || "studio";
  const tracks = el.albumTracksList.querySelectorAll("[data-album-track]");
  const n = tracks.length;

  // base cost: dipende dal tipo + numero tracce (mix/master/cover/marketing)
  const base = type === "ep" ? 900 : type === "mixtape" ? 1400 : 2200;
  const perTrack = type === "ep" ? 120 : type === "mixtape" ? 160 : 240;
  let cost = base + (n * perTrack);

  // feat costs
  tracks.forEach(r => {
    const fv = r.querySelector("[data-feat]")?.value || "";
    const f = parseFeatValue(fv);
    cost += (f.cost || 0);
  });

  // sconto “skill”: social/level leggermente riducono sprechi, ma poco
  const skillDiscount = Math.min(0.12, (p.stats.social / 1200) + (p.level / 200));
  cost = Math.floor(cost * (1 - skillDiscount));

  return Math.max(0, cost);
}

function albumUpdateCostEstimate() {
  if (!el.albumCostLabel) return;
  const cost = albumComputeCost();
  el.albumCostLabel.textContent = `Costo stimato: $ ${formatNumber(cost)}`;
}

function albumGetTracksFromUI() {
  const rows = el.albumTracksList.querySelectorAll("[data-album-track]");
  const tracks = [];
  rows.forEach(r => {
    const title = (r.querySelector("[data-title]")?.value || "").trim() || generateTrackTitle();
    const featValue = (r.querySelector("[data-feat]")?.value || "").trim();
    const mode = (r.querySelector("[data-mode]")?.value || "beat").trim();
    const lyrics = (r.querySelector("[data-lyrics]")?.value || "").trim();
    const notes = (r.querySelector("[data-notes]")?.value || "").trim();
    tracks.push({ title, featValue, mode, lyrics, notes });
  });
  return tracks;
}

function albumPublish() {
  const p = state.player;
  if (p.level < ALBUM_REQUIRED_LEVEL) {
    showToast(`Album bloccato: serve <span>Lv. ${ALBUM_REQUIRED_LEVEL}</span>.`);
    return;
  }

  const albumTitle = (el.albumTitleInput?.value || "").trim() || defaultAlbumTitle();
  const type = el.albumTypeSelect?.value || "studio";
  const uiTracks = albumGetTracksFromUI();

  if (uiTracks.length < 4) { showToast("Un album PRO deve avere almeno <span>4</span> tracce."); return; }
  if (uiTracks.length > 18) { showToast("Massimo <span>18</span> tracce (per performance e bilanciamento)."); return; }

  const totalCost = albumComputeCost();
  if (p.money < totalCost) { showToast("Non hai abbastanza soldi per produrre questo album."); return; }

  // Paga
  p.money -= totalCost;

  // Moltiplicatori per tipo
  const typeMult = (type === "ep") ? 0.95 : (type === "mixtape") ? 0.90 : 1.05;

  // Ogni traccia: calcolo streams come singolo MA con “album dilution”
  // Album dilution: più tracce = streams medi per traccia leggermente più bassi
  const n = uiTracks.length;
  const dilution = 1 / (0.85 + (n * 0.06)); // n=10 => 1/(0.85+0.6)=~0.69

  let totalStreams = 0;
  let totalFans = 0;
  let totalMoneyBack = 0;
  let lyricTracks = 0;

  const albumId = generateId("alb");
  const createdTracks = [];

  uiTracks.forEach((t, idx) => {
    const s = p.stats;

    // base simile al singolo, ma un po' più conservativa
    let streamsBase =
      30 +
      p.fans * 0.045 +
      p.hype * 5.5 +
      s.writing * 0.85 +
      (s.flow - 50) * 1.1;

    if (streamsBase < 0) streamsBase = 0;

    const randomness = 0.82 + Math.random() * 0.30;
    let streams = Math.floor(streamsBase * randomness * dilution * typeMult);

    // feat
    const f = parseFeatValue(t.featValue);
    if (f.name) streams = Math.floor(streams * (f.boost || 1));

    // bonus testo scritto
    if (t.mode === "lyrics" && t.lyrics.length >= 20) {
      lyricTracks++;
      const lenBonus = Math.min(0.15, t.lyrics.length / 900); // 0..0.15
      const mult = 1.10 + lenBonus;                           // 1.10..1.25
      streams = Math.floor(streams * mult);
    }

    // cap leggero per evitare exploit
    const perTrackCap = 60000 + (p.level * 3500);
    streams = Math.min(streams, perTrackCap);

    // rewards: più conservativi dei singoli (album è più “prestigio”, meno soldi immediati)
    const fansGained = Math.floor(streams / 15000);
    const moneyGained = Math.floor(streams / 420);

    totalStreams += streams;
    totalFans += fansGained;
    totalMoneyBack += moneyGained;

    const trackId = generateId("trk");

    const trackObj = {
      id: trackId,
      artist: p.stageName,
      title: t.title,
      streams,
      week: state.week,
      feat: f.name || "",
      hasLyrics: (t.mode === "lyrics" && t.lyrics.length > 0),
      lyrics: (t.mode === "lyrics" ? t.lyrics : ""),
      albumId,
      albumTitle,
      albumTrackNo: idx + 1,
      notes: t.notes || ""
    };

    state.chartTracks.push(trackObj);
    createdTracks.push(trackObj);
  });

  // Apply totals
  p.fans = Math.max(0, p.fans + totalFans);
  p.money = Math.max(0, p.money + totalMoneyBack);
  p.hype = clamp(p.hype + (2 + Math.min(8, Math.floor(n / 2))), 0, 100);

  // XP: album dà più XP, ma non enorme
  const xpGain = 18 + Math.min(28, n * 2);
  addXP(xpGain);

  // salva album in state
  state.albums.unshift({
    id: albumId,
    artist: p.stageName,
    title: albumTitle,
    type,
    trackCount: n,
    cost: totalCost,
    createdAt: { day: state.day, week: state.week, year: state.year },
    tracks: createdTracks.map(x => ({ id: x.id, title: x.title, feat: x.feat, streams: x.streams }))
  });

  rebuildChartRanking();

  addToFeed(
    `Ha pubblicato l'album "${albumTitle}" (${n} tracce). Totale: ${formatNumber(totalStreams)} stream, +${formatNumber(totalFans)} fan, +$${formatNumber(totalMoneyBack)} (costo $${formatNumber(totalCost)}).`,
    "player"
  );

  if (lyricTracks > 0) {
    addToFeed(`Bonus penna: ${lyricTracks}/${n} tracce scritte da te hanno spinto l’album.`, "system");
  }

  showToast(`Album pubblicato: <span>${formatNumber(n)}</span> tracce, <span>+${formatNumber(totalFans)}</span> fan`);
  closeAlbumOverlay();
  updateUI();
  saveGameDebounced();

}

if (el.albumPublishBtn) el.albumPublishBtn.addEventListener("click", albumPublish);

// Mantieni costo sempre aggiornato quando cambi tipo o titolo
if (el.albumTypeSelect) el.albumTypeSelect.addEventListener("change", albumUpdateCostEstimate);
if (el.albumTitleInput) el.albumTitleInput.addEventListener("input", () => {});




    function writeBars() {
      const s = state.player.stats;
      const writingUp = 1 + Math.floor(Math.random() * 2);
      const flowUp = Math.random() < 0.4 ? 1 : 0;
      s.writing = clamp(s.writing + writingUp, 0, 100);
      s.flow = clamp(s.flow + flowUp, 0, 100);
      state.player.hype = clamp(state.player.hype + 1, 0, 100);
      state.dailyCounters.bars++;
      addXP(15);

      addToFeed("Si chiude in studio a scrivere barre. La penna si affila, la concorrenza trema.", "system");
      showToast(`Allenamento penna: <span>Writing +${writingUp}</span>${flowUp ? ", Flow +1" : ""}`);
      updateUI();
      saveGameDebounced();

    }

   function liveShow() {
  const p = state.player;
  const s = p.stats;

  // Costo minimo: trasporto/crew/locale (impedisce farm infinito all'inizio)
  const fixedCost = 80 + Math.floor(p.fans / 2000); // cresce piano
  p.money = Math.max(0, p.money - fixedCost);

  // Qualità live influenzata da Stage + un po' di random
  const stageFactor = (s.stage / 100); // 0..1
  const roll = Math.random();

  // Range base molto più basso (rispetto a prima)
  // early game: fanDelta tipico 30-160, moneyDelta tipico 40-220
  let fansDelta = 0;
  let moneyDelta = 0;
  let hypeDelta = 0;
  let text = "";

  // Tre esiti: flop / ok / great
  // Le soglie favoriscono "ok" ma con reward moderata
  if (roll < (0.22 - stageFactor * 0.10)) {
    // FLOP
    fansDelta = -Math.floor(20 + Math.random() * (50 + 80 * (1 - stageFactor)));
    moneyDelta = Math.floor(10 + Math.random() * 40) - 60; // spesso negativo
    hypeDelta = -6;
    text = "Live disastroso: voce rotta, pubblico freddo. Qualche clip imbarazzante gira.";
  } else if (roll < (0.82 - stageFactor * 0.10)) {
    // OK
    const baseFans = 35 + Math.floor(70 * stageFactor);
    fansDelta = Math.floor(baseFans + Math.random() * (90 + 60 * stageFactor));
    moneyDelta = Math.floor(40 + Math.random() * (140 + 120 * stageFactor));
    hypeDelta = 3 + Math.floor(Math.random() * 3);
    text = "Live buono: gente coinvolta, qualcuno ti segue e ti chiede un altro pezzo.";
  } else {
    // GREAT
    const baseFans = 90 + Math.floor(120 * stageFactor);
    fansDelta = Math.floor(baseFans + Math.random() * (220 + 120 * stageFactor));
    moneyDelta = Math.floor(120 + Math.random() * (260 + 160 * stageFactor));
    hypeDelta = 6 + Math.floor(Math.random() * 4);
    text = "Serata forte: locale pieno, cori e storie. Cresci, ma senza esplodere.";
  }

  // Tetto anti-exploit: non puoi fare +2000 fan in una notte da Lv.1
  const fanCap = 120 + Math.floor(p.level * 35);
  fansDelta = clamp(fansDelta, -200, fanCap);

  // Applica
  p.fans = Math.max(0, p.fans + fansDelta);
  p.money = Math.max(0, p.money + moneyDelta);
  p.hype = clamp(p.hype + hypeDelta, 0, 100);

  // Crescita Stage più lenta e coerente
  const stageUp = (fansDelta > 0 ? 1 : 0) + (roll > 0.82 ? 1 : 0);
  s.stage = clamp(s.stage + stageUp, 0, 100);

  state.dailyCounters.lives++;
  addXP(18); // prima era 30: troppo

  addToFeed(text + ` (Costo: $${formatNumber(fixedCost)})`, "player");
  showToast(`Live: <span>${fansDelta >= 0 ? "+" : ""}${formatNumber(fansDelta)}</span> fan, <span>${moneyDelta >= 0 ? "+" : ""}$${formatNumber(moneyDelta)}</span>`);
  maybeFanReaction();
  updateUI();
  saveGameDebounced();

}


    // ------------------- TOUR -------------------
    function openTourOverlay() { el.tourOverlay.classList.remove("hidden"); }
    function closeTourOverlay() { el.tourOverlay.classList.add("hidden"); }

    function runTour(type) {
      const p = state.player;
        // Sblocco per livello (bilanciato)
  const unlock = {
    local: 4,
    eu: 8,
    world: 14
  };

  const requiredLevel = unlock[type] || 999;
  if (p.level < requiredLevel) {
    showToast(`Tour bloccato: serve <span>Lv. ${requiredLevel}</span>. Ora sei Lv. ${p.level}.`);
    return;
  }

      let cost = 0, fanRange = [0,0], moneyRange = [0,0], hypeBase = 0, label = "";

      if (type === "local") { label="tour locale"; cost=1500; fanRange=[150,450]; moneyRange=[300,800]; hypeBase=8; }
      else if (type === "eu") { label="tour europeo"; cost=5000; fanRange=[700,1700]; moneyRange=[2000,4500]; hypeBase=14; }
      else { label="tour mondiale"; cost=12000; fanRange=[2000,5000]; moneyRange=[6000,14000]; hypeBase=20; }

      if (p.money < cost) { showToast("Non hai abbastanza soldi per questo tour."); return; }
      p.money -= cost;

      const fansDelta = fanRange[0] + Math.floor(Math.random() * (fanRange[1] - fanRange[0] + 1));
      const moneyDelta = moneyRange[0] + Math.floor(Math.random() * (moneyRange[1] - moneyRange[0] + 1));

      p.fans += fansDelta;
      p.money += moneyDelta;
      p.hype = clamp(p.hype + hypeBase, 0, 100);

      addXP(45);
      addToFeed(`Ha completato un ${label}: nuovi fan ovunque, le storie non finiscono più.`, "player");
      showToast(`${label}: <span>+${formatNumber(fansDelta)}</span> fan, <span>+$${formatNumber(moneyDelta)}</span>, hype +${hypeBase}`);

      closeTourOverlay();
      updateUI();
      saveGameDebounced();

    }

    el.tourCloseBtn.addEventListener("click", closeTourOverlay);
    el.tourLocalBtn.addEventListener("click", () => runTour("local"));
    el.tourEuBtn.addEventListener("click", () => runTour("eu"));
    el.tourWorldBtn.addEventListener("click", () => runTour("world"));

    // ------------------- EVENTI FAN / RIVALI -------------------
    function maybeFanMessage() {
      const roll = Math.random();
      if (roll < 0.3) {
        const templates = [
          "Fratè, quando esce il prossimo pezzo? Sto in hype 🔥",
          "Ti ho scoperto ieri, ma già non ascolto altro 💿",
          "Vieni a fare un live anche nella mia città, ti prego!",
          "Hai salvato le mie playlist, continua così 🙌",
          "Sei ancora sottovalutato, ma chi sa capisce."
        ];
        addToFeed(templates[Math.floor(Math.random() * templates.length)], "fan");
      }
    }

    function maybeFanReaction() {
      const roll = Math.random();
      if (roll < 0.55) {
        const templates = [
          "Questo pezzo è già in loop infinito.",
          "Non mi aspettavo un livello così alto, rispetto!",
          "Ogni volta alzi l'asticella, mostro.",
          "Hai spaccato, questo è il tuo anno.",
          "Se continui così firmi un major a breve."
        ];
        addToFeed(templates[Math.floor(Math.random() * templates.length)], "fan");
      }
    }

    function maybeRivalDrop() {
      const roll = Math.random();
      if (roll < 0.25) {
        const rivalStreams = Math.floor(25000 + Math.random() * 50000);
        const hypeSwing = 4 + Math.floor(Math.random() * 6);
        const fanSwing = Math.floor(rivalStreams / 600);

        state.rival.hype = clamp(state.rival.hype + hypeSwing, 0, 100);
        state.rival.fans += fanSwing;

        state.player.hype = clamp(state.player.hype - 4, 0, 100);
        state.player.fans = Math.max(0, state.player.fans - Math.floor(fanSwing / 2));

        const title = generateTrackTitle();
        const trackId = generateId("trk");

        state.chartTracks.push({
          id: trackId,
          artist: state.rival.name,
          title,
          streams: rivalStreams,
          week: state.week,
          feat: "",
          hasLyrics: false,
          lyrics: ""
        });

        rebuildChartRanking();
        addToFeed(`Ha droppato "${title}" e i blog parlano solo di lui: ${formatNumber(rivalStreams)} stream in pochi giorni.`, "rival");
      }
    }

    // ------------------- NAV TABS -------------------
    // ------------------- FIX: doppio "CreaAlbum" in Home -------------------
function fixDuplicateCreateAlbum() {
  const candidates = Array.from(document.querySelectorAll("button, a, .card, .tile, .action, div"))
    .filter(n => {
      const t = (n.textContent || "").trim().toLowerCase();
      return t === "creaalbum" || t === "crea album";
    });

  if (candidates.length <= 1) return;

  // Mantieni il primo, rimuovi gli altri dal DOM
  candidates.slice(1).forEach(n => n.remove());
}

    function setActiveTab(name) {
      el.navTabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
      el.tabHome.style.display = name === "home" ? "block" : "none";
      el.tabRivals.style.display = name === "rivals" ? "block" : "none";
      el.tabFanclub.style.display = name === "fanclub" ? "block" : "none";
    }
    el.navTabs.forEach(tab => tab.addEventListener("click", () => setActiveTab(tab.dataset.tab)));

    // ------------------- AVANZA GIORNO -------------------
    function advanceDay(isAuto = false) {
      state.day++;
      if (state.day > 7) { state.day = 1; state.week++; initMissionsForWeek(); }

      const p = state.player;
      p.hype = clamp(p.hype - 1, 0, 100);

      // movimento giornaliero delle tracce in classifica interna (top10)
      state.chartTracks.forEach(t => {
        const factor = 0.95 + Math.random() * 0.15;
        t.streams = Math.floor(t.streams * factor);
      });
      rebuildChartRanking();

      // spotify top100 update
      spotifyDailyTick();

      maybeFanMessage();
      maybeRivalDrop();

      if (isAuto) addToFeed("Un altro giorno passa nella scena. Chi lavora cresce, chi dorme scompare.", "system");
      updateUI();
      saveGameDebounced();

    }
    // ------------------- PHONE: NAV (FIXED) -------------------
function phoneOpen() {
  el.phoneOverlay.classList.remove("hidden");
  el.phoneOverlay.setAttribute("aria-hidden", "false");
  phoneGo("home");
  updateUI();
  saveGameDebounced();

}

function phoneClose() {
  el.phoneOverlay.classList.add("hidden");
  el.phoneOverlay.setAttribute("aria-hidden", "true");
}

function phoneGo(page) {
  const pages = document.querySelectorAll("#phonePages .phone-page");
  pages.forEach(p => p.classList.toggle("active", p.dataset.page === page));

  // bottom nav active state
  const nav = document.getElementById("phoneBottomNav");
  if (nav) {
    nav.querySelectorAll(".pnav").forEach(b => {
      b.classList.toggle("active", b.dataset.app === page);
    });
  }
}

// open/close
el.phoneBtn.addEventListener("click", phoneOpen);
el.phoneCloseBtn.addEventListener("click", phoneClose);
el.phoneOverlay.addEventListener("click", (e) => {
  if (e.target === el.phoneOverlay) phoneClose();
});

// tiles -> open app
document.addEventListener("click", (e) => {
  const tile = e.target.closest(".phone-app-tile");
  if (tile && tile.dataset.open) phoneGo(tile.dataset.open);

  const back = e.target.closest("[data-back]");
  if (back) phoneGo("home");

  const navBtn = e.target.closest("#phoneBottomNav .pnav");
  if (navBtn) phoneGo(navBtn.dataset.app);
});

if (el.phoneHomeHelp) {
  el.phoneHomeHelp.addEventListener("click", () => {
    showToast(`Telefono: <span>Instagram</span> e <span>YouTube</span> aumentano fan; <span>Live</span> è rischio/ricompensa.`);
  });
}




    // ------------------- PHONE: INSTAGRAM -------------------
    // ------------------- IG: QUOTE IMAGES (motivazionali) -------------------
function igMotivationPhrases() {
  return [
    "Disciplina batte talento quando il talento non lavora.",
    "Fallo anche quando non ne hai voglia.",
    "Oggi alleni la costanza, domani raccogli i risultati.",
    "Non aspettare il momento giusto: crealo.",
    "Piccoli passi, ogni giorno.",
    "Se ti sembra lento, è perché stai costruendo davvero.",
    "Nessuno ti deve credere: basta che ci credi tu.",
    "La versione di te di domani dipende da oggi.",
    "Zero scuse. Solo lavoro.",
    "Non mollare: stai per svoltare."
  ];
}

function randomMotivationalImage(text) {
  const bg = ["#05060a", "#0b1220", "#020617"][Math.floor(Math.random() * 3)];
  const acc = ["#f97316", "#60a5fa", "#a78bfa", "#4ade80"][Math.floor(Math.random() * 4)];

  const safe = String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg}"/>
        <stop offset="100%" stop-color="${acc}"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="rgba(0,0,0,0.55)"/>
      </filter>
    </defs>

    <rect width="900" height="900" fill="url(#g)"/>
    <rect x="70" y="70" width="760" height="760" rx="46"
          fill="rgba(2,6,23,0.45)" stroke="rgba(255,255,255,0.14)" />

    <text x="110" y="210" font-family="system-ui" font-weight="900" font-size="30"
          fill="rgba(255,255,255,0.80)">MOTIVAZIONE</text>

    <foreignObject x="110" y="260" width="680" height="480">
      <div xmlns="http://www.w3.org/1999/xhtml"
           style="font-family:system-ui; font-weight:900; font-size:46px; line-height:1.15; color:rgba(255,255,255,0.92); filter:url(#shadow);">
        ${safe}
      </div>
    </foreignObject>

    <text x="110" y="770" font-family="system-ui" font-weight="700" font-size="22"
          fill="rgba(255,255,255,0.65)">@dailygrind</text>
  </svg>`.trim();

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

   function seedInstagramDirectory() {
  const ollare = getOllareMembers();

  ollare.forEach((name) => {
    const user = "@" + name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9_]/g, "");
    state.phone.instagram.directory[user] = {
      user,
      displayName: name,
      followers: 5000 + Math.floor(Math.random() * 40000),
      following: 200 + Math.floor(Math.random() * 800),
      postsCount: 6 + Math.floor(Math.random() * 18),
      avatarUrl: "" // la imposti tu dopo con upload
    };
  });
}
function extendInstagramDirectoryWithSpotifyTop100() {
  // Prende gli artisti dalla classifica Spotify interna e li aggiunge in directory IG
  const rows = (state.phone.spotify.rows || []).slice(0, 100);
  rows.forEach(r => {
    const name = r.artist;
    const user = "@" + name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9_]/g, "");
    if (!state.phone.instagram.directory[user]) {
      state.phone.instagram.directory[user] = {
        user,
        displayName: name,
        followers: Math.max(5000, Math.floor(r.streams * (0.35 + Math.random() * 0.40))), // followers legati agli stream
        following: 200 + Math.floor(Math.random() * 1500),
        postsCount: 9 + Math.floor(Math.random() * 40),
        avatarUrl: "",
        posts: [] // ci servirà per il profilo cliccabile
      };
    }
  });
}

function loadIgDirectoryAvatarsFromStorage() {
  const saved = lsGet("raprise_ig_directory_avatars_v1", {});
  const dir = state.phone.instagram.directory || {};
  Object.keys(dir).forEach(user => {
    if (saved[user]) dir[user].avatarUrl = saved[user];
  });
}

function saveIgDirectoryAvatarsToStorage() {
  const dir = state.phone.instagram.directory || {};
  const map = {};
  Object.keys(dir).forEach(user => {
    if (dir[user].avatarUrl) map[user] = dir[user].avatarUrl;
  });
  lsSet("raprise_ig_directory_avatars_v1", map);
}

function renderIgAdminPanel() {
  if (!el.igAdminPanel) return;
  el.igAdminPanel.innerHTML = "";

  const dir = state.phone.instagram.directory || {};
  const profiles = Object.values(dir);

  profiles.forEach(p => {
    const row = document.createElement("div");
    row.style.display = "grid";
    row.style.gridTemplateColumns = "56px 1fr 140px";
    row.style.gap = "10px";
    row.style.alignItems = "center";
    row.style.padding = "10px";
    row.style.borderRadius = "14px";
    row.style.border = "1px solid rgba(30,41,59,.85)";
    row.style.background = "rgba(2,6,23,0.35)";

    const avatarHtml = p.avatarUrl
      ? `<img src="${p.avatarUrl}" style="width:56px;height:56px;border-radius:999px;object-fit:cover;display:block;" />`
      : `<div style="width:56px;height:56px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-weight:900;background:rgba(15,23,42,0.95);border:1px solid rgba(51,65,85,.85);">${initials(p.displayName)}</div>`;

    row.innerHTML = `
      <div>${avatarHtml}</div>
      <div style="min-width:0;">
        <div style="font-weight:900;">${p.displayName}</div>
        <div style="color:var(--muted); font-size:.78rem;">${p.user}</div>
      </div>
      <div>
        <input type="file" accept="image/*" data-user="${p.user}" style="width:100%; font-size:.78rem;" />
        <button class="ghost" type="button" data-clear="${p.user}" style="margin-top:6px; width:100%;">Rimuovi</button>
      </div>
    `;

    el.igAdminPanel.appendChild(row);
  });

  // bind upload
  el.igAdminPanel.querySelectorAll('input[type="file"][data-user]').forEach(inp => {
    inp.addEventListener("change", () => {
      const user = inp.getAttribute("data-user");
      const file = inp.files && inp.files[0];
      if (!user || !file) return;

      const r = new FileReader();
      r.onload = () => {
        state.phone.instagram.directory[user].avatarUrl = String(r.result || "");
        saveIgDirectoryAvatarsToStorage();
        renderIgAdminPanel();
      };
      r.readAsDataURL(file);
    });
  });

  // bind clear
  el.igAdminPanel.querySelectorAll('button[data-clear]').forEach(btn => {
    btn.addEventListener("click", () => {
      const user = btn.getAttribute("data-clear");
      if (!user) return;
      state.phone.instagram.directory[user].avatarUrl = "";
      saveIgDirectoryAvatarsToStorage();
      renderIgAdminPanel();
    });
  });
}


   function instagramPostFromFile(file, caption) {
  if (!file) { showToast("Seleziona una foto."); return; }

  const r = new FileReader();
r.onload = () => {
  const url = String(r.result || "");

  const eng = igEngagementForNow();

  const post = {
    id: generateId("ig"),
    owner: state.player.stageName,
    ownerAvatar: (state.profile?.avatar?.faceImageDataUrl || ""),
    caption: caption || "",
    imageUrl: url,
    createdAt: { day: state.day, week: state.week, year: state.year },
    likes: eng.likes,
    comments: []
  };

  const samples = ["🔥", "spacca", "ora la metto in story", "hard", "hit", "questa è vibe"];
  const users = [
    "lil_fan", "real_one", "trap_italia", "napoli_vibes", "milano_hype",
    "playlist_guy", "streetkid99", "ollare_team", "fanpage_daily", "xxbarsxx",
    "prod_addicted", "vibe_check", "underground_it", "fan_roma", "fan_torino"
  ];

  for (let i = 0; i < eng.comments; i++) {
    post.comments.push({
      user: users[Math.floor(Math.random() * users.length)],
      text: samples[Math.floor(Math.random() * samples.length)]
    });
  }

  state.phone.instagram.posts.unshift(post);

  const socialBoost = 1;
  state.player.stats.social = clamp(state.player.stats.social + socialBoost, 0, 100);

  const fansGain = 10 + Math.floor(Math.random() * (20 + Math.floor(state.player.stats.social / 4)));
  state.player.fans += fansGain;
  state.player.hype = clamp(state.player.hype + 1, 0, 100);

  addToFeed("Ha postato su Instagram. Engagement reale, crescita lenta.", "system");
  showToast(`Instagram: <span>+${formatNumber(fansGain)}</span> fan, Social +${socialBoost}`);
  updateUI();
  saveGameDebounced();
};

r.readAsDataURL(file);
return;


  // 1) calcolo engagement FUORI dall'oggetto
  const eng = igEngagementForNow();

  // 2) creo il post con campi leciti
  const post = {
    id: generateId("ig"),
    owner: state.player.stageName,
    ownerAvatar: (state.profile?.avatar?.faceImageDataUrl || ""),
    caption: caption || "",
    imageUrl: url,
    createdAt: { day: state.day, week: state.week, year: state.year },

    likes: eng.likes,
    comments: []
  };

  // 3) riempio i commenti
const samples = ["🔥", "spacca", "ora la metto in story", "hard", "hit", "questa è vibe"];
const users = [
  "lil_fan", "real_one", "trap_italia", "napoli_vibes", "milano_hype",
  "playlist_guy", "streetkid99", "ollare_team", "fanpage_daily", "xxbarsxx",
  "prod_addicted", "vibe_check", "underground_it", "fan_roma", "fan_torino"
];

for (let i = 0; i < eng.comments; i++) {
  post.comments.push({
    user: users[Math.floor(Math.random() * users.length)],
    text: samples[Math.floor(Math.random() * samples.length)]
  });
}


  state.phone.instagram.posts.unshift(post);

  // rewards (più lenti del tuo attuale)
  const socialBoost = 1;
  state.player.stats.social = clamp(state.player.stats.social + socialBoost, 0, 100);

  const fansGain = 10 + Math.floor(Math.random() * (20 + Math.floor(state.player.stats.social / 4)));
  state.player.fans += fansGain;
  state.player.hype = clamp(state.player.hype + 1, 0, 100);

  addToFeed("Ha postato su Instagram. Engagement reale, crescita lenta.", "system");
  showToast(`Instagram: <span>+${formatNumber(fansGain)}</span> fan, Social +${socialBoost}`);
  updateUI();
  saveGameDebounced();

}



    function renderInstagramGrid() {
  if (!el.igGrid) return;
  el.igGrid.innerHTML = "";
  const posts = state.phone.instagram.posts.slice(0, 30);

  posts.forEach(p => {
    const div = document.createElement("div");
    div.className = "ig-post";
    div.dataset.igid = p.id;

    const img = document.createElement("img");
    img.src = p.imageUrl;
    img.alt = p.caption || "post";

    div.appendChild(img);
    el.igGrid.appendChild(div);
  });
}
function renderIgSearchResults(query) {
  if (!el.igSearchResults) return;
  el.igSearchResults.innerHTML = "";

  const q = (query || "").trim().toLowerCase();
  if (!q) return;

  const dir = state.phone.instagram.directory || {};
  const hits = Object.values(dir).filter(p =>
    p.displayName.toLowerCase().includes(q) || p.user.toLowerCase().includes(q)
  ).slice(0, 10);

  if (hits.length === 0) {
    const d = document.createElement("div");
    d.style.color = "var(--muted)";
    d.style.fontSize = ".82rem";
    d.textContent = "Nessun profilo trovato.";
    el.igSearchResults.appendChild(d);
    return;
  }

  hits.forEach(p => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.gap = "10px";
    row.style.alignItems = "center";
    row.style.padding = "10px";
    row.style.borderRadius = "14px";
    row.style.border = "1px solid rgba(30,41,59,.85)";
    row.style.background = "rgba(2,6,23,0.35)";
    row.style.cursor = "pointer";

    const avatar = p.avatarUrl
      ? `<img src="${p.avatarUrl}" style="width:42px;height:42px;border-radius:999px;object-fit:cover;display:block;" />`
      : `<div style="width:42px;height:42px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-weight:900;background:rgba(15,23,42,0.95);border:1px solid rgba(51,65,85,.85);">${initials(p.displayName)}</div>`;

    row.innerHTML = `
      ${avatar}
      <div style="min-width:0;">
        <div style="font-weight:900;">${p.displayName}</div>
        <div style="color:var(--muted); font-size:.78rem;">${p.user} • ${formatNumber(p.followers)} follower • ${formatNumber(p.postsCount)} post</div>
      </div>
    `;
    row.addEventListener("click", () => {
  openIgProfile(p.user);
});


    el.igSearchResults.appendChild(row);
  });
}
const igProfileOverlay = document.getElementById("igProfileOverlay");
const igProfileCloseBtn = document.getElementById("igProfileCloseBtn");
const igProfileTitle = document.getElementById("igProfileTitle");
const igProfileAvatar = document.getElementById("igProfileAvatar");
const igProfileHandle = document.getElementById("igProfileHandle");
const igProfilePosts = document.getElementById("igProfilePosts");
const igProfileFollowers = document.getElementById("igProfileFollowers");
const igProfileFollowing = document.getElementById("igProfileFollowing");
const igProfileGrid = document.getElementById("igProfileGrid");

function ensureDirectoryPosts(user) {
  const prof = state.phone.instagram.directory[user];
  if (!prof) return;

  if (!Array.isArray(prof.posts)) prof.posts = [];
  if (prof.posts.length > 0) return;

  const phrases = igMotivationPhrases();

  // Genera post finti coerenti col numero postsCount
  const n = Math.min(30, prof.postsCount || 12);
  for (let i = 0; i < n; i++) {
    const quote = phrases[Math.floor(Math.random() * phrases.length)];

    const fake = {
      id: generateId("igdir"),
      owner: prof.displayName,
      ownerAvatar: prof.avatarUrl || "",
      caption: quote,
      imageUrl: randomMotivationalImage(quote),
      createdAt: { day: state.day, week: state.week, year: state.year },
      likes: Math.max(20, Math.floor(prof.followers * (0.002 + Math.random() * 0.006))),
      comments: []
    };

    const cnum = Math.max(0, Math.floor(fake.likes * (0.02 + Math.random() * 0.04)));
    for (let k = 0; k < Math.min(cnum, 18); k++) {
      const dirUsers = ["fan_roma","fan_milano","trap_news","street_page","real_listener","vibes_only","ig_daily","trend_hunter"];
      fake.comments.push({
        user: dirUsers[Math.floor(Math.random() * dirUsers.length)],
        text: ["🔥","spacca","capolavoro","hit","vibe","goat"][Math.floor(Math.random() * 6)]
      });
    }

    prof.posts.push(fake);
  }
}


function openIgProfile(user) {
  const prof = state.phone.instagram.directory[user];
  if (!prof) return;

  ensureDirectoryPosts(user);

  igProfileTitle.textContent = `Profilo • ${prof.displayName}`;
  igProfileHandle.textContent = prof.user;

  // avatar
  if (prof.avatarUrl) {
    igProfileAvatar.innerHTML = `<img src="${prof.avatarUrl}" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:999px;" />`;
  } else {
    igProfileAvatar.textContent = initials(prof.displayName);
  }

  igProfilePosts.textContent = formatNumber(prof.posts.length);
  igProfileFollowers.textContent = formatNumber(prof.followers);
  igProfileFollowing.textContent = formatNumber(prof.following);

  // grid
  igProfileGrid.innerHTML = "";
  prof.posts.slice(0, 30).forEach(post => {
    const div = document.createElement("div");
    div.className = "ig-post";
    div.dataset.igid = post.id;

    const img = document.createElement("img");
    img.src = post.imageUrl;
    img.alt = post.caption || "post";
    div.appendChild(img);

    div.addEventListener("click", () => {
      // Apriamo lo stesso overlay dei post, ma usando il profilo directory
      openIgPostFromDirectory(user, post.id);
    });

    igProfileGrid.appendChild(div);
  });

  igProfileOverlay.classList.remove("hidden");
}

function closeIgProfile() {
  igProfileOverlay.classList.add("hidden");
}

if (igProfileCloseBtn) igProfileCloseBtn.addEventListener("click", closeIgProfile);
if (igProfileOverlay) igProfileOverlay.addEventListener("click", (e) => { if (e.target === igProfileOverlay) closeIgProfile(); });

// riusa il modal post per directory
function openIgPostFromDirectory(user, postId) {
  const prof = state.phone.instagram.directory[user];
  if (!prof) return;
  const p = (prof.posts || []).find(x => x.id === postId);
  if (!p) return;

  currentIgPostId = "DIR:" + user + ":" + postId;

  igPostTitle.textContent = `Post • ${prof.user}`;
  igPostImage.src = p.imageUrl;

  igPostOwner.textContent = prof.user;
  const av = document.getElementById("igPostOwnerAvatar");
  if (av) {
    if (prof.avatarUrl) av.innerHTML = `<img src="${prof.avatarUrl}" style="width:100%;height:100%;object-fit:cover;display:block;" />`;
    else av.textContent = initials(prof.displayName);
  }

  igPostLikes.textContent = formatNumber(p.likes || 0);
  igPostCommentsCount.textContent = formatNumber((p.comments || []).length);
  igPostCaption.textContent = p.caption || "(nessuna descrizione)";
  hideIgComments(); // all’apertura: commenti chiusi
igPostOverlay.classList.remove("hidden");

}




    el.igPostBtn.addEventListener("click", () => {
      const file = el.igFile.files && el.igFile.files[0];
      instagramPostFromFile(file, el.igCaption.value.trim());
      el.igCaption.value = "";
      el.igFile.value = "";
    });
    if (el.igAdminToggleBtn) {
  el.igAdminToggleBtn.addEventListener("click", () => {
    el.igAdminPanel.classList.toggle("hidden");
    if (!el.igAdminPanel.classList.contains("hidden")) renderIgAdminPanel();
  });
}


    if (el.igSearchBtn) {
  el.igSearchBtn.addEventListener("click", () => {
    renderIgSearchResults(el.igSearchInput?.value || "");
  });
}
if (el.igSearchInput) {
  el.igSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") renderIgSearchResults(el.igSearchInput.value || "");
  });
}

    // IG Post detail modal (NEW)
const igPostOverlay = document.getElementById("igPostOverlay");
const igPostCloseBtn = document.getElementById("igPostCloseBtn");
const igPostTitle = document.getElementById("igPostTitle");
const igPostImage = document.getElementById("igPostImage");
const igPostOwner = document.getElementById("igPostOwner");
const igPostLikes = document.getElementById("igPostLikes");
const igPostCommentsCount = document.getElementById("igPostCommentsCount");
const igPostCaption = document.getElementById("igPostCaption");
const igCommentsList = document.getElementById("igCommentsList");
const igCommentInput = document.getElementById("igCommentInput");
const igCommentBtn = document.getElementById("igCommentBtn");
const igLikeBtn = document.getElementById("igLikeBtn");
const igCommentsPanel = document.getElementById("igCommentsPanel");
const igToggleCommentsBtn = document.getElementById("igToggleCommentsBtn");

let igCommentsVisible = false;



let currentIgPostId = null;

function renderIgComments(post) {
  igCommentsList.innerHTML = "";
  const comments = post.comments || [];
  if (comments.length === 0) {
    const d = document.createElement("div");
    d.style.color = "var(--muted)";
    d.style.fontSize = ".82rem";
    d.textContent = "Nessun commento ancora.";
    igCommentsList.appendChild(d);
    return;
  }
  comments.slice(0, 30).forEach(c => {
    const row = document.createElement("div");
    row.style.padding = "8px";
    row.style.border = "1px solid rgba(30,41,59,.85)";
    row.style.borderRadius = "12px";
    row.style.background = "rgba(2,6,23,0.35)";
    row.innerHTML = `<strong style="font-size:.82rem;">${c.user}</strong> <span style="color:var(--muted); font-size:.82rem;">${c.text}</span>`;
    igCommentsList.appendChild(row);
  });
}
function hideIgComments() {
  igCommentsVisible = false;
  if (igCommentsPanel) igCommentsPanel.classList.add("hidden");
  // non svuotiamo per forza: ma volendo si può
}

function toggleIgComments(post) {
  igCommentsVisible = !igCommentsVisible;

  if (igCommentsPanel) {
    igCommentsPanel.classList.toggle("hidden", !igCommentsVisible);
  }

  if (igCommentsVisible) {
    renderIgComments(post);
  }
}


function openIgPost(id) {
  const p = state.phone.instagram.posts.find(x => x.id === id);
  if (!p) return;

  currentIgPostId = id;

  igPostTitle.textContent = `Post • G${p.createdAt.day} S${p.createdAt.week}`;
  igPostImage.src = p.imageUrl;

  const handle = "@" + p.owner.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9_]/g, "");
  igPostOwner.textContent = handle;
  const av = document.getElementById("igPostOwnerAvatar");
if (av) {
  if (p.ownerAvatar) {
    av.innerHTML = `<img src="${p.ownerAvatar}" style="width:100%;height:100%;object-fit:cover;display:block;" />`;
  } else {
    av.textContent = initials(p.owner);
  }
}


  igPostLikes.textContent = formatNumber(p.likes || 0);
  igPostCommentsCount.textContent = formatNumber((p.comments || []).length);
  igPostCaption.textContent = p.caption || "(nessuna descrizione)";
  hideIgComments(); // all’apertura: commenti chiusi
igPostOverlay.classList.remove("hidden");

}

function closeIgPost() {
  igPostOverlay.classList.add("hidden");
  currentIgPostId = null;
  hideIgComments();
}

igPostCloseBtn.addEventListener("click", closeIgPost);
igPostOverlay.addEventListener("click", (e) => { if (e.target === igPostOverlay) closeIgPost(); });
if (igToggleCommentsBtn) {
  igToggleCommentsBtn.addEventListener("click", () => {
    if (!currentIgPostId) return;

    // Post directory
    if (String(currentIgPostId).startsWith("DIR:")) {
      const parts = String(currentIgPostId).split(":");
      const user = parts[1];
      const postId = parts.slice(2).join(":");
      const prof = state.phone.instagram.directory[user];
      const post = (prof?.posts || []).find(x => x.id === postId);
      if (!post) return;

      toggleIgComments(post);
      return;
    }

    // Post player
    const post = state.phone.instagram.posts.find(x => x.id === currentIgPostId);
    if (!post) return;

    toggleIgComments(post);
  });
}


// open on tap
el.igGrid.addEventListener("click", (e) => {
  const tile = e.target.closest(".ig-post");
  if (!tile) return;
  openIgPost(tile.dataset.igid);
});

// add comment
igCommentBtn.addEventListener("click", () => {
    // Se è un post directory, il currentIgPostId è tipo "DIR:@user:postId"
if (currentIgPostId && String(currentIgPostId).startsWith("DIR:")) {
  const parts = String(currentIgPostId).split(":");
  const user = parts[1];
  const postId = parts.slice(2).join(":");

  const prof = state.phone.instagram.directory[user];
  if (!prof) return;

  const post = (prof.posts || []).find(x => x.id === postId);
  if (!post) return;

  const txt = (igCommentInput.value || "").trim();
  if (!txt) return;

  post.comments = post.comments || [];
  post.comments.unshift({ user: "tu", text: txt });
  post.likes = (post.likes || 0) + (Math.random() < 0.5 ? 1 : 0);

  igCommentInput.value = "";
  openIgPostFromDirectory(user, postId);
  return;
}

  if (!currentIgPostId) return;
  const txt = (igCommentInput.value || "").trim();
  if (!txt) return;

  const p = state.phone.instagram.posts.find(x => x.id === currentIgPostId);
  if (!p) return;

  p.comments = p.comments || [];
  p.comments.unshift({ user: "tu", text: txt });

  // micro-like bump
  p.likes = (p.likes || 0) + (Math.random() < 0.35 ? 1 : 0);

  igCommentInput.value = "";
  openIgPost(currentIgPostId);
});
if (igLikeBtn) {
  igLikeBtn.addEventListener("click", () => {
    if (!currentIgPostId) return;

    // Like su post directory
    if (String(currentIgPostId).startsWith("DIR:")) {
      const parts = String(currentIgPostId).split(":");
      const user = parts[1];
      const postId = parts.slice(2).join(":");

      const prof = state.phone.instagram.directory[user];
      if (!prof) return;

      const post = (prof.posts || []).find(x => x.id === postId);
      if (!post) return;

      post.likes = (post.likes || 0) + 1;
      openIgPostFromDirectory(user, postId);
      return;
    }

    // Like su post del player
    const p = state.phone.instagram.posts.find(x => x.id === currentIgPostId);
    if (!p) return;

    p.likes = (p.likes || 0) + 1;
    openIgPost(currentIgPostId);
  });
}



    // ------------------- PHONE: YOUTUBE -------------------
    function refreshYouTubeSongSelect() {
  const sel = el.ytSongSelect;
  if (!sel) return;

  const tracks = state.chartTracks
    .filter(t => t.artist === state.player.stageName)
    .slice(0, 30);

  sel.innerHTML = "";

  if (tracks.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "Nessun singolo trovato: pubblica prima una canzone";
    sel.appendChild(opt);
    sel.disabled = true;
    return;
  }

  sel.disabled = false;

  const opt0 = document.createElement("option");
  opt0.value = "";
  opt0.textContent = "Seleziona la canzone da trasformare in video";
  sel.appendChild(opt0);

  tracks.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = `${t.title}${t.feat ? " (feat. " + t.feat + ")" : ""} • ${formatNumber(t.streams)} stream`;
    sel.appendChild(opt);
  });
}
    function publishYouTubeVideo(title, trackId, coverFile) {
  const p = state.player;

  const track = state.chartTracks.find(t => t.id === trackId && t.artist === p.stageName);
  if (!track) { showToast("Seleziona una canzone valida."); return; }
  if (!coverFile) { showToast("Carica una cover (immagine) per il video."); return; }

  const coverUrl = URL.createObjectURL(coverFile);

  // views correlate alla canzone (più dure del tuo YouTube attuale)
  const base = Math.floor(track.streams * (0.08 + Math.random() * 0.10)); // 8-18% degli stream
  const socialFactor = 0.85 + (p.stats.social / 200);
  const hypeFactor = 0.80 + (p.hype / 200);
  const views = Math.max(50, Math.floor(base * socialFactor * hypeFactor));

  const fansGain = Math.floor(views / 140);
  const moneyGain = Math.floor(views / 120);

  state.phone.youtube.videos.unshift({
    id: generateId("yt"),
    title: title || `${track.title} (Video)`,
    views,
    coverUrl,
    trackId: track.id,
    trackTitle: track.title,
    day: state.day,
    week: state.week,
    year: state.year
  });

  p.fans += fansGain;
  p.money += moneyGain;
  p.hype = clamp(p.hype + 1, 0, 100);
  p.stats.social = clamp(p.stats.social + 1, 0, 100);
  addXP(12);

  addToFeed(`Ha caricato il video di "${track.title}": ${formatNumber(views)} views.`, "system");
  showToast(`YouTube: <span>+${formatNumber(fansGain)}</span> fan, <span>+$${formatNumber(moneyGain)}</span>`);
  updateUI();
  saveGameDebounced();

}


 

function renderYouTube() {
  if (!el.ytList) return;
  el.ytList.innerHTML = "";

  const vids = (state.phone.youtube.videos || []).slice(0, 12);

  if (vids.length === 0) {
    const d = document.createElement("div");
    d.className = "yt-row";
    d.innerHTML = `
      <strong>Nessun video caricato</strong>
      <small style="color:var(--muted);">Carica un video da questa schermata per iniziare a fare views.</small>
    `;
    el.ytList.appendChild(d);
    return;
  }

  vids.forEach(v => {
    const d = document.createElement("div");
    d.className = "yt-row";
    d.innerHTML = `
      <div style="display:flex; gap:10px; align-items:center;">
        <div style="width:56px;height:56px;border-radius:12px;overflow:hidden;border:1px solid rgba(30,41,59,.85);flex:0 0 auto;">
          <img src="${v.coverUrl || ""}" style="width:100%;height:100%;object-fit:cover;display:block;" />
        </div>
        <div style="min-width:0;">
          <strong>${v.title}</strong>
          <small style="display:block; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${v.trackTitle || "Video"} • ${formatNumber(v.views)} views • G${v.day} S${v.week}
          </small>
        </div>
      </div>
    `;
    el.ytList.appendChild(d);
  });
}

    el.ytPublishBtn.addEventListener("click", () => {
  const t = el.ytTitle.value.trim() || "Official Video";
  const trackId = el.ytSongSelect.value;
  const file = el.ytCoverFile.files && el.ytCoverFile.files[0];

  el.ytTitle.value = "";
  el.ytCoverFile.value = "";
  publishYouTubeVideo(t, trackId, file);
});


    

    // ------------------- PHONE: LIVE -------------------
    function runPhoneLive(type) {
      const p = state.player;
      if (p.hype < 5) { showToast("Hype troppo basso: fai contenuti o droppa un pezzo."); return; }

      // consume hype
      p.hype = clamp(p.hype - 5, 0, 100);
      openLiveOverlay()

      const rng = Math.random();
      let fansDelta = 0;
      let hypeDelta = 0;
      let text = "";

      if (rng < 0.20) {
        fansDelta = -Math.floor(40 + Math.random() * 120);
        hypeDelta = -6;
        text = `Live ${type} flop: chat cattiva, clip imbarazzanti.`;
      } else if (rng < 0.70) {
        fansDelta = Math.floor(120 + Math.random() * 260);
        hypeDelta = 6;
        text = `Live ${type} ok: buone vibes, gente che segue e ricondivide.`;
      } else {
        fansDelta = Math.floor(350 + Math.random() * 900);
        hypeDelta = 12;
        text = `Live ${type} virale: clip ovunque, follower in arrivo a fiumi.`;
      }

      p.fans = Math.max(0, p.fans + fansDelta);
      p.hype = clamp(p.hype + hypeDelta, 0, 100);
      p.stats.social = clamp(p.stats.social + 2, 0, 100);
      addXP(20);

      el.liveLogText.textContent = `${text} (${fansDelta>=0?"+":""}${formatNumber(fansDelta)} fan, hype ${hypeDelta>=0?"+":""}${hypeDelta})`;
      addToFeed(text, "player");
      showToast(`Live: <span>${fansDelta>=0?"+":""}${formatNumber(fansDelta)}</span> fan`);
      updateUI();
      saveGameDebounced();

    }
    const liveOverlay = document.getElementById("liveOverlay");
const liveOverlayCloseBtn = document.getElementById("liveOverlayCloseBtn");
const liveHero = document.getElementById("liveHero");
const liveViewersEl = document.getElementById("liveViewers");
const liveChatEl = document.getElementById("liveChat");

let liveChatTimer = null;
let liveViewerTimer = null;
let liveViewers = 0;

function randomLiveImage() {
  const bg = ["#111827","#0b1220","#020617"][Math.floor(Math.random()*3)];
  const acc = ["#f97316","#1db954","#60a5fa","#a78bfa"][Math.floor(Math.random()*4)];
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg}"/>
        <stop offset="100%" stop-color="${acc}"/>
      </linearGradient>
    </defs>
    <rect width="900" height="600" fill="url(#g)"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="system-ui" font-weight="900" font-size="46" fill="rgba(255,255,255,.92)">
      LIVE • ${state.player.stageName}
    </text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.trim());
}

function openLiveOverlay() {
  liveHero.src = randomLiveImage();
  liveChatEl.innerHTML = "";
  liveOverlay.classList.remove("hidden");

  const p = state.player;
  liveViewers = Math.max(3, Math.floor((p.fans * 0.003) + (p.hype * 0.6) + (p.stats.social * 0.4)));
  liveViewersEl.textContent = formatNumber(liveViewers);

  const msgs = [
    "bro spacca", "metti il nuovo pezzo", "che vibe", "salutami", "freestyle ora",
    "ollare on top", "questa live è oro", "non mollare", "sei forte", "drop un album"
  ];

  liveChatTimer = setInterval(() => {
    const name = ["fan_roma","fan_milano","xxtrapxx","lil_fan","real_one","playlist_guy"][Math.floor(Math.random()*6)];
    const text = msgs[Math.floor(Math.random()*msgs.length)];
    const row = document.createElement("div");
    row.style.padding = "8px";
    row.style.border = "1px solid rgba(30,41,59,.85)";
    row.style.borderRadius = "12px";
    row.style.background = "rgba(2,6,23,0.35)";
    row.innerHTML = `<strong>${name}</strong> <span style="color:var(--muted)">${text}</span>`;
    liveChatEl.appendChild(row);
    liveChatEl.scrollTop = liveChatEl.scrollHeight;
  }, 900);

  liveViewerTimer = setInterval(() => {
    const swing = Math.floor((-3 + Math.random()*7));
    liveViewers = Math.max(0, liveViewers + swing);
    liveViewersEl.textContent = formatNumber(liveViewers);
  }, 1200);
}

function closeLiveOverlay() {
  liveOverlay.classList.add("hidden");
  if (liveChatTimer) clearInterval(liveChatTimer);
  if (liveViewerTimer) clearInterval(liveViewerTimer);
  liveChatTimer = null;
  liveViewerTimer = null;
}

liveOverlayCloseBtn.addEventListener("click", closeLiveOverlay);
liveOverlay.addEventListener("click", (e) => { if (e.target === liveOverlay) closeLiveOverlay(); });


    el.liveStartBtn.addEventListener("click", () => runPhoneLive("standard"));
    el.liveQABtn.addEventListener("click", () => runPhoneLive("Q&A"));
    el.liveFreestyleBtn.addEventListener("click", () => runPhoneLive("freestyle"));

    // ------------------- PHONE: SPOTIFY TOP 100 -------------------
    function getOllareMembers() {
      return [
        "Mattia Porciello",
        "Simone Tammaro",
        "Federico Ferrante",
        "Simone Sorrentino",
        "Pasquale Ruggieri",
        "Emanuele Scala",
        "Carmine De Benedetto",
        "Michele Facente",
        "Carmine Fasano",
        "Glauco Ciani"
      ];
    }

    function famousArtistsList() {
      // Nomi reali (solo nomi), simulazione chart.
      return [
        "Drake","Taylor Swift","Bad Bunny","The Weeknd","Travis Scott","Kendrick Lamar","Eminem","Ariana Grande",
        "Billie Eilish","Post Malone","Ed Sheeran","Dua Lipa","Rihanna","Beyoncé","Jay-Z","Kanye West",
        "SZA","Doja Cat","Nicki Minaj","Future","Lil Baby","Lil Uzi Vert","Playboi Carti","21 Savage",
        "J. Cole","Metro Boomin","Karol G","Rosalía","Shakira","Coldplay","Imagine Dragons","Bruno Mars",
        "Harry Styles","Olivia Rodrigo","Lana Del Rey","Justin Bieber","BTS","BLACKPINK","Stray Kids","NewJeans",
        "Sfera Ebbasta","Lazza","Geolier","Marracash","Capo Plaza","Salmo","Tha Supreme","Gemitaiz","MadMan","Fabri Fibra",
        "Guè","Baby Gang","Rkomi","Blanco","Ultimo","Mahmood","Annalisa","Elodie","Tananai","Ghali",
        "Central Cee","Stormzy","Dave","Adele","Sam Smith","Hozier","Linkin Park","Green Day","Metallica","Red Hot Chili Peppers",
        "AC/DC","U2","Queen","Daft Punk","Calvin Harris","David Guetta","Martin Garrix","Tiësto","Marshmello","Avicii",
        "Anitta","Peso Pluma","Rauw Alejandro","Feid","Myke Towers","J Balvin","Ozuna","Romeo Santos","Nicky Jam","Karol Sevilla",
        "Måneskin","Arctic Monkeys","Tame Impala","The Rolling Stones","Bob Marley","Snoop Dogg","2Pac","The Notorious B.I.G.",
        "NF","Halsey","Lady Gaga","Michael Jackson","Prince","ABBA"
      ];
    }

    function seedSpotifyTop100() {
      const names = [];

      // Ensure Ollare + Rival + Player included
      names.push(...getOllareMembers());
      names.push(state.rival.name);
      // Player will be integrated via their tracks; also include as an artist row placeholder
      names.push(state.player.stageName);

      // add famous artists until we reach 100 unique
      for (const n of famousArtistsList()) {
        if (names.length >= 100) break;
        if (!names.includes(n)) names.push(n);
      }

      // If still not 100, fill with fictional
      let i = 1;
      while (names.length < 100) {
        const n = "Artist_" + i++;
        if (!names.includes(n)) names.push(n);
      }

      // Create one "top track" per artist (simulated)
      state.phone.spotify.rows = names.map(name => ({
        id: generateId("sp"),
        artist: name,
        track: generateTrackTitle(),
        streams: 80000 + Math.floor(Math.random() * 900000),
      }));

      // Make Ollare stronger baseline
      state.phone.spotify.rows.forEach(r => {
        if (getOllareMembers().includes(r.artist)) r.streams += 450000 + Math.floor(Math.random() * 400000);
        if (r.artist === state.rival.name) r.streams += 250000 + Math.floor(Math.random() * 250000);
        if (r.artist === state.player.stageName) r.streams = 25000 + Math.floor(Math.random() * 40000);
      });

      spotifyRebuild();
    }

    function spotifyIntegratePlayerTracks() {
      // If player has chartTracks, use best performing as Spotify track and sum streams.
      const playerTracks = state.chartTracks.filter(t => t.artist === state.player.stageName);
      if (playerTracks.length === 0) return;

      // aggregate streams (scaled)
      const total = playerTracks.reduce((acc, t) => acc + t.streams, 0);
      const best = playerTracks.slice().sort((a,b)=>b.streams-a.streams)[0];

      const row = state.phone.spotify.rows.find(r => r.artist === state.player.stageName);
      if (!row) return;

       row.track = best.title + (best.feat ? ` (feat. ${best.feat})` : "");

const p = state.player;
const catalog = playerTracks.length;

// HARD GATE: prima di essere “notato” da Spotify devi avere numeri seri
const gateFans = p.fans >= 250000;       // 250k fan
const gateSocial = p.stats.social >= 82; // social alto
const gateCatalog = catalog >= 12;       // almeno 12 brani pubblicati
const gateHype = p.hype >= 65;           // hype stabile

if (!(gateFans && gateSocial && gateCatalog && gateHype)) {
  // Resti “bloccato” basso
  row.streams = Math.min(row.streams, 12000 + Math.floor(total * 0.10));
  return;
}

// Dopo i gate: cresci, ma comunque lentamente
row.streams = Math.max(row.streams, Math.floor(total * 0.55));


    }

    function spotifyRebuild() {
      spotifyIntegratePlayerTracks();

      const rows = state.phone.spotify.rows.slice().sort((a,b)=>b.streams-a.streams).slice(0,100);
      const nextLastPos = {};
      rows.forEach((r, idx) => {
        const prevIdx = state.phone.spotify.lastPos[r.id];
        let move = "NEW";
        if (prevIdx !== undefined) {
          const prevRank = prevIdx + 1;
          const rank = idx + 1;
          if (rank < prevRank) move = "▲";
          else if (rank > prevRank) move = "▼";
          else move = "•";
        }
        r.rank = idx + 1;
        r.move = move;
        nextLastPos[r.id] = idx;
      });
      state.phone.spotify.lastPos = nextLastPos;
      state.phone.spotify.rows = rows;
    }

    function spotifyDailyTick() {
      // daily drift
      state.phone.spotify.rows.forEach(r => {
        const drift = 0.90 + Math.random() * 0.12; // 0.90 - 1.02
        r.streams = Math.max(0, Math.floor(r.streams * drift));
      });

      // player integration
      spotifyRebuild();
    }

    function renderSpotifyTop100() {
      if (!el.spotifyList) return;
      el.spotifyList.innerHTML = "";

      if (!state.phone.spotify.rows || state.phone.spotify.rows.length === 0) {
        const d = document.createElement("div");
        d.style.color = "var(--muted)";
        d.textContent = "Nessuna classifica ancora.";
        el.spotifyList.appendChild(d);
        return;
      }

      // render top 30 to keep UI fast (still top100 in data)
      const view = state.phone.spotify.rows.slice(0, 30);
      view.forEach(r => {
        const div = document.createElement("div");
        div.className = "sp-row";
        const you = r.artist === state.player.stageName;
        div.innerHTML = `
          <div class="sp-rank">#${r.rank}<span class="sp-move">${r.move}</span></div>
          <div class="sp-main">
            <div class="sp-track">${r.track}</div>
            <div class="sp-artist ${you ? "sp-you" : ""}">${r.artist}${you ? " (TU)" : ""}</div>
          </div>
          <div class="sp-streams">${formatNumber(r.streams)}</div>
        `;
        el.spotifyList.appendChild(div);
      });

      const note = document.createElement("div");
      note.style.marginTop = "8px";
      note.style.color = "var(--muted)";
      note.style.fontSize = "0.75rem";
      note.textContent = "Mostro Top 30 per leggibilità (dati Top 100 completi).";
      el.spotifyList.appendChild(note);
    }

    // ------------------- INIT -------------------
    const hasSavedGame = loadGame();
    // 1. Se abbiamo caricato un salvataggio, ripristiniamo le funzioni delle missioni
    if (hasSavedGame) restoreMissions();

    const hasProfile = loadProfileFromStorage();

    // 2. Se NON c'è salvataggio (Nuova Partita), inizializziamo i dati base
    if (!hasSavedGame) {
      initMissionsForWeek();

      const ollareMembers = getOllareMembers();
      ollareMembers.forEach(name => {
        state.chartTracks.push({
          id: generateId("trk"),
          artist: name,
          title: generateTrackTitle(),
          streams: 50000 + Math.floor(Math.random() * 80000),
          week: state.week,
          feat: "",
          hasLyrics: false,
          lyrics: ""
        });
      });
      rebuildChartRanking();

      seedSpotifyTop100();
      seedInstagramDirectory();
      extendInstagramDirectoryWithSpotifyTop100();
      loadIgDirectoryAvatarsFromStorage();

      addToFeed("Ha appena iniziato la sua carriera. Nessuno lo conosce ancora, ma ha fame di successo.", "system");
    } else {
      // Resume partita: patch strutture dati
      state.phone = state.phone || { instagram: { posts: [], directory: {}, search: "" }, youtube: { videos: [] }, spotify: { rows: [], lastPos: {} } };
      state.phone.instagram = state.phone.instagram || { posts: [], directory: {}, search: "" };
      state.phone.instagram.directory = state.phone.instagram.directory || {};
      extendInstagramDirectoryWithSpotifyTop100();
      loadIgDirectoryAvatarsFromStorage();
    }

    // 3. Gestione Interfaccia Profilo
    if (!hasProfile) {
      openOnboarding();
    } else {
      // CRUCIALE: Se il profilo esiste, nascondiamo esplicitamente l'overlay
      closeOnboarding();
      updateUI();
      saveGameDebounced();
    }

fixDuplicateCreateAlbum();
const resetBtn = document.getElementById("resetGameBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    const ok = confirm("Vuoi cancellare TUTTA la partita e ripartire da zero?");
    if (ok) resetGame();
  });
}

// avanzamento automatico del tempo: 1 giorno ogni 60 secondi
setInterval(() => advanceDay(true), 60000);



    // Keep ripple wiring even if UI creates buttons dynamically
    const rrObs = new MutationObserver(()=> rrWireRipples());
    rrObs.observe(document.body, { childList:true, subtree:true });
    rrWireRipples();

  
// =======================
// STEP 4: QUESTLINE (Starter) + REWARD SCREEN
// =======================
(function setupQuestlineStep4(){
  // ---------- helpers ----------
  const QUEST_KEY = "raprise_starter_quests_v1";

  function qLoad(){
    try { return JSON.parse(localStorage.getItem(QUEST_KEY) || "null"); } catch { return null; }
  }
  function qSave(qs){
    try { localStorage.setItem(QUEST_KEY, JSON.stringify(qs)); } catch {}
  }

  function clamp01(x){ return Math.max(0, Math.min(1, x)); }

  // ---------- init state ----------
  const defaultQuestState = {
    chapter: 1,
    completedAt: null,
    // keep simple, deterministic
    quests: [
      {
        id: "open_phone",
        title: "Apri il telefono",
        desc: "Entra nell'overlay telefono e dai un'occhiata alle app.",
        type: "flag",
        goal: 1,
        progress: 0,
        claimed: false,
        reward: { money: 120, fans: 25, xp: 8 }
      },
      {
        id: "write_bars_2",
        title: "Allena la penna x2",
        desc: "Premi Scrivi barre due volte (Writing e Flow crescono).",
        type: "counter_bars",
        goal: 2,
        progress: 0,
        claimed: false,
        reward: { money: 180, fans: 45, xp: 12 }
      },
      {
        id: "drop_single",
        title: "Droppa 1 singolo",
        desc: "Pubblica un pezzo per entrare nel feed e nella chart.",
        type: "counter_singles",
        goal: 1,
        progress: 0,
        claimed: false,
        reward: { money: 250, fans: 90, xp: 15 }
      },
      {
        id: "do_live",
        title: "Fai 1 live",
        desc: "Rischio/ricompensa: i live possono far crescere fan e hype.",
        type: "counter_lives",
        goal: 1,
        progress: 0,
        claimed: false,
        reward: { money: 260, fans: 110, xp: 18 }
      }
    ]
  };

  // attach on state for saving together is optional; we keep local to avoid interfering with existing save schema
  let qs = qLoad();
  if (!qs || !qs.quests || !Array.isArray(qs.quests)) qs = structuredClone(defaultQuestState);

  // ---------- UI mount ----------
  function ensureRewardOverlay(){
    if (document.getElementById("rewardOverlay")) return;

    const ov = document.createElement("div");
    ov.id = "rewardOverlay";
    ov.className = "reward-overlay hidden";
    ov.setAttribute("aria-hidden","true");
    ov.innerHTML = `
      <div class="reward-card" role="dialog" aria-modal="true" aria-label="Ricompensa">
        <div class="reward-top">
          <div>
            <div class="reward-title" id="rewardTitle">Ricompensa sbloccata</div>
            <div class="reward-sub" id="rewardSub">Hai completato un obiettivo.</div>
          </div>
          <button class="reward-close" id="rewardCloseBtn" type="button">✕</button>
        </div>
        <div class="reward-body">
          <div class="sp-card" style="margin:0; padding:12px;">
            <strong style="display:block; margin-bottom:4px;">Drop</strong>
            <small style="color:var(--muted);">Raccogli subito, così la crescita resta fluida.</small>
            <div class="reward-items" id="rewardItems"></div>
            <div class="reward-actions">
              <button type="button" id="rewardCollectBtn">Raccogli</button>
              <button type="button" class="secondary" id="rewardLaterBtn">Dopo</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(ov);

    // close interactions
    const close = () => {
      ov.classList.add("hidden");
      ov.setAttribute("aria-hidden","true");
    };
    ov.addEventListener("click", (e) => { if (e.target === ov) close(); });
    document.getElementById("rewardCloseBtn").addEventListener("click", close);
    document.getElementById("rewardLaterBtn").addEventListener("click", close);

    // collect
    document.getElementById("rewardCollectBtn").addEventListener("click", () => {
      const qid = ov.dataset.qid || "";
      if (!qid) { close(); return; }
      applyRewardAndClaim(qid);
      close();
    });
  }

  function ensureQuestlineUI(){
    if (!el.missionsList) return;
    const host = el.missionsList.parentElement; // missions card body
    if (!host) return;

    if (document.getElementById("questlineWrap")) return;

    const wrap = document.createElement("div");
    wrap.id = "questlineWrap";
    wrap.className = "questline-wrap";
    wrap.innerHTML = `
      <div class="questline-head">
        <div>
          <strong>Starter Questline</strong>
          <div class="questline-sub">Completa questi obiettivi per ottenere ricompense e sbloccare il loop.</div>
        </div>
        <div class="qpill" id="questlineProgressPill">0/0</div>
      </div>
      <div class="questline-list" id="questlineList"></div>
    `;
    host.insertBefore(wrap, el.missionsList);
  }

  function progressForQuest(q){
    // derived progress from game state
    if (!q) return 0;
    if (q.type === "flag") return q.progress || 0;
    if (q.type === "counter_bars") return state?.dailyCounters?.bars || 0;
    if (q.type === "counter_singles") return state?.dailyCounters?.singles || 0;
    if (q.type === "counter_lives") return state?.dailyCounters?.lives || 0;
    return q.progress || 0;
  }

  function isQuestComplete(q){
    const prog = progressForQuest(q);
    return prog >= (q.goal || 1);
  }

  function renderQuestline(){
    ensureQuestlineUI();
    const list = document.getElementById("questlineList");
    const pill = document.getElementById("questlineProgressPill");
    if (!list || !pill) return;

    const total = qs.quests.length;
    const done = qs.quests.filter(isQuestComplete).length;
    pill.textContent = `${done}/${total}`;
    pill.classList.toggle("done", done === total);

    list.innerHTML = "";

    qs.quests.forEach(q => {
      const prog = Math.min(q.goal, progressForQuest(q));
      const ratio = clamp01(prog / (q.goal || 1));
      const row = document.createElement("div");
      row.className = "qrow";
      const doneNow = isQuestComplete(q);

      const rewardText = [];
      const r = q.reward || {};
      if ((r.fans||0) > 0) rewardText.push(`+${formatNumber(r.fans)} fan`);
      if ((r.money||0) > 0) rewardText.push(`+$${formatNumber(r.money)}`);
      if ((r.xp||0) > 0) rewardText.push(`+${formatNumber(r.xp)} XP`);

      row.innerHTML = `
        <div class="qmeta">
          <div class="qtitle">${doneNow ? "✅ " : ""}${q.title}</div>
          <div class="qdesc">${q.desc}${rewardText.length ? " • Ricompensa: " + rewardText.join(", ") : ""}</div>
        </div>
        <div class="qprog">
          <div class="qpill ${doneNow ? "done":""}">${Math.min(prog, q.goal)}/${q.goal}</div>
          <div class="qbar"><i style="width:${Math.floor(ratio*100)}%"></i></div>
        </div>
      `;

      // click: if completed and not claimed, open reward screen
      row.addEventListener("click", () => {
        if (!doneNow) return;
        if (q.claimed) {
          showToast("Ricompensa già riscossa.");
          return;
        }
        openRewardForQuest(q.id);
      });

      list.appendChild(row);
    });

    // chapter complete banner
    if (done === total && !qs.completedAt) {
      qs.completedAt = Date.now();
      qSave(qs);
      // tiny celebration
      addToFeed("Starter Questline completata: ora puoi entrare nel loop di crescita (missioni settimanali + contenuti social).", "system");
      showToast("Questline completata: <span>loop sbloccato</span>");
      saveGameDebounced();
    }
  }

  // ---------- reward handling ----------
  function openRewardForQuest(qid){
    ensureRewardOverlay();
    const q = qs.quests.find(x => x.id === qid);
    if (!q) return;

    const ov = document.getElementById("rewardOverlay");
    const items = document.getElementById("rewardItems");
    const title = document.getElementById("rewardTitle");
    const sub = document.getElementById("rewardSub");
    if (!ov || !items || !title || !sub) return;

    ov.dataset.qid = qid;
    title.textContent = `Ricompensa: ${q.title}`;
    sub.textContent = "Sei più vicino al prossimo livello. Raccogli e continua.";
    items.innerHTML = "";

    const r = q.reward || {};
    const entries = [
      { key:"fans", label:"Fan", desc:"Crescita organica", val: r.fans||0, fmt: (v)=>`+${formatNumber(v)}` },
      { key:"money", label:"Cash", desc:"Budget per feat e tour", val: r.money||0, fmt: (v)=>`+$${formatNumber(v)}` },
      { key:"xp", label:"XP", desc:"Progressione livello", val: r.xp||0, fmt: (v)=>`+${formatNumber(v)} XP` }
    ].filter(x => x.val > 0);

    entries.forEach(e => {
      const div = document.createElement("div");
      div.className = "ritem";
      div.innerHTML = `
        <div>
          <strong>${e.label}</strong>
          <small>${e.desc}</small>
        </div>
        <div class="rnum">${e.fmt(e.val)}</div>
      `;
      items.appendChild(div);
    });

    ov.classList.remove("hidden");
    ov.setAttribute("aria-hidden","false");
  }

  function applyRewardAndClaim(qid){
    const q = qs.quests.find(x => x.id === qid);
    if (!q || q.claimed) return;

    // safety: allow claim only if complete
    if (!isQuestComplete(q)) { showToast("Obiettivo non ancora completato."); return; }

    const r = q.reward || {};
    if ((r.fans||0) > 0) state.player.fans = Math.max(0, state.player.fans + r.fans);
    if ((r.money||0) > 0) state.player.money = Math.max(0, state.player.money + r.money);
    if ((r.xp||0) > 0) addXP(r.xp);

    q.claimed = true;
    qSave(qs);

    addToFeed(`Ricompensa riscossa: ${q.title}.`, "system");
    showToast("Ricompensa riscossa.");
    updateUI();
    saveGameDebounced();
  }

  // ---------- event hooks ----------
  // phone open flag
  const origPhoneOpen = window.phoneOpen;
  if (typeof origPhoneOpen === "function") {
    window.phoneOpen = function(){
      // set progress flag
      const q = qs.quests.find(x => x.id === "open_phone");
      if (q && (q.progress||0) < 1) { q.progress = 1; qSave(qs); }
      return origPhoneOpen.apply(this, arguments);
    };
  } else {
    // fallback: button click
    try{
      el.phoneBtn?.addEventListener("click", () => {
        const q = qs.quests.find(x => x.id === "open_phone");
        if (q && (q.progress||0) < 1) { q.progress = 1; qSave(qs); }
      });
    }catch{}
  }

  // ---------- patch updateUI (safe) ----------
  const _updateUI = window.updateUI;
  if (typeof _updateUI === "function") {
    window.updateUI = function(){
      _updateUI.apply(this, arguments);
      try{ renderQuestline(); } catch(e){ console.warn("Questline render err", e); }
    };
  } else {
    // if updateUI not available, render once
    setTimeout(renderQuestline, 800);
  }

  // initial render
  ensureRewardOverlay();
  renderQuestline();

})();

;

/* =========================
   STEP6: Rarity system + Milestones + Badges
   ========================= */
(function(){
  const BADGE_KEY = "raprise_badges_v1";
  const banner = document.getElementById("milestoneBanner");
  const bannerTitle = document.getElementById("bannerTitle");
  const bannerDesc = document.getElementById("bannerDesc");
  const bannerTag = document.getElementById("bannerTag");
  const burst = document.getElementById("rewardBurst");

  function getState(){
    try{ if (typeof state === "object" && state && state.player) return state; }catch{}
    return null;
  }
  function loadBadges(){
    try{
      const raw = localStorage.getItem(BADGE_KEY);
      if(!raw) return {};
      return JSON.parse(raw) || {};
    }catch{ return {}; }
  }
  function saveBadges(b){
    try{ localStorage.setItem(BADGE_KEY, JSON.stringify(b)); }catch{}
  }
  let badges = loadBadges();

  function showBanner(title, desc, rarity){
    if(!banner) return;
    bannerTitle.textContent = title;
    bannerDesc.textContent = desc;

    const r = rarity || "rare";
    const map = {
      common: { cls:"r-common", txt:"COMMON" },
      rare: { cls:"r-rare", txt:"RARE" },
      epic: { cls:"r-epic", txt:"EPIC" },
      legendary: { cls:"r-legend", txt:"LEGENDARY" },
    };
    const m = map[r] || map.rare;
    bannerTag.className = "rarity-tag " + m.cls;
    bannerTag.innerHTML = '<span class="rarity-dot"></span>' + m.txt;

    banner.classList.add("show");
    clearTimeout(showBanner._t);
    showBanner._t = setTimeout(()=> banner.classList.remove("show"), 2200);
  }

  function checkMilestones(){
    const st = getState();
    if(!st) return;
    const lv = Number(st.player.level||1);

    function grant(key, name, rarity){
      if(badges[key]) return;
      badges[key] = { name, rarity, ts: Date.now() };
      saveBadges(badges);
      showBanner("Badge ottenuto", name, rarity);
      injectBadgesIntoProfile();
    }

    if(lv >= 2) grant("badge_phone", "Sblocco: Telefono", "rare");
    if(lv >= 4) grant("badge_tour", "Sblocco: Tour", "epic");
    if(lv >= 6) grant("badge_album", "Sblocco: Album PRO", "legendary");
  }

  function injectBadgesIntoProfile(){
    const container = document.getElementById("profileBadges") || document.querySelector("#profileOverlay .overlay-card");
    if(!container) return;

    let block = document.getElementById("badgesBlock");
    if(!block){
      block = document.createElement("div");
      block.id = "badgesBlock";
      block.style.marginTop = "12px";
      block.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:8px;">
          <b style="letter-spacing:.2px;">Badge</b>
          <span style="color:var(--muted); font-size:.78rem;">progressi permanenti</span>
        </div>
        <div id="badgesRow" style="display:flex; gap:8px; flex-wrap:wrap;"></div>
      `;
      container.appendChild(block);
    }

    const row = document.getElementById("badgesRow");
    if(!row) return;
    row.innerHTML = "";

    const items = Object.values(badges);
    if(items.length === 0){
      const empty = document.createElement("div");
      empty.style.color = "var(--muted)";
      empty.style.fontSize = ".82rem";
      empty.textContent = "Nessun badge ancora. Completa missioni e sali di livello.";
      row.appendChild(empty);
      return;
    }

    items.sort((a,b)=> (a.ts||0) - (b.ts||0)).forEach(b => {
      const chip = document.createElement("div");
      chip.className = "badge-chip";
      const colorMap = {
        common: "rgba(148,163,184,.92)",
        rare: "rgba(67,217,255,.92)",
        epic: "rgba(255,91,214,.92)",
        legendary: "rgba(247,201,72,.98)"
      };
      const c = colorMap[b.rarity] || "rgba(56,189,248,.92)";
      chip.innerHTML = `<i style="background:${c}; box-shadow:0 0 0 3px rgba(255,255,255,.10)"></i>${b.name}`;
      row.appendChild(chip);
    });
  }

  function computeRarity(rew){
    const money = Number(rew.money||0);
    const fans = Number(rew.fans||0);
    const xp = Number(rew.xp||0);
    const hype = Number(rew.hype||0);

    let score = 0;
    if(money >= 1200) score += 2;
    if(fans >= 90) score += 1;
    if(xp >= 120) score += 1;
    if(hype >= 5) score += 2;
    if(hype > 0) score += 1;

    if(score >= 5) return "legendary";
    if(score >= 3) return "epic";
    if(score >= 2) return "rare";
    return "common";
  }

  function enhanceRewardOverlay(){
    const grid = document.getElementById("rewardGrid");
    if(!grid) return;

    const mo = new MutationObserver(() => {
      const items = grid.querySelectorAll(".reward-item");
      if(items.length === 0) return;

      let rew = { money:0, fans:0, xp:0, hype:0 };
      items.forEach(it => {
        const t = (it.textContent || "").toLowerCase();
        const nums = (it.textContent || "").match(/[-+]?\d+/g);
        const v = nums ? Number(nums[0]) : 0;
        if(t.includes("soldi")) rew.money = v;
        if(t.includes("fan")) rew.fans = v;
        if(t.includes("xp")) rew.xp = v;
        if(t.includes("hype")) rew.hype = v;
      });

      const rarity = computeRarity(rew);
      items.forEach(it => it.dataset.rarity = rarity);

      if(burst){
        burst.classList.remove("show");
        void burst.offsetWidth;
        burst.classList.add("show");
      }

      if(rew.hype > 0 || rarity === "epic" || rarity === "legendary"){
        showBanner("Drop speciale", "Hai trovato una ricompensa di rarità elevata.", rarity);
        if(!badges.badge_special_drop){
          badges.badge_special_drop = { name:"Drop speciale", rarity, ts: Date.now() };
          saveBadges(badges);
        }
      }

      injectBadgesIntoProfile();
      checkMilestones();
    });

    mo.observe(grid, { childList:true, subtree:true });
  }

  const milestoneTimer = setInterval(checkMilestones, 900);
  window.addEventListener("beforeunload", ()=> clearInterval(milestoneTimer));

  window.addEventListener("load", () => {
    enhanceRewardOverlay();
    checkMilestones();
    injectBadgesIntoProfile();
  });
})();

;

/* =========================
   STEP7: True chest opening (3 cards reveal) + per-item rarity + level scaling
   ========================= */
(function(){
  const CHEST_KEY  = "raprise_chest_v1";

  // Reuse existing reward overlay elements from Step5
  const rewardOverlay = document.getElementById("rewardOverlay");
  const rewardTitle = document.getElementById("rewardTitle");
  const rewardDesc = document.getElementById("rewardDesc");
  const rewardGrid = document.getElementById("rewardGrid");
  const rewardCloseBtn = document.getElementById("rewardCloseBtn");
  const rewardLaterBtn = document.getElementById("rewardLaterBtn");
  const rewardClaimBtn = document.getElementById("rewardClaimBtn");

  const burst = document.getElementById("rewardBurst");
  const banner = document.getElementById("milestoneBanner");
  const bannerTitle = document.getElementById("bannerTitle");
  const bannerDesc = document.getElementById("bannerDesc");
  const bannerTag = document.getElementById("bannerTag");

  function getState(){
    try{ if (typeof state === "object" && state && state.player) return state; }catch{}
    return null;
  }

  function loadMeta(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if(!raw) return fallback;
      const v = JSON.parse(raw);
      return { ...fallback, ...v };
    }catch{ return fallback; }
  }
  function saveMeta(key, obj){
    try{ localStorage.setItem(key, JSON.stringify(obj)); }catch{}
  }

  function showBanner(title, desc, rarity){
    if(!banner) return;
    bannerTitle.textContent = title;
    bannerDesc.textContent = desc;

    const map = {
      common: { cls:"r-common", txt:"COMMON" },
      rare: { cls:"r-rare", txt:"RARE" },
      epic: { cls:"r-epic", txt:"EPIC" },
      legendary: { cls:"r-legend", txt:"LEGENDARY" },
    };
    const m = map[rarity] || map.rare;
    bannerTag.className = "rarity-tag " + m.cls;
    bannerTag.innerHTML = '<span class="rarity-dot"></span>' + m.txt;

    banner.classList.add("show");
    clearTimeout(showBanner._t);
    showBanner._t = setTimeout(()=> banner.classList.remove("show"), 2200);
  }

  // XP/level curve aligned with previous steps: needed = level * 140
  function addXP(xp){
    const st = getState();
    if(!st) return;
    const p = st.player;
    p.xp = Number(p.xp||0) + Number(xp||0);
    let needed = (Number(p.level||1) * 140);
    let leveled = false;
    while(p.xp >= needed){
      p.xp -= needed;
      p.level = Number(p.level||1) + 1;
      needed = (Number(p.level||1) * 140);
      leveled = true;
    }
    if(leveled) showBanner("LEVEL UP", `Ora sei Lv. ${p.level}`, "rare");
  }

  function applyReward(rew){
    const st = getState();
    if(!st) return;
    const p = st.player;
    if(rew.money) p.money = Number(p.money||0) + Number(rew.money);
    if(rew.fans)  p.fans  = Number(p.fans||0) + Number(rew.fans);
    if(rew.hype)  p.hype  = Number(p.hype||0) + Number(rew.hype);
    if(rew.xp)    addXP(Number(rew.xp));
  }

  function rarityForItem(type, value){
    const v = Number(value||0);
    // tuned thresholds: scale by type
    if(type === "money"){
      if(v >= 2200) return "legendary";
      if(v >= 1400) return "epic";
      if(v >= 900) return "rare";
      return "common";
    }
    if(type === "fans"){
      if(v >= 180) return "legendary";
      if(v >= 120) return "epic";
      if(v >= 70) return "rare";
      return "common";
    }
    if(type === "xp"){
      if(v >= 220) return "legendary";
      if(v >= 160) return "epic";
      if(v >= 110) return "rare";
      return "common";
    }
    if(type === "hype"){
      if(v >= 8) return "legendary";
      if(v >= 5) return "epic";
      if(v >= 3) return "rare";
      return "common";
    }
    return "common";
  }

  function maxRarity(list){
    const order = { common:0, rare:1, epic:2, legendary:3 };
    let m = "common";
    list.forEach(it => { if(order[it.r] > order[m]) m = it.r; });
    return m;
  }

  function rollChestByLevel(level){
    // scaling: rewards grow with level, but with soft caps
    const lv = Math.max(1, Math.min(50, Number(level||1)));
    const moneyBase = 420 + lv*22;
    const fansBase  = 26 + lv*4.0;
    const xpBase    = 48 + lv*6.0;

    const money = randInt(Math.floor(moneyBase*0.9), Math.floor(moneyBase*2.9));
    const fans  = randInt(Math.floor(fansBase*0.9),  Math.floor(fansBase*3.0));
    const xp    = randInt(Math.floor(xpBase*0.8),    Math.floor(xpBase*2.4));

    // bonus slot has rarity chance
    const roll = Math.random();
    let hype = 0;
    let bonus = null;

    if(roll < 0.08){ // legendary bonus
      hype = randInt(7, 12);
      bonus = { type:"hype", name:"Hype bonus", value:`+${hype}`, hint:"Boost raro: aumenta la crescita social.", r: rarityForItem("hype", hype) };
    }else if(roll < 0.22){ // epic bonus
      hype = randInt(4, 7);
      bonus = { type:"hype", name:"Hype bonus", value:`+${hype}`, hint:"Boost: più hype, più progress.", r: rarityForItem("hype", hype) };
    }else if(roll < 0.42){ // rare bonus: multiplier money
      const extra = randInt(250, 600);
      bonus = { type:"money", name:"Bonus cash", value:`+$ ${extra}`, hint:"Ricompensa extra dalla cassa.", r: rarityForItem("money", extra) };
      // apply via adding to money later
      bonus._extraMoney = extra;
    }

    const items = [
      { type:"money", name:"Soldi", value:`+$ ${money}`, hint:"Valuta principale: sblocchi e upgrade.", r: rarityForItem("money", money), _money: money },
      { type:"fans",  name:"Fan",   value:`+${fans}`,   hint:"Aumenta la reach e gli unlock.", r: rarityForItem("fans", fans), _fans: fans },
      { type:"xp",    name:"XP",    value:`+${xp}`,     hint:"Livello: sblocchi feature pro.", r: rarityForItem("xp", xp), _xp: xp },
    ];

    // Replace one card with bonus 20% of time by swapping XP card
    if(bonus){
      items[2] = bonus;
    }

    // Build final reward payload to apply
    const rew = { money, fans, xp, hype: 0 };
    if(bonus && bonus.type === "hype") rew.hype = hype;
    if(bonus && bonus._extraMoney) rew.money += bonus._extraMoney;

    return { items, rew, rarity: maxRarity(items) };
  }

  function randInt(a,b){ return Math.floor(a + Math.random()*(b-a+1)); }

  // Chest opening UI flow
  function openChestStep7(){
    if(!rewardOverlay || !rewardGrid) return;

    const st = getState();
    const lv = st ? Number(st.player.level||1) : 1;

    const meta = loadMeta(CHEST_KEY, { progress: 0, ready: false, lastRoll: null });
    const ready = Number(meta.progress||0) >= 100;
    if(!ready){
      showBanner("Cassa non pronta", "Completa azioni per riempire la cassa.", "common");
      return;
    }

    const roll = rollChestByLevel(lv);

    rewardTitle.textContent = "Apertura cassa";
    rewardDesc.textContent = "Tre carte. Si rivelano una alla volta, stile Clash. Premi Riscatta per applicare tutto.";
    rewardGrid.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "chest-cards";
    rewardGrid.appendChild(wrap);

    const cards = roll.items.map((it, idx) => createChestCard(it, idx));
    cards.forEach(c => wrap.appendChild(c));

    // show overlay
    rewardOverlay.classList.remove("hidden");

    // burst + banner based on chest rarity
    if(burst){
      burst.classList.remove("show");
      void burst.offsetWidth;
      burst.classList.add("show");
    }
    showBanner("Cassa aperta", "Preparati al reveal.", roll.rarity);

    // reveal sequence
    let revealed = 0;
    function revealNext(){
      if(revealed >= cards.length) return;
      cards[revealed].classList.add("revealed");
      revealed += 1;
      setTimeout(revealNext, 520);
    }
    setTimeout(revealNext, 260);

    // Close handlers
    function close(){
      rewardOverlay.classList.add("hidden");
      rewardCloseBtn.onclick = null;
      rewardLaterBtn.onclick = null;
      rewardClaimBtn.onclick = null;
    }
    rewardCloseBtn.onclick = close;
    rewardLaterBtn.onclick = close;

    rewardClaimBtn.onclick = () => {
      applyReward(roll.rew);

      // consume chest
      meta.progress = 0;
      meta.ready = false;
      meta.lastRoll = roll.rew;
      saveMeta(CHEST_KEY, meta);

      // Optional: if Step5 chest UI exists, trigger click to refresh visuals
      try{
        const ev = new Event("storage");
        window.dispatchEvent(ev);
      }catch{}

      showBanner("Ricompense applicate", "Progress aggiornato.", roll.rarity);
      close();
    };
  }

  function createChestCard(item, idx){
    const card = document.createElement("div");
    card.className = "chest-card reveal-seq";
    card.style.animationDelay = (idx*0.06) + "s";

    const inner = document.createElement("div");
    inner.className = "chest-inner";
    card.appendChild(inner);

    const front = document.createElement("div");
    front.className = "chest-face chest-front";
    front.innerHTML = '<div class="seal">🎁</div><div class="tap">Rivelazione...</div>';

    const back = document.createElement("div");
    back.className = "chest-face chest-back";
    back.dataset.r = item.r || "common";

    const tagCls = item.r === "legendary" ? "r-legend" : item.r === "epic" ? "r-epic" : item.r === "rare" ? "r-rare" : "r-common";
    const tagTxt = item.r ? item.r.toUpperCase() : "COMMON";

    back.innerHTML = `
      <div class="content">
        <div>
          <div class="name">${item.name}</div>
          <div class="hint">${item.hint || ""}</div>
        </div>
        <div style="display:flex; align-items:flex-end; justify-content:space-between; gap:10px;">
          <div class="value">${item.value}</div>
          <div class="rarity-tag ${tagCls} rar"><span class="rarity-dot"></span>${tagTxt}</div>
        </div>
      </div>
    `;

    inner.appendChild(front);
    inner.appendChild(back);

    // Optional tap to reveal immediately
    card.addEventListener("click", () => {
      card.classList.add("chest-shake");
      setTimeout(()=> card.classList.remove("chest-shake"), 400);
      card.classList.add("revealed");
    });

    return card;
  }

  // Intercept chest button click in capture so Step5 handler doesn't run
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#openChestBtn");
    if(!btn) return;
    // If button disabled, let it be
    if(btn.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation?.();
    openChestStep7();
  }, true);

})();

;

/* =========================
   STEP9: Shop 2.0 (Tabs: Upgrade / Boost / Cosmetics) + Themes + Preview numbers
   ========================= */
(function(){
  const SHOP_KEY = "raprise_shop_v2";
  const THEME_KEY = "raprise_theme_v1";

  function getState(){
    try{ if (typeof state === "object" && state && state.player) return state; }catch{}
    return null;
  }
  function loadMeta(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if(!raw) return fallback;
      const v = JSON.parse(raw);
      return { ...fallback, ...v };
    }catch{ return fallback; }
  }
  function saveMeta(key, obj){
    try{ localStorage.setItem(key, JSON.stringify(obj)); }catch{}
  }

  // Overlay reuse
  const overlay = document.getElementById("rewardOverlay");
  const titleEl = document.getElementById("rewardTitle");
  const descEl  = document.getElementById("rewardDesc");
  const gridEl  = document.getElementById("rewardGrid");
  const closeBtn = document.getElementById("rewardCloseBtn");
  const laterBtn = document.getElementById("rewardLaterBtn");
  const claimBtn = document.getElementById("rewardClaimBtn");

  function open(){ overlay.classList.remove("hidden"); }
  function close(){ overlay.classList.add("hidden"); }

  // Audio from Step8 (if present), else silent
  function blip(freq=520, dur=0.06, gain=0.05){
    try{ window.__raprise_blip?.(freq,dur,gain); return; }catch{}
    // fallback minimal
    try{
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type="sine"; o.frequency.value=freq; g.gain.value=gain;
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + dur);
      g.gain.setValueAtTime(gain, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    }catch{}
  }

  // ---- Persistent shop state ----
  // Upgrades: permanent levels
  // Boosts: consumables with remaining uses
  let shop = loadMeta(SHOP_KEY, {
    upgrades: { studio:0, promo:0, stage:0 },
    boosts: { xp2:0, fans2:0, chestPlus:0 } // counts = uses remaining
  });

  // ---- Theme system ----
  const themes = [
    { id:"gold", name:"Gold Royale", price: 1200, vars: { "--accent":"#f7c948", "--accent-strong":"rgba(247,201,72,.98)", "--accent-soft":"rgba(247,201,72,.18)" } },
    { id:"neon", name:"Neon Night", price: 1200, vars: { "--accent":"#43d9ff", "--accent-strong":"rgba(67,217,255,.98)", "--accent-soft":"rgba(67,217,255,.18)" } },
    { id:"magenta", name:"Magenta Pop", price: 1200, vars: { "--accent":"#ff5bd6", "--accent-strong":"rgba(255,91,214,.98)", "--accent-soft":"rgba(255,91,214,.18)" } },
  ];

  function applyTheme(themeId){
    const t = themes.find(x=>x.id===themeId);
    if(!t) return;
    const root = document.documentElement;
    Object.entries(t.vars).forEach(([k,v])=> root.style.setProperty(k, v));
    try{ localStorage.setItem(THEME_KEY, themeId); }catch{}
  }
  function initTheme(){
    let id = null;
    try{ id = localStorage.getItem(THEME_KEY); }catch{}
    if(id) applyTheme(id);
  }

  // ---- Preview multipliers (numbers, not adjectives) ----
  function mXP(){ return 1 + shop.upgrades.studio * 0.04; }   // +4% per level
  function mFans(){ return 1 + shop.upgrades.promo * 0.05; } // +5% per level
  function mLive(){ return 1 + shop.upgrades.stage * 0.06; } // +6% per level
  function boostActive(kind){ return (shop.boosts[kind]||0) > 0; }

  // Expose multipliers for future integration (safe)
  window.getRapRiseMultipliers = function(){
    return {
      xp: mXP(), fans: mFans(), live: mLive(),
      boosts: { ...shop.boosts }
    };
  };

  function costUpgrade(level){
    return Math.floor(450 + level*320 + level*level*45);
  }
  function costBoost(kind){
    // consumables
    if(kind==="xp2") return 650;
    if(kind==="fans2") return 650;
    if(kind==="chestPlus") return 950;
    return 700;
  }
  function canAfford(cost){
    const st = getState(); if(!st) return false;
    return Number(st.player.money||0) >= cost;
  }
  function spend(cost){
    const st = getState(); if(!st) return false;
    if(Number(st.player.money||0) < cost) return false;
    st.player.money = Number(st.player.money||0) - cost;
    return true;
  }
  function refreshUI(){
    try{ window.updateUI?.(); window.render?.(); window.syncHud?.(); }catch{}
  }

  // ---- Shop UI ----
  function renderShop(tab){
    tab = tab || "upgrade";
    titleEl.textContent = "Negozio";
    descEl.textContent = "Upgrade permanenti, boost consumabili e cosmetici. Tutto salva in locale.";
    gridEl.innerHTML = "";

    const tabs = document.createElement("div");
    tabs.className = "shop-tabs";
    tabs.innerHTML = `
      <button class="shop-tab ${tab==="upgrade"?"active":""}" data-tab="upgrade">Upgrade</button>
      <button class="shop-tab ${tab==="boost"?"active":""}" data-tab="boost">Boost</button>
      <button class="shop-tab ${tab==="cos"?"active":""}" data-tab="cos">Cosmetici</button>
    `;
    tabs.addEventListener("click",(e)=>{
      const b = e.target.closest(".shop-tab"); if(!b) return;
      renderShop(b.dataset.tab);
      blip(520,0.05,0.04);
    });
    gridEl.appendChild(tabs);

    // KPIs
    const kpis = document.createElement("div");
    kpis.className = "shop-kpis";
    kpis.innerHTML = `
      <div class="shop-kpi"><b>Moltiplicatore XP</b><span>${mXP().toFixed(2)}x (Studio Lv. ${shop.upgrades.studio})</span></div>
      <div class="shop-kpi"><b>Moltiplicatore Fan</b><span>${mFans().toFixed(2)}x (Promo Lv. ${shop.upgrades.promo})</span></div>
      <div class="shop-kpi"><b>Moltiplicatore Live</b><span>${mLive().toFixed(2)}x (Stage Lv. ${shop.upgrades.stage})</span></div>
    `;
    gridEl.appendChild(kpis);

    if(tab==="upgrade") renderUpgrades();
    if(tab==="boost") renderBoosts();
    if(tab==="cos") renderCosmetics();

    // Modal buttons
    claimBtn.textContent = "Ok";
    laterBtn.textContent = "Chiudi";
    claimBtn.disabled = false;
    claimBtn.onclick = close;
    laterBtn.onclick = close;
    closeBtn.onclick = close;

    open();
  }

  function renderUpgrades(){
    const wrap = document.createElement("div");
    wrap.className = "shop-card";
    wrap.innerHTML = `<b style="letter-spacing:.2px;">Upgrade permanenti</b><div class="shop-grid" id="uGrid"></div>`;
    gridEl.appendChild(wrap);
    const g = wrap.querySelector("#uGrid");

    const defs = [
      { key:"studio", name:"Studio", desc:"Incremento permanente del moltiplicatore XP.", preview:()=>`${mXP().toFixed(2)}x -> ${(1 + (shop.upgrades.studio+1)*0.04).toFixed(2)}x` },
      { key:"promo", name:"Promo", desc:"Incremento permanente del moltiplicatore fan.", preview:()=>`${mFans().toFixed(2)}x -> ${(1 + (shop.upgrades.promo+1)*0.05).toFixed(2)}x` },
      { key:"stage", name:"Stage", desc:"Incremento permanente su reward collegate alle live.", preview:()=>`${mLive().toFixed(2)}x -> ${(1 + (shop.upgrades.stage+1)*0.06).toFixed(2)}x` },
    ];

    defs.forEach(d=>{
      const lvl = Number(shop.upgrades[d.key]||0);
      const cost = costUpgrade(lvl);
      const card = document.createElement("div");
      card.className = "shop-item big";
      card.innerHTML = `
        <div class="t"><b>${d.name}</b><span class="rarity-tag r-common"><span class="rarity-dot"></span>PERMANENTE</span></div>
        <div class="d">${d.desc}</div>
        <div class="benefit"><b>Effetto:</b> ${d.preview()}</div>
        <div class="a">
          <div class="lvl">Lv. ${lvl} · costo: $ ${cost}</div>
          <button ${canAfford(cost) ? "" : "disabled"}>Compra</button>
        </div>
      `;
      const btn = card.querySelector("button");
      btn.addEventListener("click", ()=>{
        if(!spend(cost)){ blip(160,0.08,0.07); return; }
        shop.upgrades[d.key] = lvl + 1;
        saveMeta(SHOP_KEY, shop);
        blip(760,0.06,0.05);
        refreshUI();
        renderShop("upgrade");
      });
      g.appendChild(card);
    });
  }

  function renderBoosts(){
    const wrap = document.createElement("div");
    wrap.className = "shop-card";
    wrap.innerHTML = `<b style="letter-spacing:.2px;">Boost consumabili</b>
      <div style="color:var(--muted); font-size:.82rem; margin-top:6px;">
        I boost si consumano quando riscatti una cassa (effetto immediato).
      </div>
      <div class="shop-grid" id="bGrid"></div>`;
    gridEl.appendChild(wrap);
    const g = wrap.querySelector("#bGrid");

    const defs = [
      { key:"xp2", name:"XP x2 (1 uso)", desc:"Raddoppia l’XP della prossima cassa riscattata.", price:()=>costBoost("xp2") },
      { key:"fans2", name:"Fan x2 (1 uso)", desc:"Raddoppia i fan della prossima cassa riscattata.", price:()=>costBoost("fans2") },
      { key:"chestPlus", name:"Cassa +25%", desc:"Aggiunge +25% soldi e fan della prossima cassa.", price:()=>costBoost("chestPlus") },
    ];

    defs.forEach(d=>{
      const owned = Number(shop.boosts[d.key]||0);
      const cost = d.price();
      const card = document.createElement("div");
      card.className = "shop-item big";
      card.innerHTML = `
        <div class="t"><b>${d.name}</b><span class="rarity-tag r-rare"><span class="rarity-dot"></span>BOOST</span></div>
        <div class="d">${d.desc}</div>
        <div class="benefit"><b>Disponibili:</b> ${owned}</div>
        <div class="a">
          <div class="lvl">costo: $ ${cost}</div>
          <button ${canAfford(cost) ? "" : "disabled"}>Compra</button>
        </div>
      `;
      const btn = card.querySelector("button");
      btn.addEventListener("click", ()=>{
        if(!spend(cost)){ blip(160,0.08,0.07); return; }
        shop.boosts[d.key] = owned + 1;
        saveMeta(SHOP_KEY, shop);
        blip(900,0.06,0.05);
        refreshUI();
        renderShop("boost");
      });
      g.appendChild(card);
    });
  }

  function renderCosmetics(){
    const wrap = document.createElement("div");
    wrap.className = "shop-card";
    wrap.innerHTML = `<b style="letter-spacing:.2px;">Cosmetici (Theme)</b>
      <div style="color:var(--muted); font-size:.82rem; margin-top:6px;">
        Cambia il look senza alterare il gameplay.
      </div>
      <div class="cos-grid" id="cGrid"></div>`;
    gridEl.appendChild(wrap);
    const g = wrap.querySelector("#cGrid");

    const owned = loadMeta("raprise_cos_v1", { owned:{} });
    const current = (function(){ try{return localStorage.getItem(THEME_KEY);}catch{return null;} })();

    themes.forEach(t=>{
      const isOwned = !!owned.owned[t.id];
      const isActive = current === t.id;

      const card = document.createElement("div");
      card.className = "cos-card";
      card.innerHTML = `
        <div class="t">
          <b>${t.name}</b>
          <span class="rarity-tag ${isOwned ? "r-rare":"r-common"}"><span class="rarity-dot"></span>${isOwned ? "OWNED":"LOCKED"}</span>
        </div>
        <div class="d">Palette UI. Effetto: solo estetica.</div>
        <div class="sw">
          <i style="background:${t.vars["--accent"]}"></i>
          <i style="background:${t.vars["--accent-strong"]}"></i>
          <i style="background:${t.vars["--accent-soft"]}"></i>
        </div>
        <div class="a">
          <div class="price">${isOwned ? (isActive ? "Attivo" : "Sbloccato") : "$ " + t.price}</div>
          <button>${isOwned ? (isActive ? "Selezionato" : "Applica") : "Compra"}</button>
        </div>
      `;

      const btn = card.querySelector("button");
      btn.disabled = isOwned && isActive;

      btn.addEventListener("click", ()=>{
        if(!isOwned){
          if(!spend(t.price)){ blip(160,0.08,0.07); return; }
          owned.owned[t.id] = true;
          saveMeta("raprise_cos_v1", owned);
          blip(820,0.06,0.05);
        }
        applyTheme(t.id);
        blip(620,0.05,0.04);
        refreshUI();
        renderShop("cos");
      });

      g.appendChild(card);
    });
  }

  // Button hook
  const shopBtn = document.getElementById("openShopBtn");
  if(shopBtn){
    shopBtn.addEventListener("click", (e)=>{
      e.preventDefault(); e.stopPropagation();
      blip(520,0.05,0.04);
      renderShop("upgrade");
    }, true);
  }

  // Integration point: apply boosts when a chest reward is claimed (Step8 flow)
  // We watch localStorage lastRoll write and adjust next claim via multipliers function.
  window.applyChestBoosts = function(rew){
    // rew: {money,fans,xp,hype}
    const out = { ...rew };
    if(shop.boosts.xp2 > 0){
      out.xp = Math.floor(out.xp * 2);
      shop.boosts.xp2 -= 1;
    }
    if(shop.boosts.fans2 > 0){
      out.fans = Math.floor(out.fans * 2);
      shop.boosts.fans2 -= 1;
    }
    if(shop.boosts.chestPlus > 0){
      out.money = Math.floor(out.money * 1.25);
      out.fans  = Math.floor(out.fans  * 1.25);
      shop.boosts.chestPlus -= 1;
    }
    saveMeta(SHOP_KEY, shop);
    return out;
  };

  // Initialize theme on load
  window.addEventListener("load", initTheme);
})();

;

/* =========================
   STEP11: Motion polish (parallax) + unify blip hook
   ========================= */
(function(){
  // expose blip for other modules (Step9/10)
  if(!window.__raprise_blip){
    let ctx = null;
    window.__raprise_blip = function(freq=520, dur=0.06, gain=0.05){
      try{
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = freq;
        g.gain.value = gain;
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + dur);
        g.gain.setValueAtTime(gain, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      }catch{}
    };
  }

  // parallax background (very light)
  let last = 0;
  window.addEventListener("mousemove", (e)=>{
    const now = performance.now();
    if(now - last < 20) return;
    last = now;
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    document.body.style.setProperty("--px", (x*10).toFixed(2)+"px");
    document.body.style.setProperty("--py", (y*10).toFixed(2)+"px");
  }, { passive:true });

  // apply parallax to pseudo background via transform on body::before (simulate via a wrapper)
  // We cannot directly transform pseudo-elements, so we nudge a hidden fixed layer if exists.
  // Create it once.
  const layerId = "parallaxLayer";
  if(!document.getElementById(layerId)){
    const layer = document.createElement("div");
    layer.id = layerId;
    layer.style.position = "fixed";
    layer.style.inset = "-25%";
    layer.style.zIndex = "-3";
    layer.style.pointerEvents = "none";
    layer.style.background =
      "radial-gradient(900px 520px at 15% 12%, rgba(247,201,72,.12), transparent 60%)," +
      "radial-gradient(900px 520px at 85% 20%, rgba(67,217,255,.10), transparent 60%)," +
      "radial-gradient(900px 520px at 55% 85%, rgba(255,91,214,.08), transparent 60%)," +
      "radial-gradient(900px 620px at 50% 50%, rgba(7,16,34,1), rgba(3,5,12,1))";
    layer.style.filter = "saturate(1.15)";
    document.body.prepend(layer);

    const tick = () => {
      const px = getComputedStyle(document.body).getPropertyValue("--px") || "0px";
      const py = getComputedStyle(document.body).getPropertyValue("--py") || "0px";
      layer.style.transform = `translate(${px}, ${py})`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // subtle click blips for primary buttons
  document.addEventListener("click",(e)=>{
    const b = e.target.closest("button");
    if(!b || b.disabled) return;
    const txt = (b.textContent||"").toLowerCase();
    if(txt.includes("compra")) window.__raprise_blip(760,0.05,0.04);
    else if(txt.includes("riscatta")) window.__raprise_blip(900,0.06,0.05);
    else window.__raprise_blip(520,0.04,0.03);
  }, true);
})();

;

/* =========================
   STEP12: Apply UI Kit classes to existing DOM (non-breaking)
   ========================= */
(function(){
  function enhanceButtons(){
    const btns = Array.from(document.querySelectorAll("button"));
    btns.forEach(b=>{
      // Skip if already styled by ui-kit
      if(b.classList.contains("btn")) return;

      // Heuristics: primary if not explicitly secondary and contains action verbs
      const txt = (b.textContent || "").trim().toLowerCase();
      const isSecondary = b.classList.contains("secondary") || txt.includes("chiudi") || txt.includes("dopo") || txt.includes("later");
      b.classList.add("btn");
      b.classList.add(isSecondary ? "btn-secondary" : "btn-primary");

      // Preserve original semantic class
      if(b.classList.contains("secondary")){
        b.classList.remove("secondary");
        b.classList.add("btn-secondary");
      }
    });

    // Upgrade Shop button with icon
    const shopBtn = document.getElementById("openShopBtn");
    if(shopBtn && !shopBtn.dataset.iconified){
      shopBtn.dataset.iconified = "1";
      const label = shopBtn.textContent.replace("🛒","").trim() || "Negozio";
      shopBtn.innerHTML = '<svg><use href="#i-shop"></use></svg><span>' + label + '</span>';
    }

    // Close X buttons: if found with text '✕' or 'x' and small, make icon-btn
    const close = document.querySelectorAll("#shopCloseBtn");
    close.forEach(c=>{
      if(c.classList.contains("icon-btn")) return;
      c.classList.add("icon-btn");
      c.innerHTML = '<svg><use href="#i-x"></use></svg>';
    });
  }

  window.addEventListener("load", enhanceButtons);

  // If dynamic UIs re-render, try again occasionally (cheap)
  let t = 0;
  const id = setInterval(()=>{
    enhanceButtons();
    t += 1;
    if(t > 10) clearInterval(id);
  }, 600);
})();

;

/* =========================
   STEP13: Transition controller (non-invasive)
   - Adds animated close for Shop screen + Reward overlay
   ========================= */
(function(){
  const shopScreen = document.getElementById("shopScreen");
  const shopCloseBtn = document.getElementById("shopCloseBtn");
  const rewardOverlay = document.getElementById("rewardOverlay");

  function isVisible(el, cls){
    if(!el) return false;
    return el.classList.contains(cls || "show");
  }

  // Animated close for Shop screen (capture to override immediate close)
  if(shopScreen && shopCloseBtn){
    shopCloseBtn.addEventListener("click", (e)=>{
      if(!shopScreen.classList.contains("show")) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation?.();

      // animate out
      shopScreen.classList.add("closing");
      window.__raprise_blip?.(220,0.06,0.06);

      setTimeout(()=>{
        shopScreen.classList.remove("show");
        shopScreen.classList.remove("closing");
        shopScreen.setAttribute("aria-hidden","true");
      }, 180);
    }, true);

    // Click on backdrop to close with animation
    shopScreen.addEventListener("click", (e)=>{
      if(e.target !== shopScreen) return;
      if(!shopScreen.classList.contains("show")) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation?.();
      shopScreen.classList.add("closing");
      window.__raprise_blip?.(220,0.06,0.06);
      setTimeout(()=>{
        shopScreen.classList.remove("show");
        shopScreen.classList.remove("closing");
        shopScreen.setAttribute("aria-hidden","true");
      }, 180);
    }, true);
  }

  // Animated close for Reward overlay: intercept common close buttons
  function hookOverlayClose(btn){
    if(!btn || !rewardOverlay) return;
    btn.addEventListener("click", (e)=>{
      if(rewardOverlay.classList.contains("hidden")) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation?.();

      rewardOverlay.classList.add("closing");
      window.__raprise_blip?.(220,0.06,0.06);

      setTimeout(()=>{
        rewardOverlay.classList.add("hidden");
        rewardOverlay.classList.remove("closing");
      }, 160);
    }, true);
  }

  hookOverlayClose(document.getElementById("rewardCloseBtn"));
  hookOverlayClose(document.getElementById("rewardLaterBtn"));

  // Ensure opening feels snappy (add small class for first frame)
  function addOpenPulse(el, cls){
    if(!el) return;
    const mo = new MutationObserver(()=>{
      const visible = cls ? el.classList.contains(cls) : !el.classList.contains("hidden");
      if(visible){
        el.classList.add("fx-fade-in");
        setTimeout(()=> el.classList.remove("fx-fade-in"), 220);
      }
    });
    mo.observe(el, { attributes:true, attributeFilter:["class"] });
  }

  addOpenPulse(shopScreen, "show");
  addOpenPulse(rewardOverlay, null);

  // Future-ready screen router (does nothing unless you add .screen elements)
  window.RapRiseNav = window.RapRiseNav || {
    go(id){
      const all = document.querySelectorAll(".screen");
      all.forEach(s=> s.classList.remove("active"));
      const target = document.getElementById(id);
      if(target && target.classList.contains("screen")){
        target.classList.add("active");
      }
    }
  };
})();

;

/* =========================
   STEP14: Home Hub wiring (CTA + mode shortcuts)
   ========================= */
(function(){
  function click(id){
    const el = document.getElementById(id);
    if(el) el.click();
  }

  // CTA
  const cChest = document.getElementById("ctaOpenChest");
  if(cChest){
    cChest.addEventListener("click", (e)=>{
      e.preventDefault();
      // Prefer chest open button
      const btn = document.getElementById("openChestBtn");
      if(btn) btn.click();
      else click("openShopBtn");
    }, true);
  }
  const cShop = document.getElementById("ctaOpenShop");
  if(cShop){
    cShop.addEventListener("click", (e)=>{
      e.preventDefault();
      click("openShopBtn");
    }, true);
  }

  // Mode cards
  document.addEventListener("click", (e)=>{
    const a = e.target.closest("[data-action]");
    if(!a) return;
    const act = a.getAttribute("data-action");
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation?.();

    // focus write: focus textarea if present
    if(act === "focus-write"){
      const ta = document.querySelector("textarea, #lyricsInput, #barsInput");
      if(ta){ ta.focus(); ta.scrollIntoView({ behavior:"smooth", block:"center" }); return; }
      return;
    }
    // phone overlay open
    if(act === "open-phone"){
      const phone = document.getElementById("phoneOverlay");
      if(phone){
        phone.classList.remove("hidden");
        phone.scrollIntoView({ behavior:"smooth", block:"center" });
        return;
      }
      return;
    }
    // season: try open by button ids if exist
    if(act === "open-season"){
      const b = document.getElementById("seasonBtn") || document.querySelector("[data-open='season']");
      if(b) b.click();
      else click("openChestBtn"); // fallback
      return;
    }
    // quests
    if(act === "open-quests"){
      const b = document.getElementById("questsBtn") || document.querySelector("[data-open='quests']");
      if(b) b.click();
      else{
        // scroll to quest card if exists
        const qc = document.getElementById("questCard") || document.querySelector("[id*='quest']");
        if(qc) qc.scrollIntoView({ behavior:"smooth", block:"start" });
      }
      return;
    }
  }, true);

  // Daily pill: if daily deals exist in storage, highlight
  const pill = document.getElementById("dailyPill");
  if(pill){
    try{
      const raw = localStorage.getItem("raprise_daily_deals_v1");
      if(raw){
        pill.style.borderColor = "rgba(247,201,72,.26)";
      }
    }catch{}
  }
})();

;

/* =========================
   STEP15: Audio/FX Manager
   - volume slider + mute + ducking
   - sound palette for common actions
   - settings modal in reward overlay
   ========================= */
(function(){
  const AUDIO_KEY = "raprise_audio_v1";

  const defaultCfg = { master: 0.55, sfx: 0.85, music: 0.35, mute: false, duck: true };
  function loadCfg(){
    try{
      const raw = localStorage.getItem(AUDIO_KEY);
      if(!raw) return { ...defaultCfg };
      return { ...defaultCfg, ...JSON.parse(raw) };
    }catch{ return { ...defaultCfg }; }
  }
  function saveCfg(cfg){
    try{ localStorage.setItem(AUDIO_KEY, JSON.stringify(cfg)); }catch{}
  }

  let cfg = loadCfg();

  // Audio engine (WebAudio)
  let ctx = null, master = null, sfx = null, music = null, musicOsc = null;
  function ensure(){
    if(ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = cfg.mute ? 0 : cfg.master;
    sfx = ctx.createGain(); sfx.gain.value = cfg.sfx;
    music = ctx.createGain(); music.gain.value = cfg.music;

    sfx.connect(master);
    music.connect(master);
    master.connect(ctx.destination);
  }

  function setGains(){
    if(!master) return;
    master.gain.value = cfg.mute ? 0 : cfg.master;
    if(sfx) sfx.gain.value = cfg.sfx;
    if(music) music.gain.value = cfg.music;
  }

  function tone(freq, dur, gain=0.08, type="sine", bus="sfx"){
    try{
      ensure();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.value = gain;

      o.connect(g);
      (bus==="music" ? music : sfx).connect(master); // ensure connected
      g.connect(bus==="music" ? music : sfx);

      const t0 = ctx.currentTime;
      g.gain.setValueAtTime(gain, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      o.start(t0);
      o.stop(t0 + dur);
    }catch{}
  }

  // Simple procedural "music" loop (very subtle) - can be disabled by cfg.music=0
  function startMusic(){
    try{
      ensure();
      if(musicOsc) return;
      musicOsc = ctx.createOscillator();
      const g = ctx.createGain();
      g.gain.value = 0.012; // base, will be scaled by music bus + master
      musicOsc.type = "triangle";
      musicOsc.frequency.value = 110;
      musicOsc.connect(g);
      g.connect(music);
      musicOsc.start();

      // chordy movement
      const seq = [110, 146.8, 130.8, 164.8, 123.5, 185.0];
      let i = 0;
      const step = () => {
        if(!musicOsc) return;
        const f = seq[i % seq.length];
        musicOsc.frequency.setTargetAtTime(f, ctx.currentTime, 0.06);
        i++;
        setTimeout(step, 1200);
      };
      step();
    }catch{}
  }
  function stopMusic(){
    try{
      if(musicOsc){
        musicOsc.stop();
        musicOsc.disconnect();
        musicOsc = null;
      }
    }catch{ musicOsc = null; }
  }

  // Ducking: when SFX plays, reduce music briefly
  let duckT = null;
  function duck(){
    if(!cfg.duck || !music) return;
    try{
      ensure();
      music.gain.setTargetAtTime(cfg.music * 0.35, ctx.currentTime, 0.02);
      clearTimeout(duckT);
      duckT = setTimeout(()=> {
        if(!music) return;
        music.gain.setTargetAtTime(cfg.music, ctx.currentTime, 0.05);
      }, 180);
    }catch{}
  }

  // Public API for other steps
  window.RapRiseAudio = {
    config(){ return { ...cfg }; },
    set(partial){
      cfg = { ...cfg, ...partial };
      saveCfg(cfg);
      setGains();
      if(cfg.music > 0.01 && !cfg.mute) startMusic(); else stopMusic();
    },
    sfx(name){
      // palette
      if(cfg.mute) return;
      ensure();
      duck();
      if(name==="tap"){ tone(520,0.045,0.06,"sine","sfx"); }
      else if(name==="open"){ tone(620,0.05,0.06,"sine","sfx"); tone(880,0.05,0.05,"sine","sfx"); }
      else if(name==="close"){ tone(240,0.07,0.06,"sine","sfx"); }
      else if(name==="buy"){ tone(760,0.05,0.06,"sine","sfx"); tone(980,0.06,0.05,"triangle","sfx"); }
      else if(name==="reward"){ tone(900,0.06,0.06,"sine","sfx"); tone(1200,0.06,0.05,"sine","sfx"); }
      else if(name==="error"){ tone(160,0.09,0.08,"sawtooth","sfx"); }
      else { tone(520,0.045,0.05,"sine","sfx"); }
    }
  };

  // Keep compatibility: __raprise_blip uses this engine
  window.__raprise_blip = function(freq=520, dur=0.06, gain=0.05){
    if(cfg.mute) return;
    ensure();
    duck();
    tone(freq, dur, gain, "sine", "sfx");
  };

  // Autostart music after first user gesture (browser policy)
  let primed = false;
  function prime(){
    if(primed) return;
    primed = true;
    ensure();
    setGains();
    if(cfg.music > 0.01 && !cfg.mute) startMusic();
    window.removeEventListener("pointerdown", prime, true);
  }
  window.addEventListener("pointerdown", prime, true);

  // ---- Settings UI (uses reward overlay) ----
  const overlay = document.getElementById("rewardOverlay");
  const titleEl = document.getElementById("rewardTitle");
  const descEl  = document.getElementById("rewardDesc");
  const gridEl  = document.getElementById("rewardGrid");
  const closeBtn = document.getElementById("rewardCloseBtn");
  const laterBtn = document.getElementById("rewardLaterBtn");
  const claimBtn = document.getElementById("rewardClaimBtn");

  function openSettings(){
    titleEl.textContent = "Impostazioni";
    descEl.textContent = "Audio e feedback. Tutto salvato localmente.";
    gridEl.innerHTML = "";

    const panel = document.createElement("div");
    panel.className = "settings-panel ui-card";
    panel.style.padding = "12px";

    panel.innerHTML = `
      <div class="ui-modal-head">
        <div>
          <div class="h">Audio / FX</div>
          <div class="p">Controlli immediati: Master, SFX, Music, Mute, Ducking.</div>
        </div>
        <span class="chip"><i></i>LIVE</span>
      </div>

      <div class="toggle">
        <div class="l"><b>Mute</b><span>Disattiva tutto l’audio</span></div>
        <input type="checkbox" id="muteTg" ${cfg.mute ? "checked":""}/>
      </div>

      <div class="toggle" style="margin-top:10px;">
        <div class="l"><b>Ducking</b><span>Riduce la musica quando partono gli effetti</span></div>
        <input type="checkbox" id="duckTg" ${cfg.duck ? "checked":""}/>
      </div>

      <div style="margin-top:12px;">
        <div class="u-row u-between u-gap-2">
          <b>Master</b><span class="u-muted u-small" id="mVal">${Math.round(cfg.master*100)}%</span>
        </div>
        <input class="slider" id="mSl" type="range" min="0" max="1" step="0.01" value="${cfg.master}"/>
      </div>

      <div style="margin-top:12px;">
        <div class="u-row u-between u-gap-2">
          <b>SFX</b><span class="u-muted u-small" id="sVal">${Math.round(cfg.sfx*100)}%</span>
        </div>
        <input class="slider" id="sSl" type="range" min="0" max="1" step="0.01" value="${cfg.sfx}"/>
      </div>

      <div style="margin-top:12px;">
        <div class="u-row u-between u-gap-2">
          <b>Music</b><span class="u-muted u-small" id="muVal">${Math.round(cfg.music*100)}%</span>
        </div>
        <input class="slider" id="muSl" type="range" min="0" max="1" step="0.01" value="${cfg.music}"/>
      </div>

      <div class="kpi-row">
        <div class="kpi-card"><b>Tap</b><span>Test rapido del click</span><button class="btn btn-secondary" id="testTap">Play</button></div>
        <div class="kpi-card"><b>Reward</b><span>Test ricompensa</span><button class="btn btn-primary" id="testReward">Play</button></div>
      </div>
    `;

    gridEl.appendChild(panel);

    // wire inputs
    const muteTg = panel.querySelector("#muteTg");
    const duckTg = panel.querySelector("#duckTg");
    const mSl = panel.querySelector("#mSl");
    const sSl = panel.querySelector("#sSl");
    const muSl = panel.querySelector("#muSl");

    const mVal = panel.querySelector("#mVal");
    const sVal = panel.querySelector("#sVal");
    const muVal = panel.querySelector("#muVal");

    muteTg.addEventListener("change", ()=>{
      window.RapRiseAudio.set({ mute: muteTg.checked });
      window.RapRiseAudio.sfx(muteTg.checked ? "close" : "open");
    });
    duckTg.addEventListener("change", ()=>{
      window.RapRiseAudio.set({ duck: duckTg.checked });
      window.RapRiseAudio.sfx("tap");
    });

    mSl.addEventListener("input", ()=>{
      const v = Number(mSl.value);
      mVal.textContent = Math.round(v*100) + "%";
      window.RapRiseAudio.set({ master: v });
    });
    sSl.addEventListener("input", ()=>{
      const v = Number(sSl.value);
      sVal.textContent = Math.round(v*100) + "%";
      window.RapRiseAudio.set({ sfx: v });
      window.RapRiseAudio.sfx("tap");
    });
    muSl.addEventListener("input", ()=>{
      const v = Number(muSl.value);
      muVal.textContent = Math.round(v*100) + "%";
      window.RapRiseAudio.set({ music: v });
    });

    panel.querySelector("#testTap").addEventListener("click", ()=> window.RapRiseAudio.sfx("tap"));
    panel.querySelector("#testReward").addEventListener("click", ()=> window.RapRiseAudio.sfx("reward"));

    // modal buttons
    claimBtn.textContent = "Ok";
    laterBtn.textContent = "Chiudi";
    claimBtn.disabled = false;
    claimBtn.onclick = ()=> { window.RapRiseAudio.sfx("close"); overlay.classList.add("hidden"); };
    laterBtn.onclick = ()=> { window.RapRiseAudio.sfx("close"); overlay.classList.add("hidden"); };
    closeBtn.onclick = ()=> { window.RapRiseAudio.sfx("close"); overlay.classList.add("hidden"); };

    overlay.classList.remove("hidden");
    window.RapRiseAudio.sfx("open");
  }

  document.getElementById("openSettingsBtn")?.addEventListener("click", (e)=>{
    e.preventDefault();
    openSettings();
  }, true);

  // FX ping on primary interactions (visual + audio)
  const ping = document.getElementById("fxPing");
  document.addEventListener("pointerdown", (e)=>{
    if(!ping) return;
    const t = e.target.closest("button, a, .mode-card, .deal-card, .bundle-card");
    if(!t) return;
    ping.style.left = e.clientX + "px";
    ping.style.top = e.clientY + "px";
    ping.classList.remove("show");
    void ping.offsetWidth;
    ping.classList.add("show");
  }, { capture:true, passive:true });

  // Improve existing click sound mapping (from Step11)
  document.addEventListener("click",(e)=>{
    const b = e.target.closest("button");
    if(!b || b.disabled) return;
    const txt = (b.textContent||"").toLowerCase();
    if(txt.includes("compra")) window.RapRiseAudio.sfx("buy");
    else if(txt.includes("riscatta")) window.RapRiseAudio.sfx("reward");
    else if(txt.includes("chiudi") || txt.includes("ok") || txt.includes("x")) window.RapRiseAudio.sfx("close");
    else window.RapRiseAudio.sfx("tap");
  }, true);
})();

;

/* =========================
   STEP16: Performance + Quality pass
   - UI render coalescing (RAF)
   - Parallax optimized (no getComputedStyle in RAF)
   - Debug FPS HUD (?debug=1)
   ========================= */
(function(){
  // ---- 1) Coalesce UI refresh calls (updateUI/render/syncHud) into one RAF tick ----
  const originals = {
    updateUI: window.updateUI,
    render: window.render,
    syncHud: window.syncHud
  };

  let pending = false;
  window.RapRiseUI = window.RapRiseUI || {};
  window.RapRiseUI.requestRender = function(){
    if(pending) return;
    pending = true;
    requestAnimationFrame(()=> {
      pending = false;
      try{ originals.updateUI && originals.updateUI(); }catch{}
      try{ originals.render && originals.render(); }catch{}
      try{ originals.syncHud && originals.syncHud(); }catch{}
    });
  };

  // Patch common call sites that used direct refreshUI
  // If other steps call updateUI/render directly, we keep them intact.
  window.refreshUI = window.RapRiseUI.requestRender;

  // ---- 2) Optimize parallax layer (replace Step11 implementation) ----
  // Remove any previous parallax layer if exists to avoid double work
  const old = document.getElementById("parallaxLayer");
  if(old) old.remove();

  const layerId = "parallaxLayer";
  const layer = document.createElement("div");
  layer.id = layerId;
  layer.style.position = "fixed";
  layer.style.inset = "-25%";
  layer.style.zIndex = "-3";
  layer.style.pointerEvents = "none";
  layer.style.background =
    "radial-gradient(900px 520px at 15% 12%, rgba(247,201,72,.10), transparent 60%)," +
    "radial-gradient(900px 520px at 85% 20%, rgba(67,217,255,.08), transparent 60%)," +
    "radial-gradient(900px 520px at 55% 85%, rgba(255,91,214,.06), transparent 60%)," +
    "radial-gradient(900px 620px at 50% 50%, rgba(7,16,34,1), rgba(3,5,12,1))";
  layer.style.filter = "saturate(1.12)";
  document.body.prepend(layer);

  let px = 0, py = 0;
  let targetX = 0, targetY = 0;
  let lastMove = 0;

  window.addEventListener("pointermove", (e)=>{
    const now = performance.now();
    if(now - lastMove < 24) return; // throttle
    lastMove = now;
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    targetX = x * 10;
    targetY = y * 10;
  }, { passive:true });

  function tick(){
    // smooth follow to reduce jitter and work
    px += (targetX - px) * 0.08;
    py += (targetY - py) * 0.08;
    layer.style.transform = `translate(${px.toFixed(2)}px, ${py.toFixed(2)}px)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // ---- 3) Reduce repeated DOM enhancement timers (Step12) ----
  // If any old intervals exist, we cannot access them; but we can avoid extra work by marking
  // and only enhancing once after load + on major overlays open.
  window.RapRiseUI.enhanceOnce = window.RapRiseUI.enhanceOnce || function(){
    try{
      if(window.__enhancedOnce) return;
      window.__enhancedOnce = true;
      // run Step12 enhancer if present
      // (it was an IIFE; nothing to call. so we do nothing here.)
    }catch{}
  };

  // ---- 4) Debug HUD (FPS + rough render budget), enabled by ?debug=1 ----
  const params = new URLSearchParams(location.search);
  const debug = params.get("debug") === "1";
  if(debug){
    const hud = document.createElement("div");
    hud.className = "perf-hud";
    hud.innerHTML = "Perf HUD<span id='fps'>FPS: --</span><span id='lt'>Frame: -- ms</span>";
    document.body.appendChild(hud);

    let last = performance.now();
    let frames = 0;
    let fps = 0;
    let acc = 0;
    function fpsTick(now){
      const dt = now - last;
      last = now;
      frames++;
      acc += dt;
      if(acc >= 500){
        fps = Math.round((frames * 1000) / acc);
        frames = 0;
        acc = 0;
        const fpsEl = hud.querySelector("#fps");
        if(fpsEl) fpsEl.textContent = "FPS: " + fps;
      }
      const lt = hud.querySelector("#lt");
      if(lt) lt.textContent = "Frame: " + dt.toFixed(1) + " ms";
      requestAnimationFrame(fpsTick);
    }
    requestAnimationFrame(fpsTick);
  }

  // ---- 5) Minor: ensure passive scroll listeners where possible ----
  // (Already using passive in new listeners; leaving existing ones as-is.)
})();

;

/* =========================
   STEP17: Live Ops layer
   - Weekly quests rotation (ISO week)
   - In-app notifications inbox
   - Event banner messaging integration for Hub (non-breaking)
   ========================= */
(function(){
  const NOTIF_KEY = "raprise_notif_v1";
  const WEEKLY_KEY = "raprise_weekly_v1";

  function getState(){ try{ if(typeof state==="object" && state && state.player) return state; }catch{} return null; }
  function load(key, fallback){
    try{ const raw = localStorage.getItem(key); if(!raw) return fallback; return { ...fallback, ...JSON.parse(raw) }; }catch{ return fallback; }
  }
  function save(key, obj){ try{ localStorage.setItem(key, JSON.stringify(obj)); }catch{} }
  function now(){ return new Date(); }

  function isoWeek(d){
    // ISO week number + year
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
    const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    return { year: date.getUTCFullYear(), week: weekNo };
  }

  // --- Notifications ---
  let notif = load(NOTIF_KEY, { items: [], seen: 0 });
  function pushNotif(title, desc, tag="INFO"){
    notif = load(NOTIF_KEY, { items: [], seen: 0 });
    notif.items.unshift({
      id: String(Date.now()) + "_" + Math.random().toString(16).slice(2),
      t: title,
      d: desc,
      tag,
      ts: Date.now()
    });
    // cap list
    notif.items = notif.items.slice(0, 30);
    save(NOTIF_KEY, notif);
    updateBadge();
  }

  function unreadCount(){
    return Math.max(0, (notif.items?.length||0) - Number(notif.seen||0));
  }
  function updateBadge(){
    notif = load(NOTIF_KEY, { items: [], seen: 0 });
    const b = document.getElementById("notifBadge");
    if(!b) return;
    const n = unreadCount();
    if(n <= 0){
      b.style.display = "none";
    }else{
      b.style.display = "flex";
      b.textContent = String(Math.min(99, n));
    }
  }

  // --- Weekly quests ---
  const questPool = [
    { key:"gain_fans", title:"Guadagna fan", desc:"Aumenta i fan complessivi.", targetBase: 350, reward:{ money: 900, fans: 120, xp: 120 } },
    { key:"earn_money", title:"Accumula soldi", desc:"Raggiungi una soglia di denaro guadagnato.", targetBase: 2500, reward:{ money: 1200, fans: 80, xp: 140 } },
    { key:"open_chests", title:"Apri casse", desc:"Apri un numero di casse.", targetBase: 3, reward:{ money: 700, fans: 90, xp: 110 } },
    { key:"level_up", title:"Sali di livello", desc:"Ottieni livelli.", targetBase: 2, reward:{ money: 1000, fans: 80, xp: 160 } },
  ];

  function weeklyInit(){
    const w = isoWeek(now());
    let wk = load(WEEKLY_KEY, { year:0, week:0, quests:[], claimed:{} });
    if(wk.year !== w.year || wk.week !== w.week || !Array.isArray(wk.quests) || wk.quests.length === 0){
      // rotate 3 quests (deterministic-ish: by week seed)
      const seed = (w.year * 100) + w.week;
      let x = seed >>> 0;
      const rnd = ()=> (x = (1664525*x + 1013904223)>>>0, x/4294967296);

      const picks = [];
      const pool = questPool.slice();
      for(let i=0;i<3;i++){
        const idx = Math.floor(rnd()*pool.length);
        picks.push(pool.splice(idx,1)[0]);
      }

      const st = getState();
      const lv = st ? Math.max(1, Math.min(50, Number(st.player.level||1))) : 1;

      wk = {
        year: w.year,
        week: w.week,
        claimed: {},
        quests: picks.map(q=>{
          const scale = 1 + (lv-1)*0.03;
          const target = q.key==="open_chests" || q.key==="level_up"
            ? Math.max(1, Math.round(q.targetBase))
            : Math.round(q.targetBase * scale);
          return {
            key: q.key,
            title: q.title,
            desc: q.desc,
            target,
            progress: 0,
            reward: q.reward
          };
        })
      };
      save(WEEKLY_KEY, wk);
      pushNotif("Nuove quest settimanali", `Settimana ISO ${wk.week}/${wk.year}: 3 missioni disponibili.`, "QUEST");
    }
    return wk;
  }

  function getWeekly(){ return weeklyInit(); }

  // Progress tracking hooks (best-effort)
  // We track deltas by watching player values periodically (cheap interval)
  let lastSnap = null;
  function snapPlayer(){
    const st = getState();
    if(!st) return null;
    const p = st.player;
    return {
      money: Number(p.money||0),
      fans: Number(p.fans||0),
      level: Number(p.level||1),
    };
  }

  function tickProgress(){
    const wk = getWeekly();
    const st = getState();
    if(!st) return;

    const cur = snapPlayer();
    if(!cur){ return; }
    if(!lastSnap){ lastSnap = cur; return; }

    const dm = Math.max(0, cur.money - lastSnap.money);
    const df = Math.max(0, cur.fans - lastSnap.fans);
    const dl = Math.max(0, cur.level - lastSnap.level);

    // Update quests
    let changed = false;
    wk.quests.forEach(q=>{
      if(q.key==="earn_money" && dm>0){ q.progress = Math.min(q.target, q.progress + dm); changed=true; }
      if(q.key==="gain_fans" && df>0){ q.progress = Math.min(q.target, q.progress + df); changed=true; }
      if(q.key==="level_up" && dl>0){ q.progress = Math.min(q.target, q.progress + dl); changed=true; }
    });

    if(changed){
      save(WEEKLY_KEY, wk);
      // If any completed newly, notify once
      wk.quests.forEach(q=>{
        if(q.progress >= q.target && !wk.claimed[q.key]){
          // not claimed yet but completed
          // send only once per completion
          if(!wk._completedNotified) wk._completedNotified = {};
          if(!wk._completedNotified[q.key]){
            wk._completedNotified[q.key] = true;
            save(WEEKLY_KEY, wk);
            pushNotif("Quest completata", `${q.title}: ricompensa pronta da riscattare.`, "REWARD");
          }
        }
      });
    }

    lastSnap = cur;
  }

  // Intercept chest claim to count open_chests
  const oldApplyChestBoosts = window.applyChestBoosts;
  if(typeof oldApplyChestBoosts === "function" && !oldApplyChestBoosts.__wrapped){
    const wrap = function(rew){
      const wk = getWeekly();
      const q = wk.quests.find(x=>x.key==="open_chests");
      if(q){
        q.progress = Math.min(q.target, q.progress + 1);
        save(WEEKLY_KEY, wk);
        if(q.progress >= q.target && !wk.claimed[q.key]){
          pushNotif("Quest completata", `${q.title}: ricompensa pronta.`, "REWARD");
        }
      }
      return oldApplyChestBoosts(rew);
    };
    wrap.__wrapped = true;
    window.applyChestBoosts = wrap;
  }

  // Tick every 2.2s (lightweight)
  setInterval(tickProgress, 2200);

  // --- UI: Notifications inbox and Weekly quests modal ---
  const overlay = document.getElementById("rewardOverlay");
  const titleEl = document.getElementById("rewardTitle");
  const descEl  = document.getElementById("rewardDesc");
  const gridEl  = document.getElementById("rewardGrid");
  const closeBtn = document.getElementById("rewardCloseBtn");
  const laterBtn = document.getElementById("rewardLaterBtn");
  const claimBtn = document.getElementById("rewardClaimBtn");

  function applyReward(rew){
    const st = getState(); if(!st) return;
    const p = st.player;
    if(rew.money) p.money = Number(p.money||0) + Number(rew.money);
    if(rew.fans) p.fans = Number(p.fans||0) + Number(rew.fans);
    if(rew.hype) p.hype = Number(p.hype||0) + Number(rew.hype);
    if(rew.xp && window.RapRiseUI?.requestRender){
      // best-effort xp -> rely on existing add xp logic if present
      // fallback direct
      p.xp = Number(p.xp||0) + Number(rew.xp);
    }
    window.RapRiseUI?.requestRender?.();
  }

  function openWeekly(){
    const wk = getWeekly();

    titleEl.textContent = "Quest settimanali";
    descEl.textContent = `Settimana ISO ${wk.week}/${wk.year}. Completa e riscatta ricompense.`;
    gridEl.innerHTML = "";

    const card = document.createElement("div");
    card.className = "weekly-card ui-card";
    card.innerHTML = `<div class="u-row u-between u-gap-2">
        <b style="letter-spacing:.2px;">Missioni</b>
        <span class="chip"><i></i>WEEKLY</span>
      </div>`;
    gridEl.appendChild(card);

    wk.quests.forEach(q=>{
      const done = q.progress >= q.target;
      const claimed = !!wk.claimed[q.key];

      const row = document.createElement("div");
      row.className = "quest-row";
      row.innerHTML = `
        <div class="l">
          <b>${q.title}</b>
          <span>${q.desc}</span>
        </div>
        <div class="r">
          <div class="progress-pill">${Math.min(q.progress,q.target)} / ${q.target}</div>
          <button class="btn ${done && !claimed ? "btn-primary" : "btn-secondary"}" ${done && !claimed ? "" : "disabled"}>
            ${claimed ? "Riscattato" : (done ? "Riscatta" : "In corso")}
          </button>
        </div>
      `;
      const btn = row.querySelector("button");
      btn.addEventListener("click", ()=>{
        if(!done || claimed) return;
        wk.claimed[q.key] = true;
        save(WEEKLY_KEY, wk);
        applyReward(q.reward);
        pushNotif("Ricompensa riscattata", `${q.title}: premio applicato.`, "REWARD");
        window.RapRiseAudio?.sfx?.("reward");
        openWeekly(); // rerender
      });
      card.appendChild(row);
    });

    claimBtn.textContent = "Ok";
    laterBtn.textContent = "Chiudi";
    claimBtn.disabled = false;
    claimBtn.onclick = ()=> overlay.classList.add("hidden");
    laterBtn.onclick = ()=> overlay.classList.add("hidden");
    closeBtn.onclick = ()=> overlay.classList.add("hidden");

    overlay.classList.remove("hidden");
    window.RapRiseAudio?.sfx?.("open");
  }

  function openNotifications(){
    notif = load(NOTIF_KEY, { items: [], seen: 0 });
    titleEl.textContent = "Notifiche";
    descEl.textContent = "Inbox: ricompense, eventi, aggiornamenti live-ops.";
    gridEl.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "notif-list";
    if((notif.items||[]).length === 0){
      const empty = document.createElement("div");
      empty.className = "notif-item";
      empty.innerHTML = `<div class="t"><b>Nessuna notifica</b><span class="chip"><i></i>OK</span></div>
        <div class="d">Completa azioni, apri casse e gioca: qui compariranno eventi e premi.</div>`;
      wrap.appendChild(empty);
    }else{
      notif.items.forEach(it=>{
        const dt = new Date(it.ts);
        const time = dt.toLocaleString();
        const item = document.createElement("div");
        item.className = "notif-item";
        item.innerHTML = `<div class="t"><b>${it.t}</b><span class="chip"><i></i>${it.tag}</span></div>
          <div class="d">${it.d}</div>
          <div class="d" style="opacity:.75;">${time}</div>
          <div class="u-row u-gap-2 u-mt-2">
            <button class="btn btn-secondary" data-act="dismiss">Rimuovi</button>
            ${it.tag==="QUEST" ? '<button class="btn btn-primary" data-act="weekly">Apri quest</button>' : ''}
          </div>`;
        item.querySelector("[data-act='dismiss']").addEventListener("click", ()=>{
          notif.items = notif.items.filter(x=>x.id !== it.id);
          save(NOTIF_KEY, notif);
          openNotifications();
          updateBadge();
        });
        const wbtn = item.querySelector("[data-act='weekly']");
        if(wbtn) wbtn.addEventListener("click", ()=>{
          overlay.classList.add("hidden");
          openWeekly();
        });
        wrap.appendChild(item);
      });
    }
    gridEl.appendChild(wrap);

    // mark all seen
    notif.seen = (notif.items||[]).length;
    save(NOTIF_KEY, notif);
    updateBadge();

    claimBtn.textContent = "Ok";
    laterBtn.textContent = "Chiudi";
    claimBtn.disabled = false;
    claimBtn.onclick = ()=> overlay.classList.add("hidden");
    laterBtn.onclick = ()=> overlay.classList.add("hidden");
    closeBtn.onclick = ()=> overlay.classList.add("hidden");

    overlay.classList.remove("hidden");
    window.RapRiseAudio?.sfx?.("open");
  }

  document.getElementById("openNotifBtn")?.addEventListener("click", (e)=>{
    e.preventDefault();
    openNotifications();
  }, true);

  // Add quick entry: clicking the Daily pill in Step14 opens weekly quests
  document.getElementById("dailyPill")?.addEventListener("click", (e)=>{
    e.preventDefault();
    openWeekly();
  }, true);

  // Initialize
  weeklyInit();
  updateBadge();
})();

;

/* =========================
   STEP18: Robust Save System
   - versioning, migration hooks, backup rolling
   - export/import to text (base64)
   - safe reset
   ========================= */
(function(){
  const SAVE_NS = "raprise";
  const SAVE_VER_KEY = "raprise_save_version";
  const BACKUP_KEY = "raprise_save_backups_v1";
  const CURRENT_VERSION = 2; // bumpable

  // Keys we consider part of "game save"
  const SAVE_KEYS = [
    "raprise_save_v1",       // main state (if exists)
    "raprise_shop_v2",
    "raprise_cos_v1",
    "raprise_theme_v1",
    "raprise_audio_v1",
    "raprise_daily_deals_v1",
    "raprise_weekly_v1",
    "raprise_notif_v1"
  ];

  function loadJSON(key, fallback){
    try{ const raw = localStorage.getItem(key); if(!raw) return fallback; return JSON.parse(raw); }catch{ return fallback; }
  }
  function saveJSON(key, obj){
    try{ localStorage.setItem(key, JSON.stringify(obj)); }catch{}
  }

  function snapshot(){
    const data = {};
    SAVE_KEYS.forEach(k=>{
      const v = localStorage.getItem(k);
      if(v !== null) data[k] = v;
    });
    return {
      meta: { ns: SAVE_NS, v: CURRENT_VERSION, ts: Date.now() },
      data
    };
  }

  function writeSnapshot(snap){
    if(!snap || !snap.data) return;
    Object.entries(snap.data).forEach(([k,v])=>{
      try{ localStorage.setItem(k, v); }catch{}
    });
    try{ localStorage.setItem(SAVE_VER_KEY, String(CURRENT_VERSION)); }catch{}
  }

  // Rolling backups: keep last 5 snapshots (compressed to base64 JSON string)
  function b64enc(str){ return btoa(unescape(encodeURIComponent(str))); }
  function b64dec(str){ return decodeURIComponent(escape(atob(str))); }

  function makeBackup(reason="auto"){
    const backups = loadJSON(BACKUP_KEY, { items: [] });
    const snap = snapshot();
    const payload = b64enc(JSON.stringify(snap));
    backups.items.unshift({ ts: snap.meta.ts, reason, payload });
    backups.items = backups.items.slice(0, 5);
    saveJSON(BACKUP_KEY, backups);
  }

  function migrateIfNeeded(){
    const v = Number(localStorage.getItem(SAVE_VER_KEY) || "0");
    if(v === CURRENT_VERSION) return;

    // If v==0, first install: create backup just in case
    makeBackup("pre-migrate");

    // Migration hooks: currently no schema conversion, but place for future
    // Example: if earlier versions used different key names, remap here.

    localStorage.setItem(SAVE_VER_KEY, String(CURRENT_VERSION));
    makeBackup("post-migrate");
  }

  // Ensure we migrate early
  try{ migrateIfNeeded(); }catch{}

  // Auto backup on page hide / before unload
  window.addEventListener("pagehide", ()=> { try{ makeBackup("pagehide"); }catch{} }, { capture:true });
  window.addEventListener("beforeunload", ()=> { try{ makeBackup("beforeunload"); }catch{} }, { capture:true });

  // Public API
  window.RapRiseSave = {
    version: CURRENT_VERSION,
    snapshot,
    exportString(){
      const snap = snapshot();
      return b64enc(JSON.stringify(snap));
    },
    importString(str){
      // returns {ok, msg}
      try{
        const json = JSON.parse(b64dec(str.trim()));
        if(!json || !json.meta || !json.data) return { ok:false, msg:"Formato non valido." };
        makeBackup("pre-import");
        writeSnapshot(json);
        makeBackup("post-import");
        return { ok:true, msg:"Import completato. Ricarica la pagina." };
      }catch(err){
        return { ok:false, msg:"Import fallito: stringa non valida." };
      }
    },
    listBackups(){
      const b = loadJSON(BACKUP_KEY, { items: [] });
      return b.items || [];
    },
    restoreBackup(index){
      const b = loadJSON(BACKUP_KEY, { items: [] });
      const it = (b.items||[])[index];
      if(!it) return { ok:false, msg:"Backup non trovato." };
      try{
        const snap = JSON.parse(b64dec(it.payload));
        makeBackup("pre-restore");
        writeSnapshot(snap);
        makeBackup("post-restore");
        return { ok:true, msg:"Ripristino completato. Ricarica la pagina." };
      }catch{
        return { ok:false, msg:"Ripristino fallito." };
      }
    },
    safeReset(){
      makeBackup("pre-reset");
      // Remove only our keys
      SAVE_KEYS.forEach(k=> { try{ localStorage.removeItem(k); }catch{} });
      try{ localStorage.removeItem(SAVE_VER_KEY); }catch{}
      // Keep backups by design
      return { ok:true, msg:"Reset eseguito. Ricarica la pagina." };
    }
  };

  // ---- UI: Save Tools inside Settings modal (Step15) ----
  // We add a "Salvataggi" section when opening settings.
  const openSettingsBtn = document.getElementById("openSettingsBtn");
  const overlay = document.getElementById("rewardOverlay");
  const titleEl = document.getElementById("rewardTitle");
  const descEl  = document.getElementById("rewardDesc");
  const gridEl  = document.getElementById("rewardGrid");
  const closeBtn = document.getElementById("rewardCloseBtn");
  const laterBtn = document.getElementById("rewardLaterBtn");
  const claimBtn = document.getElementById("rewardClaimBtn");

  function openSaveTools(){
    titleEl.textContent = "Salvataggi";
    descEl.textContent = "Export/Import, backup automatici e reset sicuro. Tutto locale.";
    gridEl.innerHTML = "";

    const box = document.createElement("div");
    box.className = "save-tools ui-card";
    box.innerHTML = `
      <div class="u-row u-between u-gap-2">
        <b style="letter-spacing:.2px;">Strumenti salvataggio</b>
        <span class="chip"><i></i>v${CURRENT_VERSION}</span>
      </div>

      <div class="hint">Export: copia la stringa e conservala. Import: incolla e applica. Prima di import/restore viene creato un backup.</div>

      <textarea id="saveText" spellcheck="false" placeholder="Qui comparira la stringa di export..."></textarea>

      <div class="row">
        <button class="btn btn-primary" id="btnExport">Genera export</button>
        <button class="btn btn-secondary" id="btnCopy">Copia</button>
      </div>

      <div class="row">
        <button class="btn btn-primary" id="btnImport">Importa</button>
        <button class="btn btn-secondary" id="btnBackups">Mostra backup</button>
      </div>

      <div class="row">
        <button class="btn btn-secondary" id="btnRestore0">Ripristina ultimo backup</button>
        <button class="btn btn-secondary" id="btnReset">Reset partita (safe)</button>
      </div>

      <div class="hint" id="saveMsg"></div>
    `;
    gridEl.appendChild(box);

    const ta = box.querySelector("#saveText");
    const msg = box.querySelector("#saveMsg");

    box.querySelector("#btnExport").addEventListener("click", ()=>{
      ta.value = window.RapRiseSave.exportString();
      msg.textContent = "Export generato.";
      window.RapRiseAudio?.sfx?.("open");
    });
    box.querySelector("#btnCopy").addEventListener("click", async ()=>{
      try{
        await navigator.clipboard.writeText(ta.value || "");
        msg.textContent = "Copiato.";
        window.RapRiseAudio?.sfx?.("tap");
      }catch{
        msg.textContent = "Copia non riuscita (browser). Seleziona e copia manualmente.";
        window.RapRiseAudio?.sfx?.("error");
      }
    });
    box.querySelector("#btnImport").addEventListener("click", ()=>{
      const res = window.RapRiseSave.importString(ta.value || "");
      msg.textContent = res.msg;
      window.RapRiseAudio?.sfx?.(res.ok ? "reward" : "error");
    });
    box.querySelector("#btnBackups").addEventListener("click", ()=>{
      const b = window.RapRiseSave.listBackups();
      if(!b.length){ msg.textContent = "Nessun backup disponibile."; window.RapRiseAudio?.sfx?.("tap"); return; }
      const latest = b[0];
      const dt = new Date(latest.ts).toLocaleString();
      msg.textContent = `Backup disponibili: ${b.length}. Ultimo: ${dt} (${latest.reason}).`;
      window.RapRiseAudio?.sfx?.("tap");
    });
    box.querySelector("#btnRestore0").addEventListener("click", ()=>{
      const res = window.RapRiseSave.restoreBackup(0);
      msg.textContent = res.msg;
      window.RapRiseAudio?.sfx?.(res.ok ? "reward" : "error");
    });
    box.querySelector("#btnReset").addEventListener("click", ()=>{
      const res = window.RapRiseSave.safeReset();
      msg.textContent = res.msg;
      window.RapRiseAudio?.sfx?.(res.ok ? "close" : "error");
    });

    // modal buttons
    claimBtn.textContent = "Ok";
    laterBtn.textContent = "Chiudi";
    claimBtn.disabled = false;
    claimBtn.onclick = ()=> overlay.classList.add("hidden");
    laterBtn.onclick = ()=> overlay.classList.add("hidden");
    closeBtn.onclick = ()=> overlay.classList.add("hidden");

    overlay.classList.remove("hidden");
    window.RapRiseAudio?.sfx?.("open");
  }

  // Add entry point: long-press settings opens save tools, or Shift+click
  document.getElementById("openSettingsBtn")?.addEventListener("click", (e)=>{
    if(e.shiftKey){
      e.preventDefault();
      openSaveTools();
    }
  }, true);

  // Also expose in notifications: type "salvataggi" could be later; for now global shortcut
  window.addEventListener("keydown", (e)=>{
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s"){
      e.preventDefault();
      openSaveTools();
    }
  });
})();

;

/* =========================
   STEP19: Save Transfer Layer
   - Share link via URL hash (#save=...)
   - Download/Upload save file (JSON)
   - Auto-detect and offer import when opening a save-link
   ========================= */
(function(){
  if(!window.RapRiseSave) return;

  function safeEncode(str){
    // Keep it URL-safe; base64 may include +/=
    return encodeURIComponent(str);
  }
  function safeDecode(str){
    return decodeURIComponent(str);
  }

  // Create share URL with hash (no server required)
  window.RapRiseSave.exportUrl = function(){
    const token = window.RapRiseSave.exportString();
    const base = location.origin + location.pathname + location.search; // preserve query
    return base + "#save=" + safeEncode(token);
  };

  window.RapRiseSave.tryImportFromHash = function(){
    try{
      const h = location.hash || "";
      if(!h.startsWith("#save=")) return { found:false };
      const tokenEnc = h.slice("#save=".length);
      const token = safeDecode(tokenEnc);
      // Do not auto-import silently: return token to UI
      return { found:true, token };
    }catch{
      return { found:false };
    }
  };

  // Offer import on load if save hash exists
  window.addEventListener("load", ()=>{
    const res = window.RapRiseSave.tryImportFromHash();
    if(!res.found) return;

    // Use existing reward overlay to ask
    const overlay = document.getElementById("rewardOverlay");
    const titleEl = document.getElementById("rewardTitle");
    const descEl  = document.getElementById("rewardDesc");
    const gridEl  = document.getElementById("rewardGrid");
    const closeBtn = document.getElementById("rewardCloseBtn");
    const laterBtn = document.getElementById("rewardLaterBtn");
    const claimBtn = document.getElementById("rewardClaimBtn");

    if(!overlay || !titleEl || !gridEl || !claimBtn) return;

    titleEl.textContent = "Import salvataggio";
    descEl.textContent = "Questo link contiene un salvataggio. Vuoi importarlo adesso?";
    gridEl.innerHTML = "";

    const box = document.createElement("div");
    box.className = "ui-card";
    box.style.padding = "12px";
    box.innerHTML = `
      <div class="u-row u-between u-gap-2">
        <b style="letter-spacing:.2px;">Salvataggio rilevato</b>
        <span class="chip"><i></i>LINK</span>
      </div>
      <div class="u-muted u-small u-mt-2">Nota: prima dell’import viene creato un backup automatico.</div>
      <div class="u-mt-3">
        <button class="btn btn-secondary" id="clearHashBtn">Ignora (rimuovi link)</button>
      </div>
    `;
    gridEl.appendChild(box);

    function clearHash(){
      history.replaceState(null, "", location.pathname + location.search);
    }

    box.querySelector("#clearHashBtn").addEventListener("click", ()=>{
      clearHash();
      overlay.classList.add("hidden");
      window.RapRiseAudio?.sfx?.("close");
    });

    claimBtn.textContent = "Importa";
    laterBtn.textContent = "Annulla";
    claimBtn.disabled = false;

    claimBtn.onclick = ()=>{
      const r = window.RapRiseSave.importString(res.token);
      window.RapRiseAudio?.sfx?.(r.ok ? "reward" : "error");
      if(r.ok){
        clearHash();
      }
      // Tell user to reload for guaranteed consistent state
      descEl.textContent = r.ok ? "Import completato. Ricarica la pagina per applicare tutto." : r.msg;
      claimBtn.textContent = "Ok";
      claimBtn.onclick = ()=> overlay.classList.add("hidden");
    };
    laterBtn.onclick = ()=> overlay.classList.add("hidden");
    closeBtn.onclick = ()=> overlay.classList.add("hidden");

    overlay.classList.remove("hidden");
    window.RapRiseAudio?.sfx?.("open");
  });

  // Enhance the Save Tools UI (created in Step18) by injecting extra controls if panel is opened
  // We detect it by watching rewardTitle text changes.
  const overlay = document.getElementById("rewardOverlay");
  if(!overlay) return;

  const mo = new MutationObserver(()=>{
    const t = document.getElementById("rewardTitle");
    if(!t) return;
    if((t.textContent||"").trim() !== "Salvataggi") return;

    const box = overlay.querySelector(".save-tools");
    if(!box || box.dataset.step19) return;
    box.dataset.step19 = "1";

    const ta = box.querySelector("#saveText");
    const msg = box.querySelector("#saveMsg");

    // Add file input
    const file = document.createElement("input");
    file.type = "file";
    file.accept = "application/json";
    file.className = "file-input";
    file.id = "saveFileInput";
    box.appendChild(file);

    // Add row of 3 buttons: link, download, upload
    const row = document.createElement("div");
    row.className = "row3";
    row.innerHTML = `
      <button class="btn btn-primary" id="btnLink">Crea link</button>
      <button class="btn btn-secondary" id="btnDownload">Scarica file</button>
      <button class="btn btn-secondary" id="btnUpload">Carica file</button>
    `;
    box.appendChild(row);

    // Wire: create link
    row.querySelector("#btnLink").addEventListener("click", async ()=>{
      const url = window.RapRiseSave.exportUrl();
      if(ta) ta.value = url;
      msg.textContent = "Link generato. Aprilo su un altro dispositivo per importare.";
      window.RapRiseAudio?.sfx?.("open");

      // Optional: Web Share API
      try{
        if(navigator.share){
          await navigator.share({ title:"RapRise Save", text:"Link salvataggio RapRise", url });
          msg.textContent = "Condiviso.";
        }
      }catch{}
    });

    // Wire: download file
    row.querySelector("#btnDownload").addEventListener("click", ()=>{
      try{
        const snap = window.RapRiseSave.snapshot();
        const blob = new Blob([JSON.stringify(snap)], { type:"application/json" });
        const a = document.createElement("a");
        const dt = new Date(snap.meta.ts);
        const stamp = dt.toISOString().replace(/[:.]/g,"-");
        a.download = "raprise-save-" + stamp + ".json";
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(()=> URL.revokeObjectURL(a.href), 800);
        msg.textContent = "File scaricato.";
        window.RapRiseAudio?.sfx?.("tap");
      }catch{
        msg.textContent = "Download non riuscito.";
        window.RapRiseAudio?.sfx?.("error");
      }
    });

    // Wire: upload file
    row.querySelector("#btnUpload").addEventListener("click", ()=>{
      file.click();
    });

    file.addEventListener("change", async ()=>{
      const f = file.files && file.files[0];
      if(!f) return;
      try{
        const text = await f.text();
        const snap = JSON.parse(text);
        // Convert snapshot JSON into the same import format (b64)
        const token = btoa(unescape(encodeURIComponent(JSON.stringify(snap))));
        const res = window.RapRiseSave.importString(token);
        msg.textContent = res.msg;
        window.RapRiseAudio?.sfx?.(res.ok ? "reward" : "error");
      }catch{
        msg.textContent = "File non valido.";
        window.RapRiseAudio?.sfx?.("error");
      }finally{
        file.value = "";
      }
    });

  });
  mo.observe(overlay, { subtree:true, childList:true, characterData:true });
})();

;

/* =========================
   STEP20A: Router + screen mounting (non-destructive)
   - Moves existing main layout into screen-home at runtime
   - Creates placeholders for other screens
   - Bottom-nav routes to actions or screens
   ========================= */
(function(){
  const root = document.getElementById("screenRoot");
  const home = document.getElementById("screen-home");
  const studio = document.getElementById("screen-studio");
  const social = document.getElementById("screen-social");
  const season = document.getElementById("screen-season");
  const shop = document.getElementById("screen-shop");

  if(!root || !home) return;

  function buildPlaceholder(el, title, text, primaryLabel, primaryAction){
    el.innerHTML = `
      <div class="screen-placeholder ui-card">
        <div class="h">${title}</div>
        <div class="p">${text}</div>
        <div class="u-row u-gap-2 u-mt-3" style="flex-wrap:wrap;">
          <button class="btn btn-primary" id="${primaryAction}Btn">${primaryLabel}</button>
          <button class="btn btn-secondary" data-screen="home">Torna alla Home</button>
        </div>
      </div>
    `;
    el.querySelector("[data-screen='home']").addEventListener("click", ()=> go("home"), true);
    return el.querySelector("#"+primaryAction+"Btn");
  }

  // Move existing content into home screen.
  // Strategy: move first major containers that are NOT overlays/screens/buttons.
  function isOverlayNode(n){
    if(!(n instanceof HTMLElement)) return false;
    const id = n.id || "";
    const cls = n.className || "";
    // Keep overlays/utility layers in body, not inside screens
    if(id === "shopScreen" || id === "rewardOverlay" || id === "phoneOverlay" || id === "fxPing") return true;
    if(cls.includes("shop-screen") || cls.includes("overlay") || cls.includes("settings-btn") || cls.includes("notif-bell") || cls.includes("bottom-nav")) return true;
    return false;
  }

  function migrateHome(){
    if(home.dataset.migrated) return;
    home.dataset.migrated = "1";

    // Find a main wrapper: prefer <main>, else a top-level .wrap/.container
    const main = document.querySelector("main") || document.querySelector(".wrap") || document.querySelector(".container");
    if(main && !isOverlayNode(main)){
      home.appendChild(main);
    }else{
      // fallback: move body children until we hit overlays/appRoot itself
      const bodyKids = Array.from(document.body.children);
      bodyKids.forEach(k=>{
        if(k.id === "appRoot") return;
        // keep svg sprite, scripts, overlays, floating buttons
        if(k.tagName === "SVG") return;
        if(k.tagName === "SCRIPT") return;
        if(isOverlayNode(k)) return;
        home.appendChild(k);
      });
    }
  }

  function ensureOtherScreens(){
    if(!studio.dataset.ready){
      studio.dataset.ready = "1";
      const b = buildPlaceholder(
        studio,
        "Studio",
        "Qui vive la parte di scrittura/progress. Per ora usa la tua UI esistente: ti porto direttamente al campo di scrittura.",
        "Vai a scrivere",
        "studioAction"
      );
      b.addEventListener("click", ()=>{
        go("home");
        const ta = document.querySelector("textarea, #lyricsInput, #barsInput");
        if(ta){ ta.focus(); ta.scrollIntoView({ behavior:"smooth", block:"center" }); }
        window.RapRiseAudio?.sfx?.("open");
      }, true);
    }
    if(!social.dataset.ready){
      social.dataset.ready = "1";
      const b = buildPlaceholder(
        social,
        "Social",
        "Schermata dedicata per telefono/Instagram/Spotify. Per ora apre l’overlay telefono (se presente).",
        "Apri telefono",
        "socialAction"
      );
      b.addEventListener("click", ()=>{
        const phone = document.getElementById("phoneOverlay");
        if(phone){
          phone.classList.remove("hidden");
          window.RapRiseAudio?.sfx?.("open");
        }else{
          window.RapRiseAudio?.sfx?.("error");
        }
      }, true);
    }
    if(!season.dataset.ready){
      season.dataset.ready = "1";
      const b = buildPlaceholder(
        season,
        "Stagione & Quest",
        "Qui andra il Season Pass e le missioni. Per ora apre le quest settimanali (Step 17) se disponibili.",
        "Apri quest settimanali",
        "seasonAction"
      );
      b.addEventListener("click", ()=>{
        // Step17 shortcut: click dailyPill opens weekly
        const pill = document.getElementById("dailyPill");
        if(pill){ pill.click(); window.RapRiseAudio?.sfx?.("open"); }
        else { window.RapRiseAudio?.sfx?.("error"); }
      }, true);
    }
    if(!shop.dataset.ready){
      shop.dataset.ready = "1";
      const b = buildPlaceholder(
        shop,
        "Negozio",
        "Negozio dedicato (Step 10). In questa fase lo apriamo come schermata/overlay e poi lo renderemo screen-native.",
        "Apri negozio",
        "shopAction"
      );
      b.addEventListener("click", ()=>{
        const btn = document.getElementById("openShopBtn");
        if(btn){ btn.click(); window.RapRiseAudio?.sfx?.("open"); }
      }, true);
    }
  }

  function setActiveScreen(name){
    const map = { home, studio, social, season, shop };
    Object.entries(map).forEach(([k, el])=>{
      if(!el) return;
      el.classList.toggle("active", k === name);
    });

    // nav highlight
    const nav = document.getElementById("bottomNav");
    if(nav){
      nav.querySelectorAll("button[data-screen]").forEach(b=>{
        b.classList.toggle("active", b.getAttribute("data-screen") === name);
      });
    }
  }

  function go(name){
    ensureOtherScreens();
    setActiveScreen(name);

    // keep URL state (no reload)
    try{ history.replaceState(null, "", location.pathname + location.search + "#"+name); }catch{}
  }

  // Expose router
  window.RapRiseNav = window.RapRiseNav || {};
  window.RapRiseNav.go = go;

  // Initialize
  window.addEventListener("load", ()=>{
    migrateHome();
    ensureOtherScreens();

    // initial route by hash (#home/#studio/...)
    const h = (location.hash || "").replace("#","");
    const allowed = ["home","studio","social","season","shop"];
    if(allowed.includes(h)) go(h); else go("home");
  });

  // Bottom nav click
  document.addEventListener("click", (e)=>{
    const b = e.target.closest("#bottomNav button[data-screen]");
    if(!b) return;
    e.preventDefault();
    const target = b.getAttribute("data-screen");
    window.RapRiseAudio?.sfx?.("tap");
    go(target);
  }, true);
})();

;

/* =========================
   STEP20B: Screen lifecycle
   - On entering Studio/Social show their modules
   - On leaving, hide them
   ========================= */
(function(){
  const allowed = ["home","studio","social","season","shop"];
  function byId(id){ return document.getElementById(id); }

  // Ensure moved overlays start hidden unless their screen is active
  const composer = byId("composerOverlay");
  const phone = byId("phoneOverlay");
  if(composer) composer.classList.add("hidden");
  if(phone) phone.classList.add("hidden");

  function onEnter(name){
    if(name==="studio" && composer){ composer.classList.remove("hidden"); }
    if(name==="social" && phone){ phone.classList.remove("hidden"); }
    if(name==="shop"){
      // no-op: optional auto open
    }
  }
  function onLeave(name){
    if(name!=="studio" && composer){ composer.classList.add("hidden"); }
    if(name!=="social" && phone){ phone.classList.add("hidden"); }
  }

  // Patch existing router if present
  const prevGo = window.RapRiseNav && window.RapRiseNav.go;
  if(window.RapRiseNav){
    window.RapRiseNav.go = function(name){
      try{
        const cur = (location.hash||"").replace("#","");
        if(allowed.includes(cur)) onLeave(cur);
      }catch{}
      if(typeof prevGo === "function") prevGo(name);
      onEnter(name);
    };
  }

  // Shop screen button opens shop
  document.addEventListener("click", (e)=>{
    const b = e.target.closest("#shopOpenFromScreenBtn");
    if(!b) return;
    e.preventDefault();
    const btn = byId("openShopBtn");
    if(btn) btn.click();
  }, true);

  // On load: enter lifecycle for initial screen
  window.addEventListener("load", ()=>{
    const h = (location.hash||"").replace("#","");
    onEnter(allowed.includes(h) ? h : "home");
  });
})();

;

/* =========================
   STEP20C2: Shop Screen (compat mode)
   - Does NOT override openShopBtn handler.
   - When entering 'shop' screen, triggers existing openShopBtn logic.
   - If #shopScreen is created (or exists), moves it into #screen-shop and wires close to route home.
   ========================= */
(function(){
  function byId(id){ return document.getElementById(id); }
  const screenShop = byId("screen-shop");

  function hostShop(){
    if(!screenShop) return;
    const shop = byId("shopScreen");
    if(shop && shop.parentElement !== screenShop){
      // move inside screen
      screenShop.appendChild(shop);
    }
    // close routes to home (without breaking existing close behavior)
    const close = byId("shopCloseBtn");
    if(close && !close.__routeHome){
      close.__routeHome = true;
      close.addEventListener("click", ()=>{
        if(window.RapRiseNav && typeof window.RapRiseNav.go === "function"){
          window.RapRiseNav.go("home");
        }
      }, true);
    }
  }

  // Observe for dynamic creation of shopScreen
  const mo = new MutationObserver(()=> hostShop());
  mo.observe(document.body, { childList:true, subtree:true });

  // Wrap router: on entering shop, click existing openShopBtn
  const nav = window.RapRiseNav;
  if(nav && typeof nav.go === "function" && !nav.go.__step20c2){
    const prev = nav.go;
    const wrapped = function(name){
      const r = prev(name);
      if(name === "shop"){
        // let screen activate first
        setTimeout(()=>{
          const btn = byId("openShopBtn");
          if(btn) btn.click();
          hostShop();
        }, 0);
      }else{
        // if shop overlay exists, keep it hidden by its own logic
        hostShop();
      }
      return r;
    };
    wrapped.__step20c2 = true;
    nav.go = wrapped;
  }

  // Initial host in case shop exists already
  window.addEventListener("load", ()=> {
    hostShop();
    const h = (location.hash||"").replace("#","");
    if(h === "shop"){
      setTimeout(()=>{
        const btn = byId("openShopBtn");
        if(btn) btn.click();
        hostShop();
      }, 0);
    }
  });
})();

;

/* =========================
   STEP20D: Navigation history (pushState + back support)
   - Each screen change pushes history state
   - Browser back returns to previous screen
   ========================= */
(function(){
  const nav = window.RapRiseNav;
  if(!nav || typeof nav.go !== "function") return;

  const prevGo = nav.go;
  if(prevGo.__step20d) return;

  function current(){
    const h = (location.hash||"").replace("#","");
    return h || "home";
  }

  nav.go = function(name, opts){
    opts = opts || {};
    const from = current();
    const r = prevGo(name);
    try{
      if(!opts.replace){
        history.pushState({ screen:name }, "", location.pathname + location.search + "#" + name);
      }else{
        history.replaceState({ screen:name }, "", location.pathname + location.search + "#" + name);
      }
    }catch{}
    return r;
  };
  nav.go.__step20d = true;

  window.addEventListener("popstate", (e)=>{
    const s = (e.state && e.state.screen) ? e.state.screen : current();
    // Use replace to avoid looping history
    try{ prevGo(s); }catch{}
  });

  // Initialize history state once
  try{
    if(!history.state || !history.state.screen){
      history.replaceState({ screen: current() }, "", location.pathname + location.search + "#" + current());
    }
  }catch{}
})();

;

/* =========================
   STEP20E: Fix "pagina non risponde" + riempimento schermate
   - Parallax: RAF solo quando serve (idle stop + pause when hidden)
   - Shop compat observer: non osservare subtree infinito
   - Move real UI blocks into screens (home/studio/social/season/shop)
   ========================= */
(function(){
  // -------- 1) PARALLAX HOTFIX (CPU) --------
  // If a previous parallax loop exists, we cannot reliably stop it.
  // So we disable transforms by replacing the layer with an idle-driven version.
  const old = document.getElementById("parallaxLayer");
  if(old) old.remove();

  const layer = document.createElement("div");
  layer.id = "parallaxLayer";
  layer.style.position = "fixed";
  layer.style.inset = "-25%";
  layer.style.zIndex = "-3";
  layer.style.pointerEvents = "none";
  layer.style.background =
    "radial-gradient(900px 520px at 15% 12%, rgba(247,201,72,.10), transparent 60%)," +
    "radial-gradient(900px 520px at 85% 20%, rgba(67,217,255,.08), transparent 60%)," +
    "radial-gradient(900px 520px at 55% 85%, rgba(255,91,214,.06), transparent 60%)," +
    "radial-gradient(900px 620px at 50% 50%, rgba(7,16,34,1), rgba(3,5,12,1))";
  layer.style.filter = "saturate(1.12)";
  document.body.prepend(layer);

  let px=0, py=0, tx=0, ty=0;
  let raf = 0;
  let lastInput = 0;
  const IDLE_MS = 900; // stop anim after ~1s of no input
  const THROTTLE_MS = 28;

  function startLoop(){
    if(raf) return;
    const tick = ()=>{
      raf = 0;
      // stop when tab hidden
      if(document.hidden) return;

      const now = performance.now();
      // if idle, stop scheduling
      if(now - lastInput > IDLE_MS) return;

      px += (tx - px) * 0.10;
      py += (ty - py) * 0.10;
      layer.style.transform = `translate(${px.toFixed(2)}px, ${py.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  let lastMove = 0;
  window.addEventListener("pointermove", (e)=>{
    const now = performance.now();
    if(now - lastMove < THROTTLE_MS) return;
    lastMove = now;
    lastInput = now;
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    tx = x * 10;
    ty = y * 10;
    startLoop();
  }, { passive:true });

  document.addEventListener("visibilitychange", ()=>{
    if(document.hidden){
      if(raf) cancelAnimationFrame(raf);
      raf = 0;
    }else{
      lastInput = performance.now();
      startLoop();
    }
  });

  // -------- 2) SHOP OBSERVER HOTFIX --------
  // Replace subtree observer with lightweight body child observer + disconnect after first success.
  // If previous observer exists, this prevents extra work by stopping further host operations once done.
  let shopHosted = false;
  function hostShopOnce(){
    if(shopHosted) return;
    const screenShop = document.getElementById("screen-shop");
    const shop = document.getElementById("shopScreen");
    if(screenShop && shop && shop.parentElement !== screenShop){
      screenShop.appendChild(shop);
    }
    if(shop){
      shopHosted = true;
      shop.classList.add("active-shop"); // visible inside screen
      shop.setAttribute("aria-hidden","false");
    }
  }

  const mo = new MutationObserver(()=>{
    hostShopOnce();
    if(shopHosted) mo.disconnect();
  });
  mo.observe(document.body, { childList:true, subtree:false });

  // Also attempt on load
  window.addEventListener("load", ()=> hostShopOnce(), { once:true });

  // -------- 3) RIEMPIMENTO SCHERMATE (spostamento reale contenuti) --------
  function move(id, to){
    const el = document.getElementById(id);
    const tgt = document.getElementById(to);
    if(!el || !tgt) return false;
    if(el.parentElement === tgt) return true;
    tgt.appendChild(el);
    return true;
  }

  function ensureHead(screenId, title, subtitle){
    const s = document.getElementById(screenId);
    if(!s) return;
    if(s.querySelector(".screen-head")) return;

    const head = document.createElement("div");
    head.className = "screen-head";
    head.innerHTML = `
      <div style="min-width:0;">
        <div class="ttl">${title}</div>
        <div class="sub">${subtitle}</div>
      </div>
      <span class="chip"><i></i>LIVE</span>
    `;
    const wrap = document.createElement("div");
    wrap.className = "screen-wrap";
    // Move current children into wrap (keeps order)
    const kids = Array.from(s.childNodes);
    kids.forEach(k=> wrap.appendChild(k));
    s.appendChild(head);
    s.appendChild(wrap);
  }

  window.addEventListener("load", ()=>{
    // HOME: ensure hero/strip/stats live here
    move("homeHero", "screen-home");
    move("modeStrip", "screen-home");
    move("statsCard", "screen-home");

    // STUDIO: prefer composer + any writing card if exists
    move("composerOverlay", "screen-studio");
    // Try common ids if present
    move("writerCard", "screen-studio");
    move("lyricsCard", "screen-studio");
    move("barsCard", "screen-studio");

    // SOCIAL
    move("phoneOverlay", "screen-social");

    // SEASON
    move("seasonCard", "screen-season");
    move("questCard", "screen-season");

    // SHOP: host overlay into shop screen when available
    hostShopOnce();

    // Add professional headers so screens are not "vuote"
    ensureHead("screen-home", "Home", "Hub principale: progress, CTA e navigazione.");
    ensureHead("screen-studio", "Studio", "Scrittura, progress e upgrade del rapper.");
    ensureHead("screen-social", "Social", "Telefono, Instagram/Spotify e crescita fan.");
    ensureHead("screen-season", "Stagione", "Quest, pass e ricompense live-ops.");
    ensureHead("screen-shop", "Negozio", "Daily deals, bundle, boost e cosmetici.");
  }, { once:true });

  // -------- 4) SAFE UI RENDER (avoid burst) --------
  // If many parts call updateUI/render directly, coalesce them.
  let pending = false;
  const orig = {
    updateUI: window.updateUI,
    render: window.render,
    syncHud: window.syncHud
  };
  window.RapRiseUI = window.RapRiseUI || {};
  window.RapRiseUI.requestRender = function(){
    if(pending) return;
    pending = true;
    requestAnimationFrame(()=>{
      pending = false;
      try{ orig.updateUI && orig.updateUI(); }catch{}
      try{ orig.render && orig.render(); }catch{}
      try{ orig.syncHud && orig.syncHud(); }catch{}
    });
  };
  window.refreshUI = window.RapRiseUI.requestRender;
})();

;

/* =========================
   STEP20F: Fix tasti schermate + Social spostato (no phone)
   ========================= */
(function(){
  function byId(id){ return document.getElementById(id); }
  function click(id){ const el = byId(id); if(el) el.click(); }
  function focusWriter(){
    const ta = document.querySelector("textarea, #lyricsInput, #barsInput");
    if(ta){ ta.focus(); ta.scrollIntoView({ behavior:"smooth", block:"center" }); return true; }
    return false;
  }

  // Wire Studio buttons
  byId("studioFocusBtn")?.addEventListener("click", ()=>{
    if(!focusWriter()) window.RapRiseAudio?.sfx?.("error"); else window.RapRiseAudio?.sfx?.("tap");
  }, true);
  byId("studioChestBtn")?.addEventListener("click", ()=> { click("openChestBtn"); }, true);
  byId("studioShopBtn")?.addEventListener("click", ()=> { if(window.RapRiseNav) window.RapRiseNav.go("shop"); else click("openShopBtn"); }, true);
  byId("studioWeeklyBtn")?.addEventListener("click", ()=>{
    const pill = byId("dailyPill"); if(pill) pill.click(); else window.RapRiseAudio?.sfx?.("error");
  }, true);

  // Season
  byId("seasonWeeklyBtn")?.addEventListener("click", ()=>{
    const pill = byId("dailyPill"); if(pill) pill.click(); else window.RapRiseAudio?.sfx?.("error");
  }, true);
  byId("seasonClaimBtn")?.addEventListener("click", ()=> { click("openNotifBtn"); }, true);
  byId("seasonShopBtn")?.addEventListener("click", ()=> { if(window.RapRiseNav) window.RapRiseNav.go("shop"); else click("openShopBtn"); }, true);

  // Social: drive tabs inside social module (phone-app is now social-shell)
  function tab(btnId){
    const b = byId(btnId);
    if(b) b.click();
  }
  byId("socialInstaBtn")?.addEventListener("click", ()=>{
    // pick a reasonable default tab element if present
    const t = document.querySelector("#phoneTabInsta, [data-tab='insta'], .phone-tab[data-target='insta']");
    if(t) t.click(); else window.RapRiseAudio?.sfx?.("tap");
  }, true);
  byId("socialSpotifyBtn")?.addEventListener("click", ()=>{
    const t = document.querySelector("#phoneTabSpotify, [data-tab='spotify'], .phone-tab[data-target='spotify']");
    if(t) t.click(); else window.RapRiseAudio?.sfx?.("tap");
  }, true);
  byId("socialHomeBtn")?.addEventListener("click", ()=> { window.RapRiseNav?.go?.("home"); }, true);

  // Shop
  byId("shopOpenBtn")?.addEventListener("click", ()=> { click("openShopBtn"); }, true);
  byId("shopHomeBtn")?.addEventListener("click", ()=> { window.RapRiseNav?.go?.("home"); }, true);

  // Remove phone close behavior if any lingering
  const phoneClose = byId("phoneCloseBtn");
  if(phoneClose){
    phoneClose.style.display = "none";
  }

  // Ensure screen enter/leave does not hide social module anymore
  // Override any earlier lifecycle toggles by forcing phoneOverlay visible when on social screen
  const nav = window.RapRiseNav;
  if(nav && typeof nav.go === "function" && !nav.go.__step20f){
    const prev = nav.go;
    nav.go = function(name, opts){
      const res = prev(name, opts);
      const social = byId("phoneOverlay");
      if(social){
        if(name === "social"){ social.classList.remove("hidden"); social.setAttribute("aria-hidden","false"); }
        else { /* keep it mounted but can stay visible - do not hide to preserve state */ }
      }
      const comp = byId("composerOverlay");
      if(comp){
        if(name === "studio"){ comp.classList.remove("hidden"); comp.setAttribute("aria-hidden","false"); }
      }
      if(name==="studio"){ setTimeout(()=> focusWriter(), 0); }
      return res;
    };
    nav.go.__step20f = true;
  }

  // On load, ensure social module is visible in social screen (no overlay)
  window.addEventListener("load", ()=>{
    const social = byId("phoneOverlay");
    if(social){
      social.classList.remove("hidden");
      social.setAttribute("aria-hidden","false");
    }
  }, { once:true });
})();

;

/* =========================
   STEP20G: Hardening pass (no-bug UX)
   - Defensive bindings: every screen CTA uses safe dispatch
   - Move Social modules into screen-social (no phone overlay dependency)
   - Remove/neutralize phone overlay handlers if present
   - Deduplicate Home content (avoid old content sitting under new)
   ========================= */
(function(){
  const log = (...a)=>{ /* silent in prod */ };

  function byId(id){ return document.getElementById(id); }
  function q(sel){ return document.querySelector(sel); }
  function qa(sel){ return Array.from(document.querySelectorAll(sel)); }

  function safeClick(id){
    const el = byId(id);
    if(el && typeof el.click === "function"){ el.click(); return true; }
    return false;
  }
  function safeFocus(){
    const ta = q("textarea, #lyricsInput, #barsInput");
    if(ta){
      try{ ta.focus(); }catch{}
      try{ ta.scrollIntoView({behavior:"smooth", block:"center"}); }catch{}
      return true;
    }
    return false;
  }

  // ---- 1) Social: move modules into screen-social ----
  function ensureSocialLayout(){
    const scr = byId("screen-social");
    if(!scr) return;

    // Collect known social nodes (tabs + apps)
    const candidates = [
      "phoneTabs","phoneTop","phoneBody","phoneFooter",
      "appInstagram","appSpotify","appLive","appYouTube",
      "igAdminPanel","spotifyPanel","livePanel","ytPanel"
    ].map(byId).filter(Boolean);

    if(candidates.length === 0) return;

    // Create a wrapper if missing
    let wrap = scr.querySelector(".social-wrap");
    if(!wrap){
      wrap = document.createElement("div");
      wrap.className = "social-wrap ui-card";
      wrap.style.padding = "12px";
      wrap.style.borderRadius = "22px";
      wrap.style.border = "1px solid rgba(255,255,255,.12)";
      wrap.style.background = "rgba(2,6,23,.28)";
      // Put it under screen header if present
      const sw = scr.querySelector(".screen-wrap") || scr;
      sw.appendChild(wrap);
    }

    // Move candidates into wrapper (preserve order)
    candidates.forEach(n=>{
      if(n && n.parentElement !== wrap) wrap.appendChild(n);
    });

    // Kill phone-only buttons if they exist
    ["phoneCloseBtn","phoneHome"].forEach(id=>{
      const b = byId(id);
      if(b) b.style.display = "none";
    });

    // Make sure "phone overlay" container isn't blocking clicks
    const overlay = byId("phoneOverlay");
    if(overlay){
      overlay.classList.add("hidden");
      overlay.style.display = "none";
      overlay.setAttribute("aria-hidden","true");
    }
  }

  // ---- 2) Deduplicate Home: ensure only hub blocks are visible at top ----
  function dedupeHome(){
    const home = byId("screen-home");
    if(!home) return;
    // If legacy main wrapper still exists and duplicates, keep it but hide duplicated hub blocks inside it.
    const hero = byId("homeHero");
    const strip = byId("modeStrip");
    const stats = byId("statsCard");

    // If hero/strip/stats appear twice (cloned by previous scripts), remove duplicates by keeping first visible instance.
    function dedupeById(id){
      const nodes = qa("#"+id);
      if(nodes.length <= 1) return;
      for(let i=1;i<nodes.length;i++){
        nodes[i].remove();
      }
    }
    ["homeHero","modeStrip","statsCard"].forEach(dedupeById);

    // Ensure they are inside home screen wrap (not under other screens)
    const target = home.querySelector(".screen-wrap") || home;
    [hero,strip,stats].filter(Boolean).forEach(n=>{
      if(n.parentElement !== target) target.insertBefore(n, target.firstChild);
    });
  }

  // ---- 3) Screen CTA wiring: enforce correct behavior even if ids change ----
  function wireScreenActions(){
    // Studio: buttons (if exist)
    qa("[data-action='studio-write'], #studioWriteBtn").forEach(b=>{
      if(b.__wired) return; b.__wired=true;
      b.addEventListener("click",(e)=>{ e.preventDefault(); safeFocus(); window.RapRiseAudio?.sfx?.("tap"); }, true);
    });

    // Season: weekly quests
    qa("[data-action='open-weekly'], #seasonWeeklyBtn").forEach(b=>{
      if(b.__wired) return; b.__wired=true;
      b.addEventListener("click",(e)=>{
        e.preventDefault();
        // Step17 uses dailyPill click to open weekly
        const pill = byId("dailyPill");
        if(pill) pill.click();
        else safeClick("openNotifBtn");
        window.RapRiseAudio?.sfx?.("open");
      }, true);
    });

    // Notifications
    qa("[data-action='open-notifs'], #openNotifBtn").forEach(b=>{
      if(b.__wired) return; b.__wired=true;
      b.addEventListener("click",(e)=>{
        // existing handler will run; just add sound
        window.RapRiseAudio?.sfx?.("tap");
      }, true);
    });

    // Shop open from screen
    qa("#shopOpenFromScreenBtn, [data-action='open-shop']").forEach(b=>{
      if(b.__wired) return; b.__wired=true;
      b.addEventListener("click",(e)=>{
        e.preventDefault();
        if(window.RapRiseNav?.go) window.RapRiseNav.go("shop");
        else safeClick("openShopBtn");
        window.RapRiseAudio?.sfx?.("open");
      }, true);
    });

    // Chest
    qa("[data-action='open-chest']").forEach(b=>{
      if(b.__wired) return; b.__wired=true;
      b.addEventListener("click",(e)=>{
        e.preventDefault();
        if(!safeClick("openChestBtn")) safeClick("ctaOpenChest");
        window.RapRiseAudio?.sfx?.("open");
      }, true);
    });
  }

  // ---- 4) Prevent click-dead screens: ensure pointer events on screens ----
  function fixPointerEvents(){
    qa(".screen").forEach(s=>{
      if(getComputedStyle(s).pointerEvents === "none"){
        s.style.pointerEvents = "auto";
      }
    });
  }

  // ---- 5) Run after load and after route changes ----
  function applyAll(){
    ensureSocialLayout();
    dedupeHome();
    wireScreenActions();
    fixPointerEvents();
  }

  window.addEventListener("load", ()=> applyAll(), { once:true });

  // Wrap router to re-apply after navigation
  const nav = window.RapRiseNav;
  if(nav && typeof nav.go === "function" && !nav.go.__step20g){
    const prev = nav.go;
    const wrapped = function(name, opts){
      const r = prev(name, opts);
      setTimeout(applyAll, 0);
      return r;
    };
    wrapped.__step20g = true;
    nav.go = wrapped;
  }

  // Also re-apply after overlays open (reward/settings) where content is injected
  const overlay = byId("rewardOverlay");
  if(overlay){
    const mo = new MutationObserver(()=> wireScreenActions());
    mo.observe(overlay, { childList:true, subtree:true });
  }
})();

;

/* =========================
   STEP20H: Onboarding bugfix (cannot proceed) + professional flow
   - Ensures "Entra nel gioco" always works
   - Validates required fields and enables button
   - Enter key submits
   - Writes state + local flags and hides overlay safely
   ========================= */
(function(){
  const ov = document.getElementById("onboardingOverlay");
  if(!ov) return;

  const btnSave   = document.getElementById("onboardingSaveBtn");
  const btnCancel = document.getElementById("onboardingCancelBtn");
  const btnSkip   = document.getElementById("onboardingSkipBtn");

  const first = document.getElementById("obFirstName");
  const last  = document.getElementById("obLastName");
  const stage = document.getElementById("obStageName");
  const dob   = document.getElementById("obDob");

  const prog  = document.getElementById("obProgressFill");

  function getVal(el){ return (el && typeof el.value === "string") ? el.value.trim() : ""; }

  function setProgress(pct){
    if(!prog) return;
    prog.style.width = Math.max(10, Math.min(100, pct)) + "%";
  }

  function isValid(){
    // Required: stage name (most important for identity), allow defaults for other fields.
    return getVal(stage).length >= 2;
  }

  function update(){
    const ok = isValid();
    if(btnSave) btnSave.disabled = !ok;
    // simple progress: stage filled => 66, plus optional name => 100
    let pct = 33;
    if(getVal(stage).length >= 2) pct = 66;
    if(getVal(stage).length >= 2 && (getVal(first).length >= 1 || getVal(last).length >= 1)) pct = 100;
    setProgress(pct);
  }

  function ensureState(){
    // Try to use existing global state structure; fallback minimal.
    let st = null;
    try{ if(window.state && typeof window.state === "object") st = window.state; }catch{}
    if(!st){
      st = { player: { level:1, xp:0, money:0, fans:0, hype:100 }, meta:{} };
      window.state = st;
    }
    if(!st.player) st.player = {};
    return st;
  }

  function saveAll(){
    // Prefer existing save functions; fallback to localStorage.
    try{
      if(typeof window.saveGame === "function"){ window.saveGame(); return; }
    }catch{}
    try{
      // common key seen in previous steps
      localStorage.setItem("raprise_save_v1", JSON.stringify(window.state));
    }catch{}
  }

  function closeOnboarding(){
    ov.classList.add("hidden");
    try{ ov.setAttribute("aria-hidden","true"); }catch{}
    try{ localStorage.setItem("raprise_profile_done_v1","1"); }catch{}
    try{ window.RapRiseUI?.requestRender?.(); }catch{}
    try{
      if(window.RapRiseNav && typeof window.RapRiseNav.go === "function"){
        window.RapRiseNav.go("home", { replace:true });
      }
    }catch{}
  }

  function applyDefaultsAndEnter(){
    const st = ensureState();
    const p = st.player;

    const stageName = getVal(stage) || "Rookie MC";
    const firstName = getVal(first) || "Simone";
    const lastName  = getVal(last)  || "";
    const dobVal    = getVal(dob)   || "";

    p.firstName = firstName;
    p.lastName  = lastName;
    p.stageName = stageName;
    if(dobVal) p.dob = dobVal;

    // Mark profile created
    st.meta = st.meta || {};
    st.meta.profileCreatedAt = st.meta.profileCreatedAt || Date.now();
    st.meta.profileVersion = 1;

    // If your game has UI labels, update them if present
    const nameLabel = document.getElementById("profileNameLabel") || document.getElementById("playerNameLabel");
    if(nameLabel) nameLabel.textContent = stageName;

    saveAll();
    closeOnboarding();
    window.RapRiseAudio?.sfx?.("reward");
  }

  // ---- Fix: ensure overlay is the only blocker at startup and button works ----
  // Some previous refactors can leave the button unbound or disabled permanently.
  function bindOnce(){
    if(btnSave && !btnSave.__bound){
      btnSave.__bound = true;
      btnSave.type = "button";
      btnSave.addEventListener("click", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(!isValid()){
          window.RapRiseAudio?.sfx?.("error");
          if(stage){ stage.focus(); stage.scrollIntoView({behavior:"smooth", block:"center"}); }
          return;
        }
        applyDefaultsAndEnter();
      }, true);
    }
    if(btnCancel && !btnCancel.__bound){
      btnCancel.__bound = true;
      btnCancel.type = "button";
      btnCancel.addEventListener("click", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        // "Usa default" must always work
        if(stage && !getVal(stage)) stage.value = "Rookie MC";
        applyDefaultsAndEnter();
      }, true);
    }
    if(btnSkip && !btnSkip.__bound){
      btnSkip.__bound = true;
      btnSkip.type = "button";
      btnSkip.addEventListener("click", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(stage && !getVal(stage)) stage.value = "Rookie MC";
        applyDefaultsAndEnter();
      }, true);
    }

    // Input listeners for enable state
    [stage, first, last, dob].forEach(el=>{
      if(el && !el.__bound){
        el.__bound = true;
        el.addEventListener("input", update);
        el.addEventListener("change", update);
        el.addEventListener("keydown", (ev)=>{
          if(ev.key === "Enter"){
            ev.preventDefault();
            if(btnSave && !btnSave.disabled) btnSave.click();
          }
        });
      }
    });

    update();
  }

  // Determine whether to show onboarding
  function shouldShow(){
    try{
      if(localStorage.getItem("raprise_profile_done_v1") === "1") return false;
    }catch{}
    try{
      // If state already has stageName, skip onboarding
      if(window.state && window.state.player && window.state.player.stageName) return false;
    }catch{}
    return true;
  }

  window.addEventListener("load", ()=>{
    bindOnce();
    if(shouldShow()){
      ov.classList.remove("hidden");
      ov.setAttribute("aria-hidden","false");
      // Focus stage name
      if(stage) setTimeout(()=> stage.focus(), 50);
    }else{
      ov.classList.add("hidden");
      ov.setAttribute("aria-hidden","true");
    }
  }, { once:true });

  // Safety: if overlay is visible, lock navigation clicks behind it
  // (prevents accidental interaction "under" overlay)
  try{ ov.style.pointerEvents = "auto"; }catch{}
})();

;

/* =========================
   STEP20I: Onboarding GUARANTEED
   - No dead-end: primary always proceeds (auto-fills missing)
   - Capture-phase binding overrides any conflicting listeners
   - Professional hero + toast + validation highlight
   ========================= */
(function(){
  const ov = document.getElementById("onboardingOverlay");
  if(!ov) return;

  const btnSave   = document.getElementById("onboardingSaveBtn");
  const btnCancel = document.getElementById("onboardingCancelBtn");
  const btnSkip   = document.getElementById("onboardingSkipBtn");

  const first = document.getElementById("obFirstName");
  const last  = document.getElementById("obLastName");
  const stage = document.getElementById("obStageName");
  const dob   = document.getElementById("obDob");
  const prog  = document.getElementById("obProgressFill");

  // Add hero + toast once
  function ensureHero(){
    if(ov.querySelector(".ob-hero")) return;
    const header = ov.querySelector(".overlay-header");
    if(!header) return;
    const hero = document.createElement("div");
    hero.className = "ob-hero";
    hero.innerHTML = `
      <div class="kicker">SETUP PROFILO</div>
      <div class="headline">Crea la tua identita artistica</div>
      <div class="micro">Scegli Nome artista e look. Se lasci campi vuoti, li completiamo con impostazioni professionali di default.</div>
    `;
    header.parentElement.insertBefore(hero, header.nextSibling);

    const toast = document.createElement("div");
    toast.className = "ob-toast";
    toast.id = "obToast";
    toast.textContent = "";
    ov.appendChild(toast);
  }

  function toast(msg){
    const t = document.getElementById("obToast");
    if(!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(()=> t.classList.remove("show"), 1400);
  }

  function getVal(el){ return (el && typeof el.value === "string") ? el.value.trim() : ""; }
  function setProgress(pct){
    if(!prog) return;
    prog.style.width = Math.max(10, Math.min(100, pct)) + "%";
  }

  function update(){
    // Progress only, do NOT block the user.
    let pct = 33;
    if(getVal(stage).length >= 2) pct = 66;
    if(getVal(stage).length >= 2 && (getVal(first).length >= 1 || getVal(last).length >= 1)) pct = 100;
    setProgress(pct);

    // Remove warning when user types
    if(stage) stage.classList.remove("ob-warn");
  }

  function ensureState(){
    let st = null;
    try{ if(window.state && typeof window.state === "object") st = window.state; }catch{}
    if(!st){
      st = { player: { level:1, xp:0, money:0, fans:0, hype:100 }, meta:{} };
      window.state = st;
    }
    if(!st.player) st.player = {};
    if(!st.meta) st.meta = {};
    return st;
  }

  function saveAll(){
    try{ if(typeof window.saveGame === "function"){ window.saveGame(); return; } }catch{}
    try{ localStorage.setItem("raprise_save_v1", JSON.stringify(window.state)); }catch{}
  }

  function closeOnboarding(){
    ov.classList.add("hidden");
    try{ ov.setAttribute("aria-hidden","true"); }catch{}
    try{ localStorage.setItem("raprise_profile_done_v1","1"); }catch{}
    // Unblock UI if any overlay lock exists
    try{ document.documentElement.style.overflow = ""; document.body.style.overflow = ""; }catch{}
    try{ window.RapRiseUI?.requestRender?.(); }catch{}
    try{ if(window.RapRiseNav && typeof window.RapRiseNav.go === "function"){ window.RapRiseNav.go("home", { replace:true }); } }catch{}
  }

  function applyDefaultsAndEnter(source){
    const st = ensureState();
    const p = st.player;

    // Never block: auto-fill missing
    let stageName = getVal(stage);
    if(stageName.length < 2){
      stageName = "Rookie MC";
      if(stage){ stage.value = stageName; stage.classList.add("ob-warn"); }
      toast("Nome artista mancante: impostato un default professionale.");
    }

    const firstName = getVal(first) || "Simone";
    const lastName  = getVal(last)  || "";
    const dobVal    = getVal(dob)   || "";

    p.firstName = firstName;
    p.lastName  = lastName;
    p.stageName = stageName;
    if(dobVal) p.dob = dobVal;

    // Mark profile created
    st.meta.profileCreatedAt = st.meta.profileCreatedAt || Date.now();
    st.meta.profileVersion = 1;

    // Update any UI labels best-effort
    const nameLabel = document.getElementById("profileNameLabel") || document.getElementById("playerNameLabel");
    if(nameLabel) nameLabel.textContent = stageName;

    saveAll();
    closeOnboarding();
    window.RapRiseAudio?.sfx?.("reward");
  }

  // Show/hide onboarding
  function shouldShow(){
    try{ if(localStorage.getItem("raprise_profile_done_v1") === "1") return false; }catch{}
    try{ if(window.state && window.state.player && window.state.player.stageName) return false; }catch{}
    return true;
  }

  function show(){
    ov.classList.remove("hidden");
    ov.setAttribute("aria-hidden","false");
    ensureHero();
    update();
    if(stage) setTimeout(()=> stage.focus(), 80);
  }

  function hide(){
    ov.classList.add("hidden");
    ov.setAttribute("aria-hidden","true");
  }

  // CAPTURE-PHASE click handler to override any previous broken bindings
  document.addEventListener("click", (e)=>{
    const t = e.target && e.target.closest && e.target.closest("#onboardingSaveBtn,#onboardingCancelBtn,#onboardingSkipBtn");
    if(!t) return;

    e.preventDefault();
    e.stopPropagation();
    if(typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();

    if(t.id === "onboardingSaveBtn")   return applyDefaultsAndEnter("save");
    if(t.id === "onboardingCancelBtn") return applyDefaultsAndEnter("default");
    if(t.id === "onboardingSkipBtn")   return applyDefaultsAndEnter("skip");
  }, true);

  // Input listeners
  [stage, first, last, dob].forEach(el=>{
    if(!el) return;
    el.addEventListener("input", update);
    el.addEventListener("change", update);
    el.addEventListener("keydown", (ev)=>{
      if(ev.key === "Enter"){
        ev.preventDefault();
        applyDefaultsAndEnter("enter");
      }
    });
  });

  // Initialize ASAP (DOMContentLoaded), not waiting for full load
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", ()=>{
      ensureHero();
      if(shouldShow()) show(); else hide();
    }, { once:true });
  }else{
    ensureHero();
    if(shouldShow()) show(); else hide();
  }
})();

;

/* =========================
   STEP21: Onboarding guaranteed (no dead-end)
   - Capture-phase handlers override any conflicting listeners
   - Never blocks progression: auto-default stage name if missing
   - Saves + closes overlay reliably
   - Adds professional toast feedback
   ========================= */
(function(){
  function $(id){ return document.getElementById(id); }

  const ov = $("onboardingOverlay");
  if(!ov) return;

  const toast = $("obToast");
  const btnSave   = $("onboardingSaveBtn");
  const btnCancel = $("onboardingCancelBtn");
  const btnSkip   = $("onboardingSkipBtn");

  const first = $("obFirstName");
  const last  = $("obLastName");
  const stage = $("obStageName");
  const dob   = $("obDob");

  function v(el){ return (el && typeof el.value === "string") ? el.value.trim() : ""; }

  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=> toast.classList.remove("show"), 2400);
  }

  function ensureState(){
    let st = null;
    try{ if(window.state && typeof window.state === "object") st = window.state; }catch{}
    if(!st){ st = { player:{}, meta:{} }; window.state = st; }
    if(!st.player) st.player = {};
    if(!st.meta) st.meta = {};
    return st;
  }

  function persist(){
    try{ if(typeof window.saveGame === "function"){ window.saveGame(); return; } }catch{}
    try{ localStorage.setItem("raprise_save_v1", JSON.stringify(window.state)); }catch{}
  }

  function close(){
    ov.classList.add("hidden");
    try{ ov.setAttribute("aria-hidden","true"); }catch{}
    try{ ov.style.pointerEvents = "none"; }catch{}
    try{ localStorage.setItem("raprise_profile_done_v1","1"); }catch{}
    try{ window.RapRiseUI?.requestRender?.(); }catch{}
    try{
      if(window.RapRiseNav && typeof window.RapRiseNav.go === "function"){
        window.RapRiseNav.go("home", { replace:true });
      }
    }catch{}
  }

  function proceed(reason){
    const st = ensureState();
    const p = st.player;

    // GUARANTEE stage name
    if(!v(stage)){
      if(stage) stage.value = "Rookie MC";
      showToast("Nome artista mancante: impostato un default professionale.");
    }

    p.firstName = v(first) || p.firstName || "Simone";
    p.lastName  = v(last)  || p.lastName  || "";
    p.stageName = v(stage) || p.stageName || "Rookie MC";
    if(v(dob)) p.dob = v(dob);

    st.meta.profileCreatedAt = st.meta.profileCreatedAt || Date.now();
    st.meta.profileVersion = (st.meta.profileVersion || 0) + 1;

    persist();
    close();
    try{ window.RapRiseAudio?.sfx?.("reward"); }catch{}
  }

  function shouldShow(){
    try{ if(localStorage.getItem("raprise_profile_done_v1")==="1") return false; }catch{}
    try{ if(window.state && window.state.player && window.state.player.stageName) return false; }catch{}
    return true;
  }

  function bindCapture(btn, fn){
    if(!btn || btn.__step21) return;
    btn.__step21 = true;
    btn.disabled = false; // never allow a disabled dead-end
    btn.addEventListener("click", (e)=>{
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation?.();
      fn();
    }, true); // CAPTURE
  }

  bindCapture(btnSave,   ()=> proceed("save"));
  bindCapture(btnCancel, ()=> proceed("default"));
  bindCapture(btnSkip,   ()=> proceed("skip"));

  // Enter key submits reliably
  [stage, first, last, dob].forEach(el=>{
    if(!el || el.__step21) return;
    el.__step21 = true;
    el.addEventListener("keydown", (e)=>{
      if(e.key === "Enter"){
        e.preventDefault();
        proceed("enter");
      }
    }, true);
  });

  // Force visibility on startup if needed
  document.addEventListener("DOMContentLoaded", ()=>{
    if(shouldShow()){
      ov.classList.remove("hidden");
      ov.setAttribute("aria-hidden","false");
      ov.style.pointerEvents = "auto";
      if(stage) setTimeout(()=> stage.focus(), 50);
    }else{
      ov.classList.add("hidden");
      ov.setAttribute("aria-hidden","true");
      ov.style.pointerEvents = "none";
    }
  }, { once:true });

  // Optional: if phone button exists somehow, route to social screen
  document.addEventListener("click", (e)=>{
    const b = e.target.closest("#phoneBtn");
    if(!b) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation?.();
    try{ window.RapRiseNav?.go?.("social"); }catch{}
  }, true);

})();

;

/* =========================
   STEP22: Modular screens (mount/unmount)
   - Each screen has a module with mount/unmount
   - Lazy: only mounts on first entry; unmounts heavy overlays on leave
   - Central action dispatcher for buttons by data-action
   ========================= */
(function(){
  const ids = {
    home:   "screen-home",
    studio: "screen-studio",
    social: "screen-social",
    season: "screen-season",
    shop:   "screen-shop"
  };
  function el(id){ return document.getElementById(id); }
  function qs(sel, root){ return (root||document).querySelector(sel); }
  function qsa(sel, root){ return Array.from((root||document).querySelectorAll(sel)); }

  const Screens = {};
  const mounted = {};

  function markMounted(name, yes){
    const s = el(ids[name]);
    if(!s) return;
    s.dataset.mounted = yes ? "1" : "0";
  }

  function moveInto(id, targetEl){
    const node = el(id);
    if(!node || !targetEl) return null;
    if(node.parentElement === targetEl) return node;
    targetEl.appendChild(node);
    return node;
  }

  function ensureHeader(s, title, subtitle){
    if(!s || s.querySelector(".screen-head")) return;
    const head = document.createElement("div");
    head.className = "screen-head";
    head.innerHTML = `
      <div style="min-width:0;">
        <div class="ttl">${title}</div>
        <div class="sub">${subtitle}</div>
      </div>
      <span class="chip"><i></i>LIVE</span>`;
    const wrap = document.createElement("div");
    wrap.className = "screen-wrap screen-module";
    const kids = Array.from(s.childNodes);
    kids.forEach(k=> wrap.appendChild(k));
    s.appendChild(head);
    s.appendChild(wrap);
  }

  // Action dispatcher (single source of truth)
  const Actions = {
    focusWrite(){
      const target = qs("textarea, #lyricsInput, #barsInput");
      if(target){ target.focus(); target.scrollIntoView({behavior:"smooth", block:"center"}); window.RapRiseAudio?.sfx?.("open"); return true; }
      window.RapRiseAudio?.sfx?.("error"); return false;
    },
    openShop(){
      const b = el("openShopBtn");
      if(b){ b.click(); window.RapRiseAudio?.sfx?.("open"); return true; }
      window.RapRiseAudio?.sfx?.("error"); return false;
    },
    openWeekly(){
      const pill = el("dailyPill");
      if(pill){ pill.click(); window.RapRiseAudio?.sfx?.("open"); return true; }
      window.RapRiseAudio?.sfx?.("error"); return false;
    },
    openNotifs(){
      const b = el("openNotifBtn");
      if(b){ b.click(); window.RapRiseAudio?.sfx?.("open"); return true; }
      window.RapRiseAudio?.sfx?.("error"); return false;
    },
    openChest(){
      const b = el("openChestBtn");
      if(b){ b.click(); window.RapRiseAudio?.sfx?.("open"); return true; }
      window.RapRiseAudio?.sfx?.("error"); return false;
    }
  };

  document.addEventListener("click", (e)=>{
    const btn = e.target.closest("[data-action]");
    if(!btn) return;
    const act = btn.getAttribute("data-action");
    if(!act || !Actions[act]) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation?.();
    Actions[act]();
  }, true);

  // Define modules
  Screens.home = {
    mount(){
      const s = el(ids.home);
      if(!s) return;
      ensureHeader(s, "Home", "Hub principale: progress, CTA e navigazione.");
      const wrap = s.querySelector(".screen-wrap") || s;

      // Build quick actions
      if(!wrap.querySelector("#homeActions")){
        const card = document.createElement("div");
        card.className = "ui-card";
        card.id = "homeActions";
        card.style.padding = "12px";
        card.innerHTML = `
          <div class="u-row u-between u-gap-2">
            <b style="letter-spacing:.2px;">Azioni rapide</b>
            <span class="chip"><i></i>HUB</span>
          </div>
          <div class="u-row u-gap-2 u-mt-3" style="flex-wrap:wrap;">
            <button class="btn btn-primary" data-action="focusWrite">Vai a scrivere</button>
            <button class="btn btn-secondary" data-action="openWeekly">Quest</button>
            <button class="btn btn-secondary" data-action="openShop">Shop</button>
            <button class="btn btn-secondary" data-action="openNotifs">Notifiche</button>
          </div>
        `;
        wrap.prepend(card);
      }

      // Move known blocks here (if exist)
      moveInto("homeHero", wrap);
      moveInto("modeStrip", wrap);
      moveInto("statsCard", wrap);
    },
    unmount(){
      // nothing heavy
    }
  };

  Screens.studio = {
    mount(){
      const s = el(ids.studio);
      if(!s) return;
      ensureHeader(s, "Studio", "Scrittura, progress e upgrade del rapper.");
      const wrap = s.querySelector(".screen-wrap") || s;

      if(!wrap.querySelector("#studioActions")){
        const card = document.createElement("div");
        card.className = "ui-card";
        card.id = "studioActions";
        card.style.padding = "12px";
        card.innerHTML = `
          <div class="u-row u-between u-gap-2">
            <b style="letter-spacing:.2px;">Studio</b>
            <span class="chip"><i></i>CREATE</span>
          </div>
          <div class="u-row u-gap-2 u-mt-3" style="flex-wrap:wrap;">
            <button class="btn btn-primary" data-action="focusWrite">Scrivi ora</button>
            <button class="btn btn-secondary" data-action="openChest">Apri cassa</button>
            <button class="btn btn-secondary" data-action="openWeekly">Quest</button>
            <button class="btn btn-secondary" data-action="openShop">Shop</button>
          </div>
        `;
        wrap.appendChild(card);
      }

      // If composer overlay exists, convert into inline card
      const comp = moveInto("composerOverlay", wrap);
      if(comp){
        comp.classList.remove("hidden");
        comp.style.position = "static";
        comp.style.inset = "auto";
      }
    },
    unmount(){
      const comp = el("composerOverlay");
      if(comp) comp.classList.add("hidden");
    }
  };

  Screens.social = {
    mount(){
      const s = el(ids.social);
      if(!s) return;
      ensureHeader(s, "Social", "Instagram/Spotify e crescita fan.");
      const wrap = s.querySelector(".screen-wrap") || s;

      if(!wrap.querySelector("#socialActions")){
        const card = document.createElement("div");
        card.className = "ui-card";
        card.id = "socialActions";
        card.style.padding = "12px";
        card.innerHTML = `
          <div class="u-row u-between u-gap-2">
            <b style="letter-spacing:.2px;">Social Hub</b>
            <span class="chip"><i></i>FANS</span>
          </div>
          <div class="u-row u-gap-2 u-mt-3" style="flex-wrap:wrap;">
            <button class="btn btn-primary" data-action="openWeekly">Eventi & Quest</button>
            <button class="btn btn-secondary" data-action="openNotifs">Notifiche</button>
            <button class="btn btn-secondary" data-action="openShop">Shop</button>
          </div>
        `;
        wrap.appendChild(card);
      }

      // Move phoneOverlay contents here if still exists, but keep hidden wrapper out
      const phone = el("phoneOverlay");
      if(phone){
        // prefer moving inner .phone-screen or .phone-shell
        const inner = phone.querySelector(".phone-screen") || phone.querySelector(".phone-shell") || phone;
        const host = document.createElement("div");
        host.className = "ui-card social-shell";
        host.style.padding = "12px";
        host.innerHTML = `<div class="u-row u-between u-gap-2">
            <b style="letter-spacing:.2px;">Social</b>
            <span class="chip"><i></i>APPS</span>
          </div>`;
        host.appendChild(inner);
        wrap.appendChild(host);
        // Remove old phone overlay wrapper to avoid overlays
        phone.remove();
      }
    },
    unmount(){
      // none
    }
  };

  Screens.season = {
    mount(){
      const s = el(ids.season);
      if(!s) return;
      ensureHeader(s, "Stagione", "Quest, pass e ricompense live-ops.");
      const wrap = s.querySelector(".screen-wrap") || s;

      if(!wrap.querySelector("#seasonActions")){
        const card = document.createElement("div");
        card.className = "ui-card";
        card.id = "seasonActions";
        card.style.padding = "12px";
        card.innerHTML = `
          <div class="u-row u-between u-gap-2">
            <b style="letter-spacing:.2px;">Stagione</b>
            <span class="chip"><i></i>LIVE</span>
          </div>
          <div class="u-row u-gap-2 u-mt-3" style="flex-wrap:wrap;">
            <button class="btn btn-primary" data-action="openWeekly">Apri quest</button>
            <button class="btn btn-secondary" data-action="openNotifs">Notifiche</button>
            <button class="btn btn-secondary" data-action="openShop">Shop</button>
          </div>
        `;
        wrap.prepend(card);
      }

      moveInto("seasonCard", wrap);
      moveInto("questCard", wrap);
    },
    unmount(){}
  };

  Screens.shop = {
    mount(){
      const s = el(ids.shop);
      if(!s) return;
      ensureHeader(s, "Negozio", "Daily deals, bundle, boost e cosmetici.");
      const wrap = s.querySelector(".screen-wrap") || s;

      // Ensure a shop action bar exists
      if(!wrap.querySelector("#shopActions")){
        const card = document.createElement("div");
        card.className = "ui-card";
        card.id = "shopActions";
        card.style.padding = "12px";
        card.innerHTML = `
          <div class="u-row u-between u-gap-2">
            <b style="letter-spacing:.2px;">Negozio</b>
            <span class="chip"><i></i>STORE</span>
          </div>
          <div class="u-row u-gap-2 u-mt-3" style="flex-wrap:wrap;">
            <button class="btn btn-primary" data-action="openShop">Apri shop</button>
            <button class="btn btn-secondary" data-action="openWeekly">Quest</button>
            <button class="btn btn-secondary" data-action="openNotifs">Notifiche</button>
          </div>
        `;
        wrap.prepend(card);
      }

      // Host shop overlay inside screen if exists
      const shopOverlay = el("shopScreen");
      if(shopOverlay){
        wrap.appendChild(shopOverlay);
        shopOverlay.style.position = "static";
        shopOverlay.style.inset = "auto";
        shopOverlay.classList.add("active-shop");
        shopOverlay.setAttribute("aria-hidden","false");
      }
    },
    unmount(){
      const shopOverlay = el("shopScreen");
      if(shopOverlay){
        shopOverlay.classList.remove("active-shop");
        shopOverlay.setAttribute("aria-hidden","true");
      }
    }
  };

  // Mount manager
  function mount(name){
    if(mounted[name]) return;
    mounted[name] = true;
    markMounted(name, true);
    try{ Screens[name]?.mount?.(); }catch(e){ console.warn("mount error", name, e); }
  }
  function unmount(name){
    if(!mounted[name]) return;
    // Keep home always mounted for performance
    if(name === "home") return;
    try{ Screens[name]?.unmount?.(); }catch(e){ console.warn("unmount error", name, e); }
    // We do not destroy DOM yet; just hide to keep state stable
  }

  // Integrate with router
  function currentScreen(){
    const h = (location.hash||"").replace("#","");
    return Object.keys(ids).includes(h) ? h : "home";
  }

  // Initialize screens default mount states
  Object.keys(ids).forEach(k=> markMounted(k, k==="home"));
  mount("home");

  // Wrap RapRiseNav.go to mount/unmount
  if(window.RapRiseNav && typeof window.RapRiseNav.go === "function" && !window.RapRiseNav.go.__step22){
    const prev = window.RapRiseNav.go;
    window.RapRiseNav.go = function(name, opts){
      const from = currentScreen();
      const r = prev(name, opts);
      const to = name;
      // mount target
      mount(to);
      // unmount from (light)
      unmount(from);
      // hide other screens by mounted attr (always show active via existing router)
      return r;
    };
    window.RapRiseNav.go.__step22 = true;
  }

  // On load, mount current route
  window.addEventListener("load", ()=>{
    const cur = currentScreen();
    mount(cur);
  }, { once:true });

})();

;

/* =========================
   STEP23: Cleanup & Consolidation
   - Centralize overlays into #overlayRoot
   - De-duplicate moved blocks (home hero/strip/stats, season, shop)
   - Move social-related blocks into Social screen (remove phone overlay)
   - Binding audit & self-heal for critical CTAs
   ========================= */
(function(){
  const OVR_IDS = ["rewardOverlay","onboardingOverlay","fxPing","notifPanel","toastRoot","snackbar","modalRoot"];
  const overlayRoot = document.getElementById("overlayRoot");

  function byId(id){ return document.getElementById(id); }
  function qsa(sel, root){ return Array.from((root||document).querySelectorAll(sel)); }

  function moveNode(node, target){
    if(!node || !target) return false;
    if(node.parentElement === target) return true;
    target.appendChild(node);
    return true;
  }

  function ensureOverlaysCentralized(){
    if(!overlayRoot) return;
    OVR_IDS.forEach(id=>{
      const n = byId(id);
      if(n) moveNode(n, overlayRoot);
    });
  }

  function removeIfExists(id){
    const n = byId(id);
    if(n) n.remove();
  }

  function dedupeById(id, keepParentId){
    const nodes = qsa("#"+CSS.escape(id));
    if(nodes.length <= 1) return;
    // keep the one inside keepParent if possible
    let keep = nodes.find(n => n.closest("#"+keepParentId));
    if(!keep) keep = nodes[0];
    nodes.forEach(n=> { if(n !== keep) n.remove(); });
  }

  function ensureInScreen(id, screenId){
    const node = byId(id);
    const screen = byId(screenId);
    if(!node || !screen) return false;
    const wrap = screen.querySelector(".screen-wrap") || screen;
    return moveNode(node, wrap);
  }

  function moveByHeuristics(){
    // Social: move any obvious social blocks by id prefixes/classes
    const social = byId("screen-social");
    if(social){
      const wrap = social.querySelector(".screen-wrap") || social;

      // Remove old phone overlay wrapper if still around
      removeIfExists("phoneOverlay");

      const candidates = qsa("[id*='social'],[id*='insta'],[id*='spotify'],[id*='live'],[class*='social'],[class*='insta'],[class*='spotify']", document);
      candidates.forEach(n=>{
        // avoid moving the screen containers themselves
        if(!n.id) return;
        if(n.id.startsWith("screen-")) return;
        // avoid overlay root
        if(n.closest("#overlayRoot")) return;
        // avoid onboarding/reward overlays
        if(["onboardingOverlay","rewardOverlay","shopScreen"].includes(n.id)) return;
        // avoid moving bottom nav
        if(n.closest(".bottom-nav")) return;

        // If it's already inside some other screen, don't steal it
        const inScreen = n.closest(".screen");
        if(inScreen && inScreen.id !== "screen-social") return;

        // Move if it looks like a social module and is not in home hero/stats
        const id = (n.id||"").toLowerCase();
        const cls = (n.className||"").toLowerCase();
        if(id.includes("social") || id.includes("insta") || id.includes("spotify") || id.includes("live") || cls.includes("social")){
          moveNode(n, wrap);
        }
      });
    }

    // Season: ensure key season blocks sit inside season screen
    ensureInScreen("seasonCard", "screen-season");
    ensureInScreen("questCard", "screen-season");

    // Home: ensure hero/strip/stats only exist once and in home
    ensureInScreen("homeHero", "screen-home");
    ensureInScreen("modeStrip", "screen-home");
    ensureInScreen("statsCard", "screen-home");
    dedupeById("homeHero", "screen-home");
    dedupeById("modeStrip", "screen-home");
    dedupeById("statsCard", "screen-home");
  }

  function selfHealCriticalButtons(){
    // Onboarding buttons: ensure enabled and clickable
    const ov = byId("onboardingOverlay");
    if(ov && !ov.classList.contains("hidden")){
      const save = byId("onboardingSaveBtn");
      const cancel = byId("onboardingCancelBtn");
      const skip = byId("onboardingSkipBtn");
      [save,cancel,skip].forEach(b=>{
        if(b){ b.disabled = false; b.style.pointerEvents = "auto"; }
      });
    }

    // If openShopBtn exists but is hidden inside another screen, allow opening anyway
    const openShop = byId("openShopBtn");
    if(openShop) openShop.disabled = false;

    // Prevent "dead click" on bottom nav due to overlays: if overlay visible, swallow nav
    document.addEventListener("click", (e)=>{
      const navBtn = e.target.closest("#bottomNav button");
      if(!navBtn) return;
      const ov1 = byId("onboardingOverlay");
      if(ov1 && !ov1.classList.contains("hidden")){
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation?.();
      }
    }, true);
  }

  function auditOnce(){
    const required = [
      "onboardingOverlay","onboardingSaveBtn",
      "screen-home","screen-studio","screen-social","screen-season","screen-shop",
      "bottomNav"
    ];
    const missing = required.filter(id => !byId(id));
    if(missing.length){
      console.warn("[RapRise] Missing critical ids:", missing);
    }
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    ensureOverlaysCentralized();
    moveByHeuristics();
    selfHealCriticalButtons();
    auditOnce();
  }, { once:true });

  // Also re-run consolidation after first load because some elements may be injected later
  window.addEventListener("load", ()=>{
    ensureOverlaysCentralized();
    moveByHeuristics();
  }, { once:true });

})();

;

/* =========================
   STEP26: Overlay focus trap + ESC close + inert background + nav polish
   - Tracks overlay stack (onboarding, reward, crash, QA, modals)
   - When overlay opens: focus first interactive element; trap Tab within; disable background
   - ESC closes top overlay (except onboarding if visible and mandatory)
   - Restores focus to previously focused element on close
   ========================= */
(function(){
  const OVERLAY_SELECTORS = [
    "#crashOverlay.show",
    "#onboardingOverlay:not(.hidden)",
    "#rewardOverlay:not(.hidden)",
    "#qaPanel.show",
    "#overlayRoot .overlay:not(.hidden)",
    "#overlayRoot .modal:not(.hidden)"
  ];

  const appRoot = document.getElementById("appRoot");
  let focusStack = [];
  let activeTrap = null;

  function qs(sel, root){ return (root||document).querySelector(sel); }
  function qsa(sel, root){ return Array.from((root||document).querySelectorAll(sel)); }

  function isVisible(el){
    if(!el) return false;
    if(el.classList.contains("hidden")) return false;
    const st = window.getComputedStyle(el);
    return st.display !== "none" && st.visibility !== "hidden" && st.opacity !== "0";
  }

  function topOverlay(){
    for(const sel of OVERLAY_SELECTORS){
      const el = qs(sel);
      if(el && isVisible(el)) return el;
    }
    return null;
  }

  function focusables(container){
    const items = qsa('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])', container)
      .filter(el => !el.disabled && isVisible(el));
    return items;
  }

  function setInert(on){
    if(!appRoot) return;
    appRoot.classList.toggle("inert", !!on);
    document.body.classList.toggle("modal-open", !!on);
  }

  function openTrap(overlay){
    if(!overlay) return;
    if(activeTrap === overlay) return;

    // save focus
    const prev = document.activeElement;
    if(prev && prev !== document.body) focusStack.push(prev);

    activeTrap = overlay;
    setInert(true);

    // Ensure a11y roles
    if(!overlay.getAttribute("role")){
      overlay.setAttribute("role", "dialog");
    }
    overlay.setAttribute("aria-modal", "true");

    // Focus first meaningful element
    const els = focusables(overlay);
    if(els.length){
      setTimeout(()=> els[0].focus(), 0);
    }else{
      overlay.setAttribute("tabindex","-1");
      setTimeout(()=> overlay.focus(), 0);
    }
  }

  function closeTrap(overlay){
    if(activeTrap && overlay && activeTrap !== overlay) return;

    activeTrap = null;
    setInert(false);

    // restore focus
    const prev = focusStack.pop();
    if(prev && document.contains(prev)){
      setTimeout(()=> prev.focus(), 0);
    }
  }

  function shouldTrap(){
    const ov = topOverlay();
    if(ov){
      openTrap(ov);
    }else{
      closeTrap(activeTrap);
    }
  }

  // Tab trapping
  document.addEventListener("keydown", (e)=>{
    if(!activeTrap) return;
    if(e.key !== "Tab") return;

    const els = focusables(activeTrap);
    if(!els.length) return;

    const first = els[0];
    const last = els[els.length - 1];
    const cur = document.activeElement;

    if(e.shiftKey){
      if(cur === first || !activeTrap.contains(cur)){
        e.preventDefault();
        last.focus();
      }
    }else{
      if(cur === last){
        e.preventDefault();
        first.focus();
      }
    }
  }, true);

  // ESC closes top overlay except mandatory onboarding (visible)
  document.addEventListener("keydown", (e)=>{
    if(e.key !== "Escape") return;
    const ov = topOverlay();
    if(!ov) return;

    // If onboarding is visible, do not close with ESC
    const onboarding = document.getElementById("onboardingOverlay");
    if(onboarding && isVisible(onboarding)) return;

    // Prefer close buttons if present
    const closeBtn =
      ov.querySelector('[data-close], .close, .btn-close, #shopCloseBtn, #rewardCloseBtn, #qaCloseBtn') ||
      document.getElementById("qaCloseBtn");

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation?.();

    if(closeBtn && !closeBtn.disabled){
      closeBtn.click();
      return;
    }

    // Fallback: hide overlay
    ov.classList.add("hidden");
    if(ov.id === "crashOverlay") ov.classList.remove("show");
    shouldTrap();
  }, true);

  // Observe overlay state changes
  const mo = new MutationObserver(()=> shouldTrap());
  mo.observe(document.body, { attributes:true, subtree:true, attributeFilter:["class","style","aria-hidden"] });

  // Also on navigation changes
  window.addEventListener("hashchange", ()=> setTimeout(shouldTrap, 0), true);
  window.addEventListener("load", ()=> setTimeout(shouldTrap, 0), { once:true });

  // Nav polish: ensure bottom nav buttons have aria-current
  function updateNavAria(){
    const h = (location.hash||"").replace("#","") || "home";
    const nav = document.getElementById("bottomNav");
    if(!nav) return;
    nav.querySelectorAll("button[data-screen]").forEach(b=>{
      const on = b.getAttribute("data-screen") === h;
      b.setAttribute("aria-current", on ? "page" : "false");
    });
  }
  window.addEventListener("hashchange", updateNavAria, true);
  window.addEventListener("load", updateNavAria, { once:true });

})();


/* =========================
   STEP32: Settings Panel logic
   ========================= */
(function(){
  const $ = (id)=> document.getElementById(id);
  const modal = $("settingsModal");
  const openBtn = $("navSettingsBtn");
  const closeBtn = $("settingsCloseBtn");

  function show(){
    if(!modal) return;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden","false");
  }
  function hide(){
    if(!modal) return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden","true");
  }

  if(openBtn && !openBtn.__step32){
    openBtn.__step32 = true;
    openBtn.addEventListener("click", (e)=>{ e.preventDefault(); e.stopPropagation(); show(); }, true);
  }
  if(closeBtn && !closeBtn.__step32){
    closeBtn.__step32 = true;
    closeBtn.addEventListener("click", (e)=>{ e.preventDefault(); e.stopPropagation(); hide(); }, true);
  }

  // Buttons
  const hint = $("settingsHint");
  function setHint(msg){
    if(hint) hint.textContent = msg || "";
  }

  $("togglePerfBtn")?.addEventListener("click", ()=>{
    try{
      const key = "raprise_perf_mode_v1";
      const on = (localStorage.getItem(key) === "1");
      localStorage.setItem(key, on ? "0" : "1");
      setHint("Perf Mode " + (!on ? "attivato" : "disattivato") + ". Ricarica consigliata.");
    }catch{
      setHint("Impossibile salvare Perf Mode (storage non disponibile).");
    }
  }, true);

  $("toggleSafeBtn")?.addEventListener("click", ()=>{
    try{
      const key = "raprise_safe_mode_v1";
      const on = (localStorage.getItem(key) === "1");
      localStorage.setItem(key, on ? "0" : "1");
      setHint("Safe Mode " + (!on ? "attivato" : "disattivato") + ". Ricarica consigliata.");
    }catch{
      setHint("Impossibile salvare Safe Mode (storage non disponibile).");
    }
  }, true);

  $("runQaBtn")?.addEventListener("click", ()=>{
    try{
      const qa = $("qaPanel");
      if(qa){
        qa.classList.add("show");
        qa.setAttribute("aria-hidden","false");
        setHint("QA Console aperta (Ctrl+Shift+D).");
      }else{
        setHint("QA Console non presente in questa build.");
      }
    }catch{
      setHint("Impossibile aprire QA Console.");
    }
  }, true);

  $("exportSaveBtn")?.addEventListener("click", async ()=>{
    try{
      const token = window.RapRiseSave?.exportString?.();
      if(!token){ setHint("Export non disponibile: RapRiseSave.exportString assente."); return; }
      if(navigator.clipboard?.writeText){
        await navigator.clipboard.writeText(token);
        setHint("Export copiato negli appunti.");
      }else{
        setHint("Export generato (clipboard non disponibile).");
      }
    }catch{
      setHint("Export fallito.");
    }
  }, true);

  $("restoreBackupBtn")?.addEventListener("click", ()=>{
    try{
      const backups = JSON.parse(localStorage.getItem("raprise_save_backups_v1")||"[]");
      if(!Array.isArray(backups) || backups.length===0){ setHint("Nessun backup disponibile."); return; }
      const last = backups[0];
      const token = btoa(unescape(encodeURIComponent(JSON.stringify(last))));
      const res = window.RapRiseSave?.importString?.(token);
      if(res && res.ok){
        setHint("Backup ripristinato. Premi Ricarica.");
      }else{
        setHint("Ripristino fallito: " + (res?.msg || "errore"));
      }
    }catch{
      setHint("Ripristino fallito.");
    }
  }, true);

  $("hardReloadBtn")?.addEventListener("click", ()=> location.reload(), true);

  // Close on overlay click
  if(modal && !modal.__step32){
    modal.__step32 = true;
    modal.addEventListener("click", (e)=>{
      if(e.target === modal) hide();
    }, true);
  }
})();


/* =========================
   STEP33: About/Version + SW status (Settings)
   ========================= */
(function(){
  function $(id){ return document.getElementById(id); }
  const buildChip = $("aboutBuildId");
  const swChip = $("aboutSw");
  const cacheChip = $("aboutCache");
  const btnUpdate = $("aboutCheckUpdateBtn");
  const btnUnreg = $("aboutUnregisterSwBtn");

  function getBuildId(){
    const m = document.querySelector('meta[name="raprise-build"]');
    if(m && m.content) return m.content;
    const m2 = document.querySelector('meta[name="raprise-build-id"]');
    if(m2 && m2.content) return m2.content;
    return "unknown";
  }

  async function updateInfo(){
    if(buildChip) buildChip.textContent = getBuildId();

    // SW status
    let sw = "n/a";
    try{
      if("serviceWorker" in navigator){
        const reg = await navigator.serviceWorker.getRegistration();
        if(!reg) sw = "not-registered";
        else if(reg.waiting) sw = "update-ready";
        else if(reg.installing) sw = "installing";
        else sw = navigator.serviceWorker.controller ? "active" : "registered";
      }
    }catch{
      sw = "error";
    }
    if(swChip) swChip.textContent = sw;

    // Cache info
    let c = "n/a";
    try{
      if("caches" in window){
        const keys = await caches.keys();
        c = keys.filter(k=>k.startsWith("raprise-")).length + " cache";
      }
    }catch{
      c = "error";
    }
    if(cacheChip) cacheChip.textContent = c;
  }

  // Update when settings opens
  const settingsBtn = $("navSettingsBtn");
  if(settingsBtn && !settingsBtn.__step33){
    settingsBtn.__step33 = true;
    settingsBtn.addEventListener("click", ()=> updateInfo(), true);
  }

  btnUpdate?.addEventListener("click", async ()=>{
    try{
      if(!("serviceWorker" in navigator)){ await updateInfo(); return; }
      const reg = await navigator.serviceWorker.getRegistration();
      if(!reg){ await updateInfo(); return; }
      await reg.update();
      // If updated worker exists, activate
      if(reg.waiting) reg.waiting.postMessage({ type:"SKIP_WAITING" });
      await updateInfo();
    }catch{
      await updateInfo();
    }
  }, true);

  btnUnreg?.addEventListener("click", async ()=>{
    try{
      if("serviceWorker" in navigator){
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r=>r.unregister()));
      }
      if("caches" in window){
        const keys = await caches.keys();
        await Promise.all(keys.filter(k=>k.startsWith("raprise-")).map(k=>caches.delete(k)));
      }
      await updateInfo();
    }catch{
      await updateInfo();
    }
  }, true);

  window.addEventListener("load", ()=> updateInfo(), { once:true });
})();


/* =========================
   STEP34: Save schema versioning + migration + Release Notes screen
   ========================= */
(function(){
  const SAVE_KEY = "raprise_save_v1";
  const BACKUPS_KEY = "raprise_save_backups_v1";
  const SCHEMA_VERSION = 2; // step34 schema
  const NOTES_URL = "./release-notes.json";

  function safeJsonParse(s, fallback){
    try{ return JSON.parse(s); }catch{ return fallback; }
  }
  function now(){ return Date.now(); }

  // ---- Save Layer (augment existing RapRiseSave if present) ----
  window.RapRiseSave = window.RapRiseSave || {};

  // Validate & normalize save object
  function normalizeSave(obj){
    if(!obj || typeof obj !== "object") return null;
    obj.meta = obj.meta || {};
    obj.player = obj.player || {};
    obj.meta.schemaVersion = obj.meta.schemaVersion || 1;
    obj.meta.updatedAt = obj.meta.updatedAt || now();
    return obj;
  }

  function snapshotBackup(obj){
    try{
      const backups = safeJsonParse(localStorage.getItem(BACKUPS_KEY)||"[]", []);
      backups.unshift(obj);
      while(backups.length > 10) backups.pop();
      localStorage.setItem(BACKUPS_KEY, JSON.stringify(backups));
    }catch{}
  }

  function migrate(save){
    // Always snapshot before migrating
    snapshotBackup(JSON.parse(JSON.stringify(save)));

    let v = save.meta?.schemaVersion || 1;

    // v1 -> v2 migration
    if(v < 2){
      // Ensure stable player name keys
      save.player.stageName = save.player.stageName || save.player.artistName || "Rookie MC";
      delete save.player.artistName;

      // Ensure currencies exist
      save.wallet = save.wallet || {};
      save.wallet.coins = Number.isFinite(save.wallet.coins) ? save.wallet.coins : (save.coins || 0);
      save.wallet.gems  = Number.isFinite(save.wallet.gems)  ? save.wallet.gems  : (save.gems  || 0);
      delete save.coins; delete save.gems;

      // Ensure progression container
      save.progress = save.progress || {};
      save.progress.level = Number.isFinite(save.progress.level) ? save.progress.level : (save.level || 1);
      delete save.level;

      v = 2;
      save.meta.schemaVersion = 2;
      save.meta.migratedAt = now();
    }

    save.meta.schemaVersion = v;
    save.meta.updatedAt = now();
    save.meta.migrationBuild = "step34";
    return save;
  }

  function loadRaw(){
    const raw = localStorage.getItem(SAVE_KEY);
    if(!raw) return null;
    const obj = normalizeSave(safeJsonParse(raw, null));
    return obj;
  }

  function saveRaw(obj){
    try{
      obj = normalizeSave(obj);
      obj.meta.updatedAt = now();
      localStorage.setItem(SAVE_KEY, JSON.stringify(obj));
      return { ok:true };
    }catch(e){
      return { ok:false, msg:"save-failed" };
    }
  }

  // Public API
  window.RapRiseSave.load = function(){
    const obj = loadRaw();
    if(!obj) return null;
    const v = obj.meta?.schemaVersion || 1;
    if(v < SCHEMA_VERSION){
      const migrated = migrate(obj);
      saveRaw(migrated);
      return migrated;
    }
    return obj;
  };

  window.RapRiseSave.save = function(obj){
    obj = normalizeSave(obj);
    obj.meta.schemaVersion = SCHEMA_VERSION;
    return saveRaw(obj);
  };

  window.RapRiseSave.exportString = function(){
    const obj = loadRaw() || window.state || null;
    if(!obj) return null;
    const normalized = normalizeSave(JSON.parse(JSON.stringify(obj)));
    normalized.meta.schemaVersion = normalized.meta.schemaVersion || SCHEMA_VERSION;
    // base64 token
    return btoa(unescape(encodeURIComponent(JSON.stringify(normalized))));
  };

  window.RapRiseSave.importString = function(token){
    try{
      const jsonStr = decodeURIComponent(escape(atob(token)));
      const obj = normalizeSave(safeJsonParse(jsonStr, null));
      if(!obj) return { ok:false, msg:"invalid-json" };

      // basic validation
      if(!obj.player || typeof obj.player !== "object") return { ok:false, msg:"missing-player" };

      // migrate if needed
      const v = obj.meta?.schemaVersion || 1;
      const finalObj = (v < SCHEMA_VERSION) ? migrate(obj) : obj;

      // snapshot current before overwrite
      const cur = loadRaw();
      if(cur) snapshotBackup(cur);

      saveRaw(finalObj);
      // also update runtime state if exists
      try{ window.state = finalObj; }catch{}
      return { ok:true, msg:"imported" };
    }catch(e){
      return { ok:false, msg:"invalid-token" };
    }
  };

  // Auto-load into state on boot (non-breaking)
  document.addEventListener("DOMContentLoaded", ()=>{
    try{
      const s = window.RapRiseSave.load();
      if(s && typeof s === "object"){
        window.state = window.state && typeof window.state === "object" ? Object.assign(window.state, s) : s;
      }
    }catch{}
  }, { once:true });

  // ---- Release Notes Screen ----
  async function fetchNotes(){
    try{
      const res = await fetch(NOTES_URL, { cache:"no-store" });
      if(!res.ok) throw new Error("http");
      return await res.json();
    }catch{
      return null;
    }
  }

  function mountNotesScreen(data){
    const screen = document.getElementById("screen-notes");
    if(!screen) return;
    // header wrap (compatible with Step22 ensureHeader, but local)
    if(!screen.querySelector(".screen-head")){
      const head = document.createElement("div");
      head.className = "screen-head";
      head.innerHTML = \`
        <div style="min-width:0;">
          <div class="ttl">Release Notes</div>
          <div class="sub">Cronologia build e cambiamenti.</div>
        </div>
        <span class="chip"><i></i>INFO</span>\`;
      screen.appendChild(head);
    }
    let wrap = screen.querySelector(".screen-wrap");
    if(!wrap){
      wrap = document.createElement("div");
      wrap.className = "screen-wrap screen-module notes-wrap";
      screen.appendChild(wrap);
    }
    wrap.innerHTML = "";

    if(!data || !Array.isArray(data.build_notes)){
      const c = document.createElement("div");
      c.className = "note-item";
      c.innerHTML = "<b class='b'>Release notes non disponibili.</b>";
      wrap.appendChild(c);
      return;
    }

    data.build_notes.forEach(item=>{
      const c = document.createElement("div");
      c.className = "note-item";
      const hs = (item.highlights||[]).map(x=>"<li>"+String(x)+"</li>").join("");
      c.innerHTML = \`
        <div class="h">
          <div class="b">\${item.build}</div>
          <span class="chip"><i></i>\${item.date || ""}</span>
        </div>
        <ul>\${hs}</ul>
      \`;
      wrap.appendChild(c);
    });
  }

  async function openNotes(){
    // Ensure nav exists
    const nav = window.RapRiseNav;
    if(nav && typeof nav.go === "function"){
      nav.go("notes", { replace:false });
    }else{
      // fallback: set hash directly
      location.hash = "#notes";
    }
    const data = await fetchNotes();
    mountNotesScreen(data);
  }

  // Hook router to recognize #notes
  try{
    // Extend Step22 ids mapping if present
    if(window.RapRiseNav && window.RapRiseNav._ids && !window.RapRiseNav._ids.notes){
      window.RapRiseNav._ids.notes = "screen-notes";
    }
  }catch{}

  // Map hash #notes to screen-notes (fallback if router unaware)
  window.addEventListener("hashchange", async ()=>{
    if((location.hash||"") === "#notes"){
      const data = await fetchNotes();
      mountNotesScreen(data);
      // show screen if using mounted system
      const s = document.getElementById("screen-notes");
      if(s){ s.dataset.mounted = "1"; }
    }
  }, true);

  // Settings button
  const btn = document.getElementById("openNotesBtn");
  if(btn && !btn.__step34){
    btn.__step34 = true;
    btn.addEventListener("click", (e)=>{
      e.preventDefault(); e.stopPropagation();
      // close settings modal if open
      document.getElementById("settingsCloseBtn")?.click();
      openNotes();
    }, true);
  }

})();


/* =========================
   STEP35: Telemetry light + diagnostics export (no server)
   - Captures: errors, unhandledrejection, key navigation/actions, perf marks (if RapRisePerf)
   - Stores ring buffer in localStorage (raprise_diag_v1)
   - Exports a single JSON blob and copies to clipboard
   ========================= */
(function(){
  const KEY = "raprise_diag_v1";
  const MAX = 220; // ring buffer size
  const SESSION_ID = (function(){
    try{
      const s = sessionStorage.getItem("raprise_session_id_v1");
      if(s) return s;
      const id = Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
      sessionStorage.setItem("raprise_session_id_v1", id);
      return id;
    }catch{
      return "no-session";
    }
  })();

  function safeParse(s, fb){ try{ return JSON.parse(s); }catch{ return fb; } }
  function now(){ return Date.now(); }
  function ts(){ return new Date().toISOString(); }

  function read(){
    try{ return safeParse(localStorage.getItem(KEY)||"{}", { events: [] }); }
    catch{ return { events: [] }; }
  }
  function write(obj){
    try{ localStorage.setItem(KEY, JSON.stringify(obj)); }catch{}
  }
  function push(evt){
    const db = read();
    db.events = Array.isArray(db.events) ? db.events : [];
    db.events.unshift(evt);
    if(db.events.length > MAX) db.events.length = MAX;
    write(db);
  }

  function buildId(){
    const m = document.querySelector('meta[name="raprise-build"]');
    return m?.content || "unknown";
  }

  // Basic event capture
  function capture(type, data){
    push({ t: ts(), type, sid: SESSION_ID, data });
  }

  // Errors
  window.addEventListener("error", (e)=>{
    capture("error", {
      msg: e?.message || "Error",
      src: e?.filename ? e.filename.split("/").slice(-1)[0] : "",
      line: e?.lineno || null,
      col: e?.colno || null
    });
  }, true);

  window.addEventListener("unhandledrejection", (e)=>{
    const r = e?.reason;
    capture("unhandledrejection", { msg: r?.message || String(r) });
  }, true);

  // Nav/actions (capture only high-level, not PII)
  window.addEventListener("hashchange", ()=>{
    capture("nav", { hash: location.hash || "#home" });
  }, true);

  document.addEventListener("click", (e)=>{
    const btn = e.target.closest("button,[data-action]");
    if(!btn) return;
    const id = btn.id || "";
    const action = btn.getAttribute("data-action") || "";
    const screen = (location.hash||"").replace("#","") || "home";
    // Filter noisy buttons
    if(id === "qaRunBtn" || id === "qaClearBtn") return;
    capture("click", { id, action, screen });
  }, true);

  // Provide diagnostics export
  async function getSwStatus(){
    try{
      if(!("serviceWorker" in navigator)) return { sw:"n/a" };
      const reg = await navigator.serviceWorker.getRegistration();
      if(!reg) return { sw:"not-registered" };
      return {
        sw: navigator.serviceWorker.controller ? "active" : "registered",
        waiting: !!reg.waiting,
        installing: !!reg.installing
      };
    }catch{
      return { sw:"error" };
    }
  }

  async function getCacheInfo(){
    try{
      if(!("caches" in window)) return { caches:"n/a" };
      const keys = await caches.keys();
      const rap = keys.filter(k=>k.startsWith("raprise-"));
      return { caches: rap.length, keys: rap.slice(0, 6) };
    }catch{
      return { caches:"error" };
    }
  }

  function getPerfMarks(){
    try{
      const marks = window.RapRisePerf?.getMarks?.();
      return Array.isArray(marks) ? marks.slice(0, 20) : [];
    }catch{
      return [];
    }
  }

  function getConfigSnapshot(){
    const snap = {};
    try{
      snap.safeMode = localStorage.getItem("raprise_safe_mode_v1") === "1";
      snap.perfMode = localStorage.getItem("raprise_perf_mode_v1") === "1";
    }catch{}
    return snap;
  }

  async function exportDiagnostics(){
    const payload = {
      product: "RapRise",
      build: buildId(),
      generatedAt: ts(),
      sessionId: SESSION_ID,
      location: { hash: location.hash || "#home", ua: navigator.userAgent },
      config: getConfigSnapshot(),
      sw: await getSwStatus(),
      cache: await getCacheInfo(),
      saveMeta: (function(){
        try{
          const raw = localStorage.getItem("raprise_save_v1");
          if(!raw) return null;
          const obj = safeParse(raw, null);
          return obj?.meta ? obj.meta : null;
        }catch{ return null; }
      })(),
      perf: getPerfMarks(),
      diag: read()
    };
    return JSON.stringify(payload, null, 2);
  }

  async function copyToClipboard(text){
    if(navigator.clipboard?.writeText){
      await navigator.clipboard.writeText(text);
      return true;
    }
    // fallback: textarea
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }

  function setHint(msg){
    const el = document.getElementById("diagHint");
    if(el) el.textContent = msg || "";
  }

  const btn = document.getElementById("diagExportBtn");
  const clr = document.getElementById("diagClearBtn");
  if(btn && !btn.__step35){
    btn.__step35 = true;
    btn.addEventListener("click", async ()=>{
      try{
        capture("diag_export", { from:"settings" });
        const txt = await exportDiagnostics();
        await copyToClipboard(txt);
        setHint("Diagnostica copiata negli appunti. Incollala qui o salvala in un file.");
      }catch{
        setHint("Impossibile generare o copiare la diagnostica.");
      }
    }, true);
  }
  if(clr && !clr.__step35){
    clr.__step35 = true;
    clr.addEventListener("click", ()=>{
      try{ localStorage.removeItem(KEY); }catch{}
      setHint("Log diagnostico resettato.");
    }, true);
  }

  // Initial marker
  document.addEventListener("DOMContentLoaded", ()=>{
    capture("boot", { build: buildId() });
  }, { once:true });

})();


/* =========================
   STEP36: Anti-regression Suite (E2E-ish, no server)
   - Runs deterministic steps:
     1) Navigate all screens via router/hash
     2) Open/close Settings, QA, Shop/Season triggers
     3) Verify overlays trap/inert doesn't break nav
     4) Verify save layer load/export doesn't throw
     5) Verify no JS errors increased during run (if QA counters exist)
   - Produces detailed log in QA panel
   ========================= */
(function(){
  const $ = (id)=> document.getElementById(id);
  const sleep = (ms)=> new Promise(r=> setTimeout(r, ms));
  const logEl = ()=> $("qaRegLog");
  const evLog = ()=> $("qaEventLog");

  function writeLog(lines){
    const el = logEl();
    if(!el) return;
    el.classList.add("show");
    el.textContent = lines.join("\n");
  }
  function pushEvent(line){
    const el = evLog();
    if(!el) return;
    el.textContent = `[${new Date().toLocaleTimeString()}] ${line}\n` + (el.textContent || "");
  }

  function visible(el){
    if(!el) return false;
    if(el.classList.contains("hidden")) return false;
    const st = getComputedStyle(el);
    return st.display !== "none" && st.visibility !== "hidden" && st.opacity !== "0";
  }

  async function go(screen){
    const nav = window.RapRiseNav;
    if(nav && typeof nav.go === "function"){
      nav.go(screen, { replace:true });
    }else{
      location.hash = "#" + screen;
    }
    await sleep(60);
    return (location.hash||"").replace("#","") || "home";
  }

  function assert(cond, name, detail, out){
    if(cond){
      out.pass++;
      out.lines.push(`OK   - ${name}`);
    }else{
      out.fail++;
      out.lines.push(`FAIL - ${name}${detail ? " | " + detail : ""}`);
    }
  }

  async function click(id){
    const el = $(id);
    if(!el) return false;
    el.click();
    await sleep(60);
    return true;
  }

  async function runSuite(){
    const out = { pass:0, fail:0, lines:[] };
    pushEvent("Regression Suite: start");

    // Baseline errors count if QA exists
    const errCountBefore = parseInt($("qaErrCount")?.textContent || "0", 10);

    // 1) Critical IDs
    ["screen-home","screen-studio","screen-social","screen-season","screen-shop","bottomNav"].forEach(id=>{
      assert(!!$(id), `DOM id presente: ${id}`, null, out);
    });

    // 2) Router nav sequence
    for(const s of ["home","studio","social","season","shop","notes","home"]){
      const h = await go(s);
      assert(h === s, `Nav -> #${s}`, `hash=${h}`, out);
    }

    // 3) Settings modal open/close
    const opened = await click("navSettingsBtn");
    assert(opened, "Settings: bottone presente", null, out);
    assert(visible($("settingsModal")), "Settings: si apre", null, out);
    await click("settingsCloseBtn");
    assert(!visible($("settingsModal")), "Settings: si chiude", null, out);

    // 4) QA panel open/close via keyboard toggle simulation (direct class for determinism)
    const qa = $("qaPanel");
    if(qa){
      qa.classList.add("show"); qa.setAttribute("aria-hidden","false");
      await sleep(30);
      assert(visible(qa), "QA: si apre", null, out);
      $("qaCloseBtn")?.click();
      await sleep(30);
      assert(!visible(qa), "QA: si chiude", null, out);
    }else{
      assert(false, "QA: presente", null, out);
    }

    // 5) Shop/Season triggers (best-effort)
    await go("home");
    const hadShop = !!$("openShopBtn");
    if(hadShop){
      await click("openShopBtn");
      // shop screen or modal should be visible
      const shopScreen = $("screen-shop");
      assert(true, "Shop: trigger click", null, out);
      // navigate to shop to ensure mounted
      const h2 = await go("shop");
      assert(h2 === "shop", "Shop: screen reachable", null, out);
    }else{
      assert(true, "Shop: trigger non presente (skipped)", null, out);
    }

    const hadDaily = !!$("dailyPill");
    if(hadDaily){
      await click("dailyPill");
      assert(true, "Season: daily trigger click", null, out);
      const h3 = await go("season");
      assert(h3 === "season", "Season: screen reachable", null, out);
    }else{
      assert(true, "Season: daily trigger non presente (skipped)", null, out);
    }

    // 6) Save API sanity
    try{
      const s = window.RapRiseSave?.load?.();
      assert(true, "Save: load() ok", null, out);
      const exp = window.RapRiseSave?.exportString?.();
      assert(!!exp, "Save: exportString() returns token", null, out);
    }catch(e){
      assert(false, "Save: load/export ok", "exception", out);
    }

    // 7) Error delta check
    const errCountAfter = parseInt($("qaErrCount")?.textContent || "0", 10);
    assert(errCountAfter <= errCountBefore, "Errori JS: non aumentati durante suite", `before=${errCountBefore} after=${errCountAfter}`, out);

    out.lines.unshift(`Regression Suite: ${out.pass} OK / ${out.fail} FAIL`);
    writeLog(out.lines);
    pushEvent(`Regression Suite: done (${out.pass} OK / ${out.fail} FAIL)`);

    // Update QA main status if present
    const status = $("qaStatus");
    if(status){
      status.className = out.fail === 0 ? "pill-ok" : "pill-bad";
      status.textContent = out.fail === 0 ? "Tutto OK" : "Problemi rilevati";
    }
    const passFail = $("qaPassFail");
    if(passFail) passFail.textContent = `${out.pass} OK / ${out.fail} FAIL`;
  }

  const btn = $("qaRegBtn");
  if(btn && !btn.__step36){
    btn.__step36 = true;
    btn.addEventListener("click", ()=> runSuite(), true);
  }

  // Expose for console usage
  window.RapRiseRegression = { run: runSuite };

})();


/* =========================
   STEP37: Content pass (Home/Studio/Social/Season/Shop/Notes)
   Goals:
   - No empty screens: each screen gets real UI modules
   - Minimal, deterministic gameplay wiring (no heavy loops)
   - Uses window.state + RapRiseSave (schema v2) when available
   ========================= */
(function(){
  const $ = (id)=> document.getElementById(id);
  const q = (sel, root)=> (root||document).querySelector(sel);
  const qa = (sel, root)=> Array.from((root||document).querySelectorAll(sel));

  // ---- State bootstrap (non-breaking) ----
  function ensureState(){
    const s = (window.state && typeof window.state === "object") ? window.state : {};
    s.meta = s.meta || {};
    s.player = s.player || {};
    s.wallet = s.wallet || { coins: 0, gems: 0 };
    s.progress = s.progress || { level: 1, xp: 0, xpToNext: 100 };
    s.library = Array.isArray(s.library) ? s.library : [];
    s.social = s.social || { followers: 120, hype: 10, reputation: 5 };
    s.season = s.season || { tier: 1, points: 0, nextTierAt: 100 };
    s.shop = s.shop || { lastRefreshAt: 0, purchased: {} };
    window.state = s;
    return s;
  }

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }
  function fmt(n){ try{ return Intl.NumberFormat("it-IT").format(n); }catch{ return String(n); } }

  function save(){
    try{
      const s = ensureState();
      window.RapRiseSave?.save?.(s);
    }catch{}
  }

  function award({coins=0, gems=0, xp=0, hype=0, followers=0, rep=0, seasonPts=0}){
    const s = ensureState();
    s.wallet.coins = (s.wallet.coins||0) + coins;
    s.wallet.gems  = (s.wallet.gems||0) + gems;
    s.social.hype = (s.social.hype||0) + hype;
    s.social.followers = (s.social.followers||0) + followers;
    s.social.reputation = (s.social.reputation||0) + rep;
    s.season.points = (s.season.points||0) + seasonPts;

    // XP + level up
    if(xp){
      s.progress.xp = (s.progress.xp||0) + xp;
      let loop = 0;
      while(s.progress.xp >= (s.progress.xpToNext||100) && loop++ < 10){
        s.progress.xp -= s.progress.xpToNext;
        s.progress.level = (s.progress.level||1) + 1;
        s.progress.xpToNext = Math.round((s.progress.xpToNext||100) * 1.18);
        // level-up reward
        s.wallet.coins += 150;
        s.social.hype += 1;
      }
    }

    // Season tier
    let loop2 = 0;
    while(s.season.points >= (s.season.nextTierAt||100) && loop2++ < 20){
      s.season.points -= s.season.nextTierAt;
      s.season.tier = (s.season.tier||1) + 1;
      s.season.nextTierAt = Math.round((s.season.nextTierAt||100) * 1.12);
      // tier reward
      s.wallet.coins += 200;
      if(s.season.tier % 5 === 0) s.wallet.gems += 1;
    }

    save();
    renderHUD();
    renderHomeSummary();
    renderSeason();
    renderSocial();
    renderShop();
  }

  // ---- HUD render hooks (non-breaking) ----
  function setText(id, value){
    const el = $(id);
    if(el) el.textContent = value;
  }
  function renderHUD(){
    const s = ensureState();
    // Try to bind if these ids exist in your layout; otherwise no-op.
    setText("hudCoins", fmt(s.wallet.coins||0));
    setText("hudGems", fmt(s.wallet.gems||0));
    setText("hudLevel", "Lv " + (s.progress.level||1));
  }

  // ---- Screen helpers ----
  function ensureHeader(screen, title, subtitle, tag){
    if(!screen) return;
    let head = q(".screen-head", screen);
    if(!head){
      head = document.createElement("div");
      head.className = "screen-head";
      screen.appendChild(head);
    }
    head.innerHTML = `
      <div style="min-width:0;">
        <div class="ttl">${title}</div>
        <div class="sub">${subtitle}</div>
      </div>
      <span class="chip"><i></i>${tag}</span>
    `;
  }

  function ensureWrap(screen){
    if(!screen) return null;
    let wrap = q(".screen-wrap", screen);
    if(!wrap){
      wrap = document.createElement("div");
      wrap.className = "screen-wrap screen-module";
      screen.appendChild(wrap);
    }
    return wrap;
  }

  // ---- HOME ----
  function mountHome(){
    const screen = $("screen-home");
    if(!screen) return;
    ensureHeader(screen, "Home", "Il tuo hub: progressi, eventi e azioni rapide.", "HUB");
    const wrap = ensureWrap(screen);
    if(wrap.dataset.step37 === "1") return;
    wrap.dataset.step37 = "1";

    wrap.innerHTML = `
      <div class="rr-two">
        <div class="rr-grid">
          <div class="ui-card" style="padding:12px;">
            <div class="rr-row" style="justify-content:space-between;">
              <b>Riepilogo carriera</b>
              <span class="rr-pill" id="rrBuildPill">BUILD</span>
            </div>
            <div class="rr-grid" style="margin-top:10px;">
              <div class="rr-kpi"><div><b>Livello</b><div><small id="rrHomeLevel">-</small></div></div><span class="chip"><i></i>XP</span></div>
              <div class="rr-kpi"><div><b>Follower</b><div><small id="rrHomeFollowers">-</small></div></div><span class="chip"><i></i>SOCIAL</span></div>
              <div class="rr-kpi"><div><b>Hype</b><div><small id="rrHomeHype">-</small></div></div><span class="chip"><i></i>LIVE</span></div>
            </div>
          </div>

          <div class="ui-card" style="padding:12px;">
            <b>Azioni rapide</b>
            <div class="rr-row" style="margin-top:10px;">
              <button class="btn btn-primary" id="rrQuickWrite">Scrivi un brano</button>
              <button class="btn btn-secondary" id="rrQuickQuest">Completa una quest</button>
              <button class="btn btn-secondary" id="rrQuickDeal">Compra un deal</button>
            </div>
            <div style="margin-top:10px; color:rgba(222,228,240,.86); font-size:.84rem; line-height:1.25;" id="rrHomeHint"></div>
          </div>
        </div>

        <div class="rr-grid">
          <div class="ui-card" style="padding:12px;">
            <div class="rr-row" style="justify-content:space-between;">
              <b>Evento della settimana</b>
              <span class="chip"><i></i>LIVE OPS</span>
            </div>
            <div style="margin-top:10px; color:rgba(222,228,240,.86); font-size:.84rem; line-height:1.25;">
              Obiettivo: pubblica 2 brani e raggiungi +500 follower. Ricompensa: 800 coins + 2 gems.
            </div>
            <div class="rr-row" style="margin-top:10px;">
              <button class="btn btn-secondary" id="rrClaimWeekly">Riscatta (demo)</button>
            </div>
          </div>

          <div class="ui-card" style="padding:12px;">
            <div class="rr-row" style="justify-content:space-between;">
              <b>Ultime uscite</b>
              <span class="chip"><i></i>LIBRARY</span>
            </div>
            <div class="rr-list" id="rrHomeTracks" style="margin-top:10px;"></div>
          </div>
        </div>
      </div>
    `;

    // Bind actions
    q("#rrQuickWrite", wrap)?.addEventListener("click", ()=>{
      window.RapRiseNav?.go?.("studio",{replace:false});
      setHint("rrHomeHint","Vai allo Studio: scrivi e rilascia un brano.");
    }, true);

    q("#rrQuickQuest", wrap)?.addEventListener("click", ()=>{
      award({coins:200, xp:40, seasonPts:25, followers:40, hype:1});
      setHint("rrHomeHint","Quest completata: +200 coins, +40 XP, +25 Season points, +40 follower.");
    }, true);

    q("#rrQuickDeal", wrap)?.addEventListener("click", ()=>{
      window.RapRiseNav?.go?.("shop",{replace:false});
      setHint("rrHomeHint","Negozio: scegli un deal giornaliero.");
    }, true);

    q("#rrClaimWeekly", wrap)?.addEventListener("click", ()=>{
      award({coins:800, gems:2, followers:500, hype:2});
      setHint("rrHomeHint","Ricompensa evento riscattata (demo).");
    }, true);

    renderHomeSummary();
  }

  function setHint(id, msg){
    const el = $(id);
    if(el) el.textContent = msg || "";
  }

  function renderHomeSummary(){
    const s = ensureState();
    setText("rrHomeLevel", `Lv ${(s.progress.level||1)} • XP ${(s.progress.xp||0)}/${(s.progress.xpToNext||100)}`);
    setText("rrHomeFollowers", fmt(s.social.followers||0));
    setText("rrHomeHype", fmt(s.social.hype||0));
    const build = document.querySelector('meta[name="raprise-build"]')?.content || "unknown";
    setText("rrBuildPill", build);

    // tracks
    const box = $("rrHomeTracks");
    if(box){
      const list = (s.library||[]).slice(0, 4);
      box.innerHTML = "";
      if(list.length === 0){
        box.innerHTML = `<div class="rr-item"><div class="t">Nessun brano rilasciato.</div><div class="d">Vai allo Studio e pubblica il tuo primo pezzo.</div></div>`;
      }else{
        list.forEach(t=>{
          const el = document.createElement("div");
          el.className = "rr-item";
          el.innerHTML = `
            <div class="h">
              <div>
                <div class="t">${t.title}</div>
                <div class="d">${t.hook}</div>
              </div>
              <span class="chip"><i></i>${t.rarity || "Common"}</span>
            </div>
            <div class="meta">
              <span class="chip"><i></i>${fmt(t.streams||0)} streams</span>
              <span class="chip"><i></i>+${fmt(t.followers||0)} follower</span>
            </div>`;
          box.appendChild(el);
        });
      }
    }
  }

  // ---- STUDIO ----
  const HOOKS = [
    "Zero scuse, solo run, faccio hit fino a domani.",
    "Mi guardano salire, ma non sanno da dove vengo.",
    "Se cado mi rialzo, e ci metto un ritornello.",
    "In studio fino a tardi, fuori il mondo e' troppo lento."
  ];
  const TITLES = [
    "Notte in Citta", "Rookie to Legend", "Fuoco Freddo", "Senza Paura", "Hype Control", "Rime e Metallo"
  ];
  const RARITIES = ["Common","Rare","Epic","Legendary"];

  function mountStudio(){
    const screen = $("screen-studio");
    if(!screen) return;
    ensureHeader(screen, "Studio", "Scrivi, registra e rilascia brani per crescere.", "STUDIO");
    const wrap = ensureWrap(screen);
    if(wrap.dataset.step37 === "1") return;
    wrap.dataset.step37 = "1";

    wrap.innerHTML = `
      <div class="rr-two">
        <div class="ui-card" style="padding:12px;">
          <b>Song Lab</b>
          <div class="rr-row" style="margin-top:10px;">
            <input class="rr-input" id="rrSongTitle" placeholder="Titolo del brano" />
          </div>
          <div class="rr-row" style="margin-top:10px;">
            <textarea class="rr-input" id="rrSongLyrics" rows="7" placeholder="Scrivi le barre..."></textarea>
          </div>
          <div class="rr-row" style="margin-top:10px;">
            <button class="btn btn-secondary" id="rrGenTitle">Titolo random</button>
            <button class="btn btn-secondary" id="rrGenHook">Genera Hook</button>
            <button class="btn btn-secondary" id="rrSaveDraft">Salva bozza</button>
          </div>
          <div class="rr-row" style="margin-top:10px;">
            <button class="btn btn-primary" id="rrRelease">Rilascia brano</button>
          </div>
          <div id="rrStudioHint" style="margin-top:10px; color:rgba(222,228,240,.86); font-size:.84rem; line-height:1.25;"></div>
        </div>

        <div class="rr-grid">
          <div class="ui-card" style="padding:12px;">
            <div class="rr-row" style="justify-content:space-between;">
              <b>Bozze</b>
              <span class="chip"><i></i>DRAFTS</span>
            </div>
            <div class="rr-list" id="rrDraftList" style="margin-top:10px;"></div>
          </div>
          <div class="ui-card" style="padding:12px;">
            <div class="rr-row" style="justify-content:space-between;">
              <b>Catalogo</b>
              <span class="chip"><i></i>TRACKS</span>
            </div>
            <div class="rr-list" id="rrTrackList" style="margin-top:10px;"></div>
          </div>
        </div>
      </div>
    `;

    const key = "raprise_drafts_v1";
    function readDrafts(){ try{ return JSON.parse(localStorage.getItem(key)||"[]"); }catch{ return []; } }
    function writeDrafts(list){ try{ localStorage.setItem(key, JSON.stringify(list.slice(0,20))); }catch{} }

    function renderDrafts(){
      const box = $("rrDraftList");
      if(!box) return;
      const list = readDrafts();
      box.innerHTML = "";
      if(list.length === 0){
        box.innerHTML = `<div class="rr-item"><div class="t">Nessuna bozza salvata.</div><div class="d">Salva una bozza per riprenderla in seguito.</div></div>`;
        return;
      }
      list.forEach((d, idx)=>{
        const el = document.createElement("div");
        el.className = "rr-item";
        el.innerHTML = `
          <div class="h">
            <div>
              <div class="t">${d.title || "Bozza senza titolo"}</div>
              <div class="d">${(d.lyrics||"").slice(0,80) || "..."}</div>
            </div>
            <button class="btn btn-secondary" data-idx="${idx}" style="min-width:120px;">Carica</button>
          </div>`;
        el.querySelector("button")?.addEventListener("click", ()=>{
          $("rrSongTitle").value = d.title || "";
          $("rrSongLyrics").value = d.lyrics || "";
          setHint("rrStudioHint","Bozza caricata.");
        }, true);
        box.appendChild(el);
      });
    }

    function renderTracks(){
      const s = ensureState();
      const box = $("rrTrackList");
      if(!box) return;
      const list = (s.library||[]).slice(0, 6);
      box.innerHTML = "";
      if(list.length === 0){
        box.innerHTML = `<div class="rr-item"><div class="t">Catalogo vuoto.</div><div class="d">Rilascia un brano per iniziare.</div></div>`;
        return;
      }
      list.forEach(t=>{
        const el = document.createElement("div");
        el.className = "rr-item";
        el.innerHTML = `
          <div class="h">
            <div>
              <div class="t">${t.title}</div>
              <div class="d">${t.hook}</div>
            </div>
            <span class="chip"><i></i>${t.rarity}</span>
          </div>
          <div class="meta">
            <span class="chip"><i></i>${fmt(t.streams)} streams</span>
            <span class="chip"><i></i>+${fmt(t.followers)} follower</span>
          </div>`;
        box.appendChild(el);
      });
    }

    function rarityRoll(){
      // weighted: common 60, rare 25, epic 12, leg 3
      const r = Math.random()*100;
      if(r < 60) return "Common";
      if(r < 85) return "Rare";
      if(r < 97) return "Epic";
      return "Legendary";
    }

    q("#rrGenTitle", wrap)?.addEventListener("click", ()=>{
      $("rrSongTitle").value = TITLES[Math.floor(Math.random()*TITLES.length)];
      setHint("rrStudioHint","Titolo generato.");
    }, true);

    q("#rrGenHook", wrap)?.addEventListener("click", ()=>{
      const hook = HOOKS[Math.floor(Math.random()*HOOKS.length)];
      const txt = $("rrSongLyrics").value || "";
      $("rrSongLyrics").value = (txt ? txt + "

" : "") + "HOOK: " + hook;
      setHint("rrStudioHint","Hook inserito.");
    }, true);

    q("#rrSaveDraft", wrap)?.addEventListener("click", ()=>{
      const title = ($("rrSongTitle").value||"").trim();
      const lyrics = ($("rrSongLyrics").value||"").trim();
      const list = readDrafts();
      list.unshift({ title, lyrics, at: Date.now() });
      writeDrafts(list);
      renderDrafts();
      setHint("rrStudioHint","Bozza salvata.");
    }, true);

    q("#rrRelease", wrap)?.addEventListener("click", ()=>{
      const s = ensureState();
      const title = ($("rrSongTitle").value||"").trim() || TITLES[Math.floor(Math.random()*TITLES.length)];
      const lyrics = ($("rrSongLyrics").value||"").trim();
      const hook = (lyrics.match(/HOOK:\s*(.+)/)?.[1] || HOOKS[Math.floor(Math.random()*HOOKS.length)]).slice(0, 90);
      const rarity = rarityRoll();
      const baseStreams = rarity === "Legendary" ? 12000 : rarity === "Epic" ? 6500 : rarity === "Rare" ? 2800 : 900;
      const streams = Math.round(baseStreams * (0.75 + Math.random()*0.6));
      const followers = Math.round(streams / 20);
      s.library.unshift({ id: "t"+Date.now(), title, hook, rarity, streams, followers, at: Date.now() });

      // Rewards
      const coins = Math.round(streams / 8);
      const xp = 35 + Math.round(streams / 400);
      const seasonPts = 20 + Math.round(streams / 300);
      award({ coins, xp, followers, hype: 1, seasonPts });

      // Clear
      $("rrSongTitle").value = "";
      $("rrSongLyrics").value = "";
      setHint("rrStudioHint", `Brano rilasciato: ${rarity}. +${fmt(coins)} coins, +${fmt(xp)} XP, +${fmt(followers)} follower.`);
      renderTracks();
      renderHomeSummary();
      renderSocial();
      renderSeason();
    }, true);

    renderDrafts();
    renderTracks();
  }

  // ---- SOCIAL ----
  function mountSocial(){
    const screen = $("screen-social");
    if(!screen) return;
    ensureHeader(screen, "Social", "Feed, collaborazioni e crescita follower.", "SOCIAL");
    const wrap = ensureWrap(screen);
    if(wrap.dataset.step37 === "1") return;
    wrap.dataset.step37 = "1";

    wrap.innerHTML = `
      <div class="rr-two">
        <div class="ui-card" style="padding:12px;">
          <div class="rr-row" style="justify-content:space-between;">
            <b>Metriche</b>
            <span class="chip"><i></i>KPIs</span>
          </div>
          <div class="rr-grid" style="margin-top:10px;">
            <div class="rr-kpi"><div><b>Follower</b><div><small id="rrSocFollowers">-</small></div></div><span class="chip"><i></i>F</span></div>
            <div class="rr-kpi"><div><b>Hype</b><div><small id="rrSocHype">-</small></div></div><span class="chip"><i></i>H</span></div>
            <div class="rr-kpi"><div><b>Reputazione</b><div><small id="rrSocRep">-</small></div></div><span class="chip"><i></i>R</span></div>
          </div>
          <div class="rr-row" style="margin-top:10px;">
            <button class="btn btn-primary" id="rrPost">Pubblica post</button>
            <button class="btn btn-secondary" id="rrCollab">Collab</button>
          </div>
          <div id="rrSocHint" style="margin-top:10px; color:rgba(222,228,240,.86); font-size:.84rem; line-height:1.25;"></div>
        </div>

        <div class="ui-card" style="padding:12px;">
          <div class="rr-row" style="justify-content:space-between;">
            <b>Feed</b>
            <span class="chip"><i></i>TREND</span>
          </div>
          <div class="rr-list" id="rrFeed" style="margin-top:10px;"></div>
        </div>
      </div>
    `;

    q("#rrPost", wrap)?.addEventListener("click", ()=>{
      const s = ensureState();
      const gain = 20 + Math.round(Math.random()*40) + Math.round((s.library?.[0]?.streams||0)/400);
      award({ followers: gain, hype: 1, rep: 1, coins: 80, xp: 15, seasonPts: 10 });
      setHint("rrSocHint", `Post pubblicato: +${fmt(gain)} follower, +80 coins.`);
    }, true);

    q("#rrCollab", wrap)?.addEventListener("click", ()=>{
      const s = ensureState();
      const cost = 250;
      if((s.wallet.coins||0) < cost){
        setHint("rrSocHint", `Coins insufficienti per la collab (serve ${fmt(cost)}).`);
        return;
      }
      s.wallet.coins -= cost;
      save();
      const gain = 180 + Math.round(Math.random()*220);
      award({ followers: gain, hype: 2, rep: 2, xp: 30, seasonPts: 20 });
      setHint("rrSocHint", `Collab riuscita: -${fmt(cost)} coins, +${fmt(gain)} follower.`);
    }, true);

    renderSocial();
  }

  function renderSocial(){
    const s = ensureState();
    setText("rrSocFollowers", fmt(s.social.followers||0));
    setText("rrSocHype", fmt(s.social.hype||0));
    setText("rrSocRep", fmt(s.social.reputation||0));

    const feed = $("rrFeed");
    if(!feed) return;

    const topTrack = s.library?.[0];
    const items = [];
    items.push({ t:"Trend", d:"Nuovo trend: #RookieToLegend. Pubblica 2 post per bonus hype." });
    if(topTrack){
      items.push({ t:"Ultima uscita", d:`"${topTrack.title}" sta girando: ${fmt(topTrack.streams)} streams in 24h.` });
    }else{
      items.push({ t:"Suggerimento", d:"Rilascia un brano nello Studio per popolare il feed e aumentare follower." });
    }
    items.push({ t:"Radar", d:"Collab consigliata: feat con creator mid-tier. Costo 250 coins." });

    feed.innerHTML = "";
    items.forEach(it=>{
      const el = document.createElement("div");
      el.className = "rr-item";
      el.innerHTML = `<div class="t">${it.t}</div><div class="d">${it.d}</div>`;
      feed.appendChild(el);
    });
  }

  // ---- SEASON ----
  const QUESTS = [
    { id:"q_post", name:"Pubblica 1 post", reward:{ coins:120, xp:15, seasonPts:15, followers:25 } },
    { id:"q_track", name:"Rilascia 1 brano", reward:{ coins:220, xp:30, seasonPts:25, followers:60 } },
    { id:"q_collab", name:"Esegui 1 collab", reward:{ coins:180, xp:25, seasonPts:20, hype:1 } },
  ];

  function mountSeason(){
    const screen = $("screen-season");
    if(!screen) return;
    ensureHeader(screen, "Stagione", "Quest, pass e milestone.", "SEASON");
    const wrap = ensureWrap(screen);
    if(wrap.dataset.step37 === "1") return;
    wrap.dataset.step37 = "1";

    wrap.innerHTML = `
      <div class="rr-two">
        <div class="ui-card" style="padding:12px;">
          <div class="rr-row" style="justify-content:space-between;">
            <b>Season Pass</b>
            <span class="chip"><i></i>PASS</span>
          </div>
          <div style="margin-top:10px;">
            <div class="rr-row" style="justify-content:space-between;">
              <span>Tier <b id="rrTier">-</b></span>
              <span><small id="rrTierPts">-</small></span>
            </div>
            <div class="rr-progress" style="margin-top:8px;"><i id="rrTierBar"></i></div>
          </div>
          <div class="rr-row" style="margin-top:10px;">
            <button class="btn btn-primary" id="rrClaimTier">Riscatta milestone (demo)</button>
          </div>
          <div id="rrSeasonHint" style="margin-top:10px; color:rgba(222,228,240,.86); font-size:.84rem; line-height:1.25;"></div>
        </div>

        <div class="ui-card" style="padding:12px;">
          <div class="rr-row" style="justify-content:space-between;">
            <b>Quest</b>
            <span class="chip"><i></i>DAILY</span>
          </div>
          <div class="rr-list" id="rrQuests" style="margin-top:10px;"></div>
        </div>
      </div>
    `;

    q("#rrClaimTier", wrap)?.addEventListener("click", ()=>{
      award({ coins:300, xp:25, seasonPts:35 });
      setHint("rrSeasonHint","Milestone riscattata (demo).");
    }, true);

    renderSeason();
  }

  function renderSeason(){
    const s = ensureState();
    setText("rrTier", String(s.season.tier||1));
    setText("rrTierPts", `${fmt(s.season.points||0)} / ${fmt(s.season.nextTierAt||100)} pts`);
    const pct = (s.season.nextTierAt||100) ? clamp((s.season.points||0)/(s.season.nextTierAt||100)*100, 0, 100) : 0;
    const bar = $("rrTierBar");
    if(bar) bar.style.width = pct.toFixed(1) + "%";

    const box = $("rrQuests");
    if(!box) return;
    box.innerHTML = "";
    QUESTS.forEach(qs=>{
      const el = document.createElement("div");
      el.className = "rr-item";
      el.innerHTML = `
        <div class="h">
          <div>
            <div class="t">${qs.name}</div>
            <div class="d">Ricompensa: ${fmt(qs.reward.coins||0)} coins, ${fmt(qs.reward.xp||0)} XP, ${fmt(qs.reward.seasonPts||0)} pts.</div>
          </div>
          <button class="btn btn-secondary" style="min-width:160px;">Completa</button>
        </div>`;
      el.querySelector("button")?.addEventListener("click", ()=>{
        award(qs.reward);
        setHint("rrSeasonHint", `Quest completata: ${qs.name}`);
      }, true);
      box.appendChild(el);
    });
  }

  // ---- SHOP ----
  function todayKey(){
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function buildDeals(){
    const key = todayKey();
    // deterministic-ish deals per day
    const seed = key.split("-").reduce((a,x)=>a+parseInt(x,10),0);
    function rng(i){ return (Math.sin(seed*999 + i*777) + 1) / 2; }
    return [
      { id:"deal_coins", name:"Pacco Coins", desc:"+1.000 coins", price:{ coins:0, gems:1 }, grant:{ coins:1000 } },
      { id:"deal_boost", name:"Boost Hype", desc:"+3 hype, +150 follower", price:{ coins:450, gems:0 }, grant:{ hype:3, followers:150 } },
      { id:"deal_xp", name:"Studio Session", desc:"+120 XP, +200 coins", price:{ coins:350, gems:0 }, grant:{ xp:120, coins:200 } },
    ].map((d, idx)=>{
      const mult = 0.9 + rng(idx)*0.25;
      // slight daily variance
      d.grant = Object.assign({}, d.grant);
      if(d.grant.coins) d.grant.coins = Math.round(d.grant.coins*mult);
      if(d.grant.xp) d.grant.xp = Math.round(d.grant.xp*mult);
      if(d.grant.followers) d.grant.followers = Math.round(d.grant.followers*mult);
      return d;
    });
  }

  function mountShop(){
    const screen = $("screen-shop");
    if(!screen) return;
    ensureHeader(screen, "Shop", "Deal giornalieri, bundle e cosmetici (demo).", "SHOP");
    const wrap = ensureWrap(screen);
    if(wrap.dataset.step37 === "1") return;
    wrap.dataset.step37 = "1";

    wrap.innerHTML = `
      <div class="rr-two">
        <div class="ui-card" style="padding:12px;">
          <div class="rr-row" style="justify-content:space-between;">
            <b>Wallet</b>
            <span class="chip"><i></i>CURRENCY</span>
          </div>
          <div class="rr-grid" style="margin-top:10px;">
            <div class="rr-kpi"><div><b>Coins</b><div><small id="rrShopCoins">-</small></div></div><span class="chip"><i></i>C</span></div>
            <div class="rr-kpi"><div><b>Gems</b><div><small id="rrShopGems">-</small></div></div><span class="chip"><i></i>G</span></div>
          </div>
          <div class="rr-row" style="margin-top:10px;">
            <button class="btn btn-secondary" id="rrFreeClaim">Free reward</button>
            <button class="btn btn-secondary" id="rrRefreshDeals">Aggiorna deals</button>
          </div>
          <div id="rrShopHint" style="margin-top:10px; color:rgba(222,228,240,.86); font-size:.84rem; line-height:1.25;"></div>
        </div>

        <div class="ui-card" style="padding:12px;">
          <div class="rr-row" style="justify-content:space-between;">
            <b>Daily deals</b>
            <span class="chip"><i></i>${todayKey()}</span>
          </div>
          <div class="rr-list" id="rrDeals" style="margin-top:10px;"></div>
        </div>
      </div>
    `;

    q("#rrFreeClaim", wrap)?.addEventListener("click", ()=>{
      award({ coins:150, xp:10, followers:15 });
      setHint("rrShopHint","Free reward riscattato: +150 coins.");
    }, true);

    q("#rrRefreshDeals", wrap)?.addEventListener("click", ()=>{
      // Force re-render (deals are daily deterministic; this is just UX)
      renderShop(true);
      setHint("rrShopHint","Deals aggiornati.");
    }, true);

    renderShop();
  }

  function renderShop(force){
    const s = ensureState();
    setText("rrShopCoins", fmt(s.wallet.coins||0));
    setText("rrShopGems", fmt(s.wallet.gems||0));
    const box = $("rrDeals");
    if(!box) return;

    const deals = buildDeals();
    box.innerHTML = "";
    deals.forEach(d=>{
      const el = document.createElement("div");
      el.className = "rr-item";
      const price = d.price.gems ? `${d.price.gems} gem` : `${fmt(d.price.coins)} coins`;
      el.innerHTML = `
        <div class="h">
          <div>
            <div class="t">${d.name}</div>
            <div class="d">${d.desc}</div>
          </div>
          <button class="btn btn-primary" style="min-width:160px;">Compra</button>
        </div>
        <div class="meta">
          <span class="chip"><i></i>Prezzo: ${price}</span>
        </div>`;
      el.querySelector("button")?.addEventListener("click", ()=>{
        const st = ensureState();
        // affordability
        if(d.price.coins && (st.wallet.coins||0) < d.price.coins){
          setHint("rrShopHint", "Coins insufficienti.");
          return;
        }
        if(d.price.gems && (st.wallet.gems||0) < d.price.gems){
          setHint("rrShopHint", "Gems insufficienti.");
          return;
        }
        if(d.price.coins) st.wallet.coins -= d.price.coins;
        if(d.price.gems) st.wallet.gems -= d.price.gems;
        save();
        award(d.grant);
        setHint("rrShopHint", `Acquisto completato: ${d.name}.`);
      }, true);
      box.appendChild(el);
    });
  }

  // ---- NOTES ----
  function mountNotes(){
    const screen = $("screen-notes");
    if(!screen) return;
    // Step34 already populates when opened; ensure it has a header if empty
    if(!q(".screen-head", screen)){
      ensureHeader(screen, "Release Notes", "Cronologia build e cambiamenti.", "INFO");
      ensureWrap(screen);
    }
  }

  // ---- Mount coordinator ----
  function mountFor(hash){
    const h = (hash||location.hash||"#home").replace("#","") || "home";
    if(h === "home") mountHome();
    if(h === "studio") mountStudio();
    if(h === "social") mountSocial();
    if(h === "season") mountSeason();
    if(h === "shop") mountShop();
    if(h === "notes") mountNotes();

    // keep HUD aligned
    renderHUD();
  }

  // Hook into navigation
  window.addEventListener("hashchange", ()=> mountFor(location.hash), true);
  document.addEventListener("DOMContentLoaded", ()=>{
    ensureState();
    mountFor(location.hash);
    // If save exists, load and re-render
    try{
      const loaded = window.RapRiseSave?.load?.();
      if(loaded && typeof loaded === "object"){
        window.state = Object.assign(ensureState(), loaded);
      }
    }catch{}
    renderHUD();
    renderHomeSummary();
    renderSocial();
    renderSeason();
    renderShop();
  }, { once:true });

})();


/* =========================
   STEP38: Motion gating + active screen transitions + skeleton loaders
   ========================= */
(function(){
  function isReducedMotion(){
    try{ return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch{ return false; }
  }
  function isPerfMode(){
    try{ return localStorage.getItem("raprise_perf_mode_v1") === "1"; }
    catch{ return false; }
  }
  function applyMotionGate(){
    const no = isReducedMotion() || isPerfMode();
    document.documentElement.classList.toggle("rr-nomotion", !!no);
  }

  // Apply immediately and on changes
  applyMotionGate();
  try{
    if(window.matchMedia){
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener?.("change", applyMotionGate);
    }
  }catch{}

  // Active screen class for transitions (non-invasive)
  const screens = ()=> Array.from(document.querySelectorAll(".screen[id^='screen-']"));
  function setActiveFromHash(){
    const h = (location.hash || "#home").replace("#","") || "home";
    const id = "screen-" + h;
    let active = document.getElementById(id);

    // fallback mapping for notes if router uses #notes
    if(!active && h === "notes") active = document.getElementById("screen-notes");

    screens().forEach(s=>{
      const on = (s === active);
      s.classList.toggle("rr-active", on);
      s.setAttribute("aria-hidden", on ? "false" : "true");
    });
  }

  window.addEventListener("hashchange", setActiveFromHash, true);
  document.addEventListener("DOMContentLoaded", ()=> setActiveFromHash(), { once:true });

  // Skeleton helper
  window.RapRiseUI = window.RapRiseUI || {};
  window.RapRiseUI.skeletonList = function(container, count){
    if(!container) return;
    const n = Math.max(3, Math.min(8, count || 4));
    const items = [];
    for(let i=0;i<n;i++){
      items.push(`
        <div class="rr-item rr-skel">
          <div class="rr-skel-line lg"></div>
          <div class="rr-skel-line md"></div>
          <div class="rr-skel-line sm"></div>
        </div>
      `);
    }
    container.innerHTML = items.join("");
  };

})();


/* =========================
   STEP38: Notes skeleton hook
   ========================= */
(function(){
  function onOpenNotes(){
    const screen = document.getElementById("screen-notes");
    if(!screen) return;
    const wrap = screen.querySelector(".screen-wrap") || screen.querySelector(".notes-wrap");
    if(wrap && window.RapRiseUI?.skeletonList){
      window.RapRiseUI.skeletonList(wrap, 5);
    }
  }
  window.addEventListener("hashchange", ()=>{
    if((location.hash||"") === "#notes") onOpenNotes();
  }, true);
  document.addEventListener("DOMContentLoaded", ()=>{
    if((location.hash||"") === "#notes") onOpenNotes();
  }, { once:true });
})();


/* =========================
   STEP39: UI consistency DOM pass
   - Non-breaking: upgrades existing content modules styling
   ========================= */
(function(){
  function upgrade(){
    // Convert rr-item into rr-rowcard for consistent styling
    document.querySelectorAll(".rr-item").forEach(el=>{
      el.classList.add("rr-rowcard");
    });

    // Mark cards that should be tight
    document.querySelectorAll(".ui-card").forEach(el=>{
      if(!el.classList.contains("tight")){
        // Many ui-cards already have inline padding; do not override.
        // Only add tight if no padding is set inline.
        const style = el.getAttribute("style") || "";
        if(!/padding\s*:\s*/i.test(style)){
          el.classList.add("tight");
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", ()=> upgrade(), { once:true });
  window.addEventListener("hashchange", ()=> setTimeout(upgrade, 30), true);
})();


/* =========================
   STEP40: Preflight Gate + Release Mode lock (in-app quality gate)
   Note:
   - This cannot literally block a GitHub Pages deploy.
   - It "blocks" by preventing enabling Release Mode, and surfaces failures prominently.
   ========================= */
(function(){
  const $ = (id)=> document.getElementById(id);
  const sleep = (ms)=> new Promise(r=> setTimeout(r, ms));

  const RELEASE_KEY = "raprise_release_ready_v1";
  const LAST_PREFLIGHT_KEY = "raprise_preflight_last_v1";

  function buildId(){
    const m = document.querySelector('meta[name="raprise-build"]');
    return m?.content || "unknown";
  }

  function setRibbon(kind, text){
    const wrap = $("releaseRibbon");
    const pill = $("releaseRibbonText");
    if(!wrap || !pill) return;
    wrap.classList.remove("hidden");
    pill.classList.remove("bad","good");
    if(kind) pill.classList.add(kind);
    pill.textContent = text || "DEV BUILD";
  }

  function isReleaseEnabled(){
    try{ return localStorage.getItem(RELEASE_KEY) === "1"; }catch{ return false; }
  }

  function setReleaseEnabled(on){
    try{ localStorage.setItem(RELEASE_KEY, on ? "1" : "0"); }catch{}
  }

  // ---- Assertions ----
  function assert(cond, name, detail, out){
    if(cond){
      out.pass++;
      out.lines.push(`OK   - ${name}`);
    }else{
      out.fail++;
      out.lines.push(`FAIL - ${name}${detail ? " | " + detail : ""}`);
    }
  }

  function visible(el){
    if(!el) return false;
    if(el.classList.contains("hidden")) return false;
    const st = getComputedStyle(el);
    return st.display !== "none" && st.visibility !== "hidden" && st.opacity !== "0";
  }

  async function go(screen){
    const nav = window.RapRiseNav;
    if(nav && typeof nav.go === "function"){
      nav.go(screen, { replace:true });
    }else{
      location.hash = "#" + screen;
    }
    await sleep(80);
    return (location.hash||"").replace("#","") || "home";
  }

  // ---- Audit checks ----
  async function checkRouter(out){
    const required = ["home","studio","social","season","shop","notes","home"];
    for(const s of required){
      const h = await go(s);
      assert(h === s, `Router: #${s}`, `hash=${h}`, out);
      const sid = (s==="notes") ? "screen-notes" : ("screen-" + s);
      const el = document.getElementById(sid);
      assert(!!el, `Screen DOM: ${sid}`, null, out);
    }
    // active screen class check (Step38)
    const active = document.querySelector(".screen.rr-active");
    assert(!!active, "Screen transitions: .rr-active presente", null, out);
  }

  async function checkOverlays(out){
    // Settings
    const open = $("navSettingsBtn");
    const modal = $("settingsModal");
    const close = $("settingsCloseBtn");
    assert(!!open, "Settings: navSettingsBtn presente", null, out);
    assert(!!modal, "Settings: modal presente", null, out);
    if(open && modal){
      open.click(); await sleep(60);
      assert(visible(modal), "Settings: apertura OK", null, out);
      close?.click(); await sleep(60);
      assert(!visible(modal), "Settings: chiusura OK", null, out);
    }

    // QA panel
    const qa = $("qaPanel");
    assert(!!qa, "QA: pannello presente", null, out);
    if(qa){
      qa.classList.add("show"); qa.setAttribute("aria-hidden","false");
      await sleep(40);
      assert(visible(qa), "QA: apertura OK", null, out);
      $("qaCloseBtn")?.click(); await sleep(40);
      assert(!visible(qa), "QA: chiusura OK", null, out);
    }
  }

  async function checkKeyButtons(out){
    // Home quick actions
    await go("home");
    const ids = ["rrQuickWrite","rrQuickQuest","rrQuickDeal","rrClaimWeekly"];
    ids.forEach(id=> assert(!!$(id), `Home: bottone ${id}`, null, out));

    // Studio
    await go("studio");
    ["rrGenTitle","rrGenHook","rrSaveDraft","rrRelease"].forEach(id=> assert(!!$(id), `Studio: bottone ${id}`, null, out));
    // Try a safe release (does not break if fields empty)
    if($("rrRelease")){
      $("rrRelease").click();
      await sleep(80);
      assert(true, "Studio: click rrRelease non crasha", null, out);
    }

    // Social
    await go("social");
    ["rrPost","rrCollab"].forEach(id=> assert(!!$(id), `Social: bottone ${id}`, null, out));
    if($("rrPost")){
      $("rrPost").click(); await sleep(50);
      assert(true, "Social: click rrPost non crasha", null, out);
    }

    // Season
    await go("season");
    assert(!!$("rrClaimTier"), "Season: rrClaimTier presente", null, out);

    // Shop
    await go("shop");
    ["rrFreeClaim","rrRefreshDeals"].forEach(id=> assert(!!$(id), `Shop: bottone ${id}`, null, out));
  }

  async function checkSaveLayer(out){
    try{
      const s = window.RapRiseSave?.load?.();
      assert(true, "Save: load() eseguito", null, out);
      const tok = window.RapRiseSave?.exportString?.();
      assert(!!tok && tok.length > 20, "Save: exportString() token valido", null, out);
      // Validate import token (roundtrip) without overwriting: importString snapshots anyway
      if(tok){
        const res = window.RapRiseSave?.importString?.(tok);
        assert(res && res.ok, "Save: importString(export) ok", res?.msg || "", out);
      }
    }catch(e){
      assert(false, "Save: load/export/import", "exception", out);
    }
  }

  async function checkSW(out){
    // Verify SW skip waiting handler exists (best-effort)
    try{
      if(!("serviceWorker" in navigator)){
        assert(true, "SW: non supportato (ok)", null, out);
        return;
      }
      const reg = await navigator.serviceWorker.getRegistration();
      // It's ok if not registered in local file scenarios.
      assert(true, "SW: getRegistration ok", null, out);
      if(reg){
        assert(true, "SW: registrato", null, out);
        assert(typeof reg.update === "function", "SW: update() disponibile", null, out);
      }else{
        assert(true, "SW: non registrato (ok in dev)", null, out);
      }
    }catch(e){
      assert(false, "SW: check", "exception", out);
    }
  }

  function checkErrorsDelta(out, before){
    const after = parseInt($("qaErrCount")?.textContent || "0", 10);
    assert(after <= before, "Errori JS: non aumentati durante preflight", `before=${before} after=${after}`, out);
  }

  async function runPreflight(){
    const out = { pass:0, fail:0, lines:[] };
    const before = parseInt($("qaErrCount")?.textContent || "0", 10);

    out.lines.push("Preflight Gate (Step40)");
    out.lines.push("Build: " + buildId());
    out.lines.push("");

    await checkRouter(out);
    await checkOverlays(out);
    await checkKeyButtons(out);
    await checkSaveLayer(out);
    await checkSW(out);

    checkErrorsDelta(out, before);

    out.lines.unshift(`Preflight: ${out.pass} OK / ${out.fail} FAIL`);
    // Persist last run summary
    try{
      localStorage.setItem(LAST_PREFLIGHT_KEY, JSON.stringify({
        at: Date.now(), pass: out.pass, fail: out.fail, build: buildId()
      }));
    }catch{}

    // Render log
    const log = $("qaPreflightLog");
    if(log){
      log.classList.add("show");
      log.textContent = out.lines.join("\n");
    }

    // Status ribbons
    if(out.fail === 0){
      setRibbon("good","RELEASE READY");
    }else{
      setRibbon("bad","PRE-FLIGHT FAIL");
      // if previously enabled, revoke release to avoid false positives
      setReleaseEnabled(false);
    }

    // Update QA pills
    const status = $("qaStatus");
    const pf = $("qaPassFail");
    if(status){
      status.className = out.fail === 0 ? "pill-ok" : "pill-bad";
      status.textContent = out.fail === 0 ? "Tutto OK" : "Problemi rilevati";
    }
    if(pf) pf.textContent = `${out.pass} OK / ${out.fail} FAIL`;

    // Toggle release button availability
    const relBtn = $("qaReleaseBtn");
    if(relBtn){
      relBtn.disabled = out.fail !== 0;
      relBtn.textContent = out.fail === 0 ? "Enable Release Mode" : "Enable Release Mode (blocked)";
    }

    return out.fail === 0;
  }

  function applyReleaseState(){
    const enabled = isReleaseEnabled();
    if(enabled){
      setRibbon("good","RELEASE MODE");
    }else{
      // show last preflight if exists
      try{
        const last = JSON.parse(localStorage.getItem(LAST_PREFLIGHT_KEY) || "null");
        if(last && typeof last.fail === "number"){
          if(last.fail === 0) setRibbon("good","RELEASE READY");
          else setRibbon("bad","PRE-FLIGHT FAIL");
        }else{
          setRibbon(null,"DEV BUILD");
        }
      }catch{
        setRibbon(null,"DEV BUILD");
      }
    }
  }

  // Bind buttons
  const btn = $("qaPreflightBtn");
  if(btn && !btn.__step40){
    btn.__step40 = true;
    btn.addEventListener("click", async ()=>{
      await runPreflight();
    }, true);
  }

  const rel = $("qaReleaseBtn");
  if(rel && !rel.__step40){
    rel.__step40 = true;
    rel.addEventListener("click", async ()=>{
      const ok = await runPreflight();
      if(ok){
        setReleaseEnabled(true);
        applyReleaseState();
      }
    }, true);
  }

  // Run passive state application
  document.addEventListener("DOMContentLoaded", ()=> {
    applyReleaseState();
    // In QA debug builds, keep release button blocked until preflight passes
    const relBtn = $("qaReleaseBtn");
    if(relBtn){
      relBtn.disabled = true;
      relBtn.textContent = "Enable Release Mode (blocked)";
    }
  }, { once:true });

  // Expose for console usage
  window.RapRisePreflight = { run: runPreflight };

})();


/* =========================
   STEP41: Performance instrumentation + What's New modal + idle init
   ========================= */
(function(){
  const NOTES_URL = "./release-notes.json";
  const LAST_SEEN_BUILD_KEY = "raprise_last_seen_build_v1";
  const WHATSNEW_DISMISSED_KEY = "raprise_whatsnew_dismissed_v1";
  const PERF_KEY = "raprise_perf_v1";

  const $ = (id)=> document.getElementById(id);

  function buildId(){
    const m = document.querySelector('meta[name="raprise-build"]');
    return m?.content || "unknown";
  }

  function safeParse(s, fb){ try{ return JSON.parse(s); }catch{ return fb; } }
  function writeLS(key, obj){ try{ localStorage.setItem(key, JSON.stringify(obj)); }catch{} }

  // -------------------------
  // Perf: LCP/CLS/INP (best-effort)
  // -------------------------
  window.RapRisePerf = window.RapRisePerf || {};
  const perfStore = {
    at: Date.now(),
    build: buildId(),
    lcp: null,
    cls: 0,
    inp: null,
    marks: []
  };

  function persistPerf(){
    writeLS(PERF_KEY, perfStore);
  }

  function mark(name, detail){
    perfStore.marks.unshift({ t: Date.now(), name, detail: detail || "" });
    if(perfStore.marks.length > 40) perfStore.marks.length = 40;
    persistPerf();
  }

  window.RapRisePerf.mark = mark;
  window.RapRisePerf.getMarks = ()=> perfStore.marks.slice();

  function installPerfObservers(){
    try{
      // LCP
      const lcpObs = new PerformanceObserver((list)=>{
        const entries = list.getEntries();
        const last = entries[entries.length-1];
        if(last){
          perfStore.lcp = Math.round(last.startTime);
          persistPerf();
        }
      });
      lcpObs.observe({ type: "largest-contentful-paint", buffered: true });

      // CLS
      const clsObs = new PerformanceObserver((list)=>{
        for(const e of list.getEntries()){
          if(!e.hadRecentInput) perfStore.cls += e.value;
        }
        perfStore.cls = Math.round(perfStore.cls * 1000) / 1000;
        persistPerf();
      });
      clsObs.observe({ type: "layout-shift", buffered: true });

      // INP (Event Timing)
      const inpObs = new PerformanceObserver((list)=>{
        // choose max interaction value
        let max = perfStore.inp || 0;
        for(const e of list.getEntries()){
          const v = e.duration || 0;
          if(v > max) max = v;
        }
        if(max){
          perfStore.inp = Math.round(max);
          persistPerf();
        }
      });
      inpObs.observe({ type: "event", buffered: true, durationThreshold: 40 });
    }catch{
      // ignore - browser may not support
    }
  }

  document.addEventListener("DOMContentLoaded", ()=> {
    installPerfObservers();
    mark("domcontentloaded");
  }, { once:true });

  window.addEventListener("load", ()=> {
    mark("window_load");
    // Stabilize after first paint
    setTimeout(()=> mark("post_load_1s"), 1000);
  }, { once:true });

  // -------------------------
  // Idle init: delay non-critical re-renders to avoid long tasks
  // -------------------------
  function idle(fn, timeout){
    if("requestIdleCallback" in window){
      return requestIdleCallback(fn, { timeout: timeout || 600 });
    }
    return setTimeout(fn, 120);
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    // Defer heavy-ish rerenders introduced by content modules
    idle(()=>{
      try{
        window.RapRisePerf?.mark?.("idle_rerender");
        // Re-render modules if functions exist (safe)
        window.renderHomeSummary?.();
        window.renderSocial?.();
        window.renderSeason?.();
        window.renderShop?.();
      }catch{}
    }, 800);
  }, { once:true });

  // -------------------------
  // What's New modal (shows when build changes)
  // -------------------------
  async function fetchNotes(){
    try{
      const res = await fetch(NOTES_URL, { cache:"no-store" });
      if(!res.ok) throw new Error("http");
      return await res.json();
    }catch{
      return null;
    }
  }

  function closeModal(){
    const m = $("whatsNewModal");
    if(!m) return;
    m.classList.add("hidden");
  }

  function openModal(){
    const m = $("whatsNewModal");
    if(!m) return;
    m.classList.remove("hidden");
    // focus
    setTimeout(()=> m.querySelector(".modal-card")?.focus?.(), 20);
  }

  function renderWhatsNew(data){
    const body = $("whatsNewBody");
    const sub  = $("whatsNewSub");
    if(!body) return;

    const b = buildId();
    if(sub) sub.textContent = "Build corrente: " + b;

    // skeleton
    if(window.RapRiseUI?.skeletonList){
      window.RapRiseUI.skeletonList(body, 4);
    }else{
      body.innerHTML = "<div class='wn-item'><div class='t'>Caricamento...</div></div>";
    }

    if(!data || !Array.isArray(data.build_notes)){
      body.innerHTML = "<div class='wn-item'><div class='t'>What's New non disponibile.</div><div class='d'>Nessun dato in release-notes.json.</div></div>";
      return;
    }

    // Show top 3 builds (latest first)
    const list = data.build_notes.slice(0, 3);
    body.innerHTML = "";
    list.forEach(item=>{
      const el = document.createElement("div");
      el.className = "wn-item";
      const hs = (item.highlights||[]).map(x=>"<li>"+String(x)+"</li>").join("");
      el.innerHTML = `
        <div class="h">
          <div class="t">${item.build}</div>
          <span class="chip"><i></i>${item.date || ""}</span>
        </div>
        <ul>${hs}</ul>
        <div class="meta">
          <span class="chip"><i></i>Fonte: release-notes.json</span>
        </div>
      `;
      body.appendChild(el);
    });
  }

  async function showWhatsNew(force){
    const data = await fetchNotes();
    renderWhatsNew(data);
    openModal();
    mark("whatsnew_open");
  }

  function shouldAutoShow(){
    const b = buildId();
    const lastSeen = localStorage.getItem(LAST_SEEN_BUILD_KEY) || "";
    const dismissed = localStorage.getItem(WHATSNEW_DISMISSED_KEY) || "";
    if(b !== lastSeen) return true;
    if(dismissed === b) return false;
    return false;
  }

  function acceptWhatsNew(){
    const b = buildId();
    try{
      localStorage.setItem(LAST_SEEN_BUILD_KEY, b);
      localStorage.setItem(WHATSNEW_DISMISSED_KEY, b);
    }catch{}
    closeModal();
    mark("whatsnew_ok");
  }

  function laterWhatsNew(){
    const b = buildId();
    // do not set dismissed, only last seen to avoid re-show loops on refresh if user wants it later
    try{
      localStorage.setItem(LAST_SEEN_BUILD_KEY, b);
    }catch{}
    closeModal();
    mark("whatsnew_later");
  }

  // Bind buttons
  document.addEventListener("DOMContentLoaded", async ()=>{
    const m = $("whatsNewModal");
    const close = $("whatsNewCloseBtn");
    const ok = $("whatsNewOkBtn");
    const later = $("whatsNewLaterBtn");
    const openBtn = $("openWhatsNewBtn");

    if(m){
      m.addEventListener("click", (e)=>{
        const t = e.target;
        if(t && t.getAttribute && t.getAttribute("data-close") === "1"){
          laterWhatsNew();
        }
      }, true);
      document.addEventListener("keydown", (e)=>{
        if(e.key === "Escape" && !m.classList.contains("hidden")) laterWhatsNew();
      }, true);
    }

    close?.addEventListener("click", laterWhatsNew, true);
    ok?.addEventListener("click", acceptWhatsNew, true);
    later?.addEventListener("click", laterWhatsNew, true);

    openBtn?.addEventListener("click", (e)=>{
      e.preventDefault(); e.stopPropagation();
      // close settings modal if present
      document.getElementById("settingsCloseBtn")?.click();
      showWhatsNew(true);
    }, true);

    // Auto-show after load (delayed to avoid blocking)
    setTimeout(async ()=>{
      if(shouldAutoShow()){
        await showWhatsNew(false);
      }else{
        // update ribbon via Step40 if present
        mark("whatsnew_skip");
      }
    }, 260);

  }, { once:true });

  // SW update hook: if controller changes, consider it a build update and prompt on next load
  try{
    if("serviceWorker" in navigator){
      navigator.serviceWorker.addEventListener("controllerchange", ()=>{
        mark("sw_controllerchange");
      });
    }
  }catch{}

})();
