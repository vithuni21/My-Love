(() => {
  const NAV_FADE_MS = 520;
  const STORAGE = {
    MUSIC_ON: "birthday_music_on",
    MUSIC_TIME: "birthday_music_time",
    MUSIC_VOL: "birthday_music_vol"
  };

  const $ = (sel) => document.querySelector(sel);

  function markReady() {
    requestAnimationFrame(() => {
      document.body.classList.add("page-ready");
    });
  }

  function go(url) {
    document.body.classList.add("page-fadeout");
    window.setTimeout(() => {
      window.location.href = url;
    }, NAV_FADE_MS);
  }

  function wireNavigation() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-go]");
      if (!btn) return;
      e.preventDefault();
      const url = btn.getAttribute("data-go");
      if (!url) return;
      go(url);
    });
  }

  function setMusicButtonState(on) {
    const btn = $("#music-btn");
    if (!btn) return;
    const icon = btn.querySelector("[data-icon]");
    const label = btn.querySelector("[data-label]");

    btn.classList.toggle("on", on);
    if (icon) icon.textContent = on ? "♪" : "♡";
    if (label) label.textContent = on ? "Music: On" : "Music: Off";
  }

  async function tryPlay(audio) {
    try {
      await audio.play();
      return true;
    } catch {
      return false;
    }
  }

  function wireMusic() {
    const audio = $("#bg-music");
    const btn = $("#music-btn");
    if (!audio || !btn) return;

    const persistedOn = localStorage.getItem(STORAGE.MUSIC_ON) === "1";
    const persistedTime = Number(localStorage.getItem(STORAGE.MUSIC_TIME) || "0");
    const persistedVol = Number(localStorage.getItem(STORAGE.MUSIC_VOL) || "0.85");

    audio.volume = Number.isFinite(persistedVol) ? Math.min(1, Math.max(0, persistedVol)) : 0.85;
    if (Number.isFinite(persistedTime) && persistedTime > 0) {
      audio.currentTime = persistedTime;
    }

    setMusicButtonState(persistedOn);

    if (persistedOn) {
      // Autoplay may still be blocked; if so, the UI stays On and will begin on the next user gesture.
      tryPlay(audio).then((ok) => {
        if (!ok) {
          const resumeOnce = async () => {
            document.removeEventListener("pointerdown", resumeOnce);
            await tryPlay(audio);
          };
          document.addEventListener("pointerdown", resumeOnce, { once: true });
        }
      });
    }

    btn.addEventListener("click", async () => {
      const isOn = localStorage.getItem(STORAGE.MUSIC_ON) === "1";
      if (!isOn) {
        const ok = await tryPlay(audio);
        if (ok) {
          localStorage.setItem(STORAGE.MUSIC_ON, "1");
          setMusicButtonState(true);
        } else {
          // If blocked, user can click again; keep it Off until it actually plays.
          localStorage.setItem(STORAGE.MUSIC_ON, "0");
          setMusicButtonState(false);
        }
      } else {
        audio.pause();
        localStorage.setItem(STORAGE.MUSIC_ON, "0");
        setMusicButtonState(false);
      }
    });

    const saveTime = () => {
      if (!Number.isFinite(audio.currentTime)) return;
      localStorage.setItem(STORAGE.MUSIC_TIME, String(audio.currentTime));
      localStorage.setItem(STORAGE.MUSIC_VOL, String(audio.volume));
    };

    window.addEventListener("beforeunload", saveTime);
    window.setInterval(saveTime, 2000);
  }

  function spawnFloatingHearts() {
    const layer = $("#float-layer");
    if (!layer) return;

    const colors = [
      "rgba(255,182,193,.95)",
      "rgba(221,160,221,.95)",
      "rgba(255,228,196,.95)",
      "rgba(176,224,230,.95)",
      "rgba(255,192,203,.95)",
      "rgba(216,191,216,.95)",
      "rgba(255,218,185,.95)"
    ];

    const count = 8;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "heart";
      el.style.left = `${Math.floor(Math.random() * 96) + 2}%`;
      el.style.setProperty("--dur", `${14 + Math.floor(Math.random() * 10)}s`);
      el.style.animationDelay = `${-Math.floor(Math.random() * 14)}s`;
      el.style.background = colors[i % colors.length];
      layer.appendChild(el);
    }
  }

  function spawnMemoryFloaties() {
    if (!document.body.classList.contains("bg-memory")) return;
    const layer = $("#float-layer");
    if (!layer) return;

    // Balloons
    const balloonColors = [
      ["rgba(255,255,255,.95)", "rgba(255,182,193,.92)"],
      ["rgba(255,255,255,.95)", "rgba(168,228,255,.92)"],
      ["rgba(255,255,255,.95)", "rgba(255,223,186,.92)"],
      ["rgba(255,255,255,.95)", "rgba(198,164,255,.92)"]
    ];

    const balloonCount = 7;
    for (let i = 0; i < balloonCount; i++) {
      const el = document.createElement("span");
      el.className = "balloon-float";
      el.style.left = `${Math.floor(Math.random() * 96) + 2}%`;
      el.style.setProperty("--dur", `${18 + Math.floor(Math.random() * 16)}s`);
      el.style.animationDelay = `${-Math.floor(Math.random() * 18)}s`;
      el.style.setProperty("--drift", `${Math.floor(Math.random() * 90) - 45}px`);

      const [c1, c2] = balloonColors[i % balloonColors.length];
      el.style.background = `radial-gradient(circle at 30% 22%, ${c1}, ${c2})`;
      const scale = 0.72 + Math.random() * 0.65;
      el.style.setProperty("--scale", String(scale));
      layer.appendChild(el);
    }

    // Sparkles
    const sparkleCount = 18;
    for (let i = 0; i < sparkleCount; i++) {
      const el = document.createElement("span");
      el.className = "sparkle";
      el.style.left = `${Math.floor(Math.random() * 98) + 1}%`;
      el.style.setProperty("--dur", `${14 + Math.floor(Math.random() * 14)}s`);
      el.style.animationDelay = `${-Math.floor(Math.random() * 14)}s`;
      el.style.setProperty("--drift", `${Math.floor(Math.random() * 140) - 70}px`);
      el.style.setProperty("--size", `${6 + Math.floor(Math.random() * 10)}px`);
      layer.appendChild(el);
    }
  }

  // Boot
  spawnFloatingHearts();
  spawnMemoryFloaties();
  wireNavigation();
  wireMusic();
  markReady();
})();

