/* 所有頁面共用的互動。每段都先確認該頁有對應元素才執行。 */

(function () {
  "use strict";

  /* ---------- 藍夜模式 ---------- */
  var root = document.documentElement;
  var themeToggle = document.querySelector("[data-theme-toggle]");

  function syncThemeButton() {
    if (!themeToggle) return;
    var night = root.dataset.theme === "night";
    themeToggle.textContent = night ? "開燈" : "關燈";
    themeToggle.setAttribute("aria-pressed", String(night));
  }

  if (themeToggle) {
    syncThemeButton();
    themeToggle.addEventListener("click", function () {
      var night = root.dataset.theme === "night";
      if (night) {
        delete root.dataset.theme;
      } else {
        root.dataset.theme = "night";
      }
      try {
        localStorage.setItem("theme", night ? "day" : "night");
      } catch (e) {
        /* 無痕模式存不了也沒關係 */
      }
      syncThemeButton();
    });
  }

  /* ---------- 回到頂部 ---------- */
  var toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0 });
    });
  }

  /* ---------- 首頁紙雕：滑鼠移動時，每層紙錯開 ---------- */
  var stage = document.querySelector(".stage");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (stage && !calm) {
    var layers = stage.querySelectorAll(".layer");
    stage.addEventListener("pointermove", function (event) {
      var box = stage.getBoundingClientRect();
      var x = (event.clientX - box.left) / box.width - 0.5;
      var y = (event.clientY - box.top) / box.height - 0.5;
      layers.forEach(function (layer) {
        var depth = Number(layer.dataset.depth);
        layer.style.transform = "translate(" + x * depth + "px," + y * depth + "px)";
      });
    });
    stage.addEventListener("pointerleave", function () {
      layers.forEach(function (layer) {
        layer.style.transform = "";
      });
    });
  }

  /* ---------- 作品卡片 ---------- */
  function workHref(work) {
    return work.link || "work.html?id=" + work.id;
  }

  function workCard(work) {
    var card = document.createElement("a");
    card.className = "work-card";
    card.href = workHref(work);

    var img = document.createElement("img");
    img.src = work.image;
    img.alt = work.alt;
    img.width = work.w;
    img.height = work.h;

    var body = document.createElement("div");
    body.className = "work-card-body";
    var title = document.createElement("h3");
    title.textContent = work.title;
    var medium = document.createElement("p");
    medium.textContent = work.medium;

    body.append(title, medium);
    card.append(img, body);
    return card;
  }

  function renderCards(target, list) {
    target.replaceChildren.apply(target, list.map(workCard));
  }

  if (typeof WORKS !== "undefined") {
    /* 首頁精選 */
    var featured = document.getElementById("featured-grid");
    if (featured) {
      renderCards(featured, WORKS.filter(function (work) {
        return work.featured;
      }));
    }

    /* 作品列表與分類篩選 */
    var grid = document.getElementById("work-grid");
    var filters = document.getElementById("work-filters");
    if (grid && filters) {
      var types = ["全部"];
      WORKS.forEach(function (work) {
        if (types.indexOf(work.type) === -1) types.push(work.type);
      });

      types.forEach(function (type, index) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "filter";
        button.textContent = type;
        button.setAttribute("aria-pressed", String(index === 0));
        button.addEventListener("click", function () {
          filters.querySelectorAll(".filter").forEach(function (other) {
            other.setAttribute("aria-pressed", String(other === button));
          });
          renderCards(grid, WORKS.filter(function (work) {
            return type === "全部" || work.type === type;
          }));
        });
        filters.append(button);
      });

      renderCards(grid, WORKS);
    }

    /* 單件作品頁 */
    var detail = document.getElementById("work-detail");
    if (detail) {
      renderWork(detail);
    }
  }

  function renderWork(target) {
    var id = new URLSearchParams(location.search).get("id");
    var index = WORKS.findIndex(function (work) {
      return work.id === id;
    });

    if (index === -1) {
      var missing = document.createElement("p");
      missing.textContent = "找不到這件作品。";
      target.classList.remove("work-detail");
      target.append(missing);
      return;
    }

    var work = WORKS[index];
    document.title = work.title + "｜香香軟軟屍體";

    var img = document.createElement("img");
    img.src = work.image;
    img.alt = work.alt;
    img.width = work.w;
    img.height = work.h;

    var info = document.createElement("div");
    info.className = "work-info";

    var label = document.createElement("span");
    label.className = "en-sub";
    label.textContent = "WORKS";

    var title = document.createElement("h1");
    title.textContent = work.title;

    var meta = document.createElement("div");
    meta.className = "work-meta";
    meta.textContent = work.type + "｜" + work.medium;

    info.append(label, title, meta);

    [].concat(work.text).forEach(function (paragraph) {
      var p = document.createElement("p");
      p.textContent = paragraph;
      info.append(p);
    });

    if (work.note) {
      var note = document.createElement("p");
      note.className = "muted";
      note.textContent = work.note;
      info.append(note);
    }

    if (work.id === "clouds") {
      var filmLink = document.createElement("a");
      filmLink.className = "button quiet";
      filmLink.href = "blue-night.html";
      filmLink.textContent = "看《藍夜》 ➔";
      info.append(filmLink);
    }

    target.append(img, info);

    /* 上一件／下一件，頭尾相接 */
    var pager = document.getElementById("work-pager");
    if (pager) {
      var prev = WORKS[(index - 1 + WORKS.length) % WORKS.length];
      var next = WORKS[(index + 1) % WORKS.length];
      pager.append(pagerLink("← " + prev.title, prev), pagerLink(next.title + " →", next));
    }
  }

  function pagerLink(text, work) {
    var link = document.createElement("a");
    link.className = "button quiet";
    link.href = workHref(work);
    link.textContent = text;
    return link;
  }

  /* ---------- 《藍夜》：章節跳轉 ---------- */
  var film = document.getElementById("film");
  if (film) {
    var chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));

    chapters.forEach(function (chapter) {
      chapter.addEventListener("click", function () {
        film.currentTime = Number(chapter.dataset.time);
        film.play();
      });
    });

    film.addEventListener("timeupdate", function () {
      var current = null;
      chapters.forEach(function (chapter) {
        if (film.currentTime >= Number(chapter.dataset.time)) current = chapter;
      });
      chapters.forEach(function (chapter) {
        chapter.classList.toggle("is-current", chapter === current);
      });
    });
  }

  /* ---------- 《藍夜》：一格一格看 ---------- */
  var frameImage = document.getElementById("frame-image");
  if (frameImage) {
    var TOTAL = 72;
    var FRAME_MS = 125; /* 每秒 8 格 */
    var slider = document.getElementById("frame-slider");
    var counter = document.getElementById("frame-count");
    var playButton = document.getElementById("frame-play");
    var prevButton = document.getElementById("frame-prev");
    var nextButton = document.getElementById("frame-next");
    var currentFrame = 1;
    var timer = null;

    function pad(number) {
      return String(number).padStart(3, "0");
    }

    function frameSrc(number) {
      return "images/frames/" + pad(number) + ".webp";
    }

    function showFrame(number) {
      currentFrame = ((number - 1 + TOTAL) % TOTAL) + 1;
      frameImage.src = frameSrc(currentFrame);
      frameImage.alt = "《藍夜》第 " + currentFrame + " 格";
      slider.value = currentFrame;
      counter.textContent = pad(currentFrame) + " / " + pad(TOTAL);
    }

    function stopFrames() {
      clearInterval(timer);
      timer = null;
      playButton.textContent = "播放";
    }

    function startFrames() {
      playButton.textContent = "暫停";
      timer = setInterval(function () {
        showFrame(currentFrame + 1);
      }, FRAME_MS);
    }

    playButton.addEventListener("click", function () {
      if (timer) {
        stopFrames();
      } else {
        startFrames();
      }
    });

    slider.addEventListener("input", function () {
      stopFrames();
      showFrame(Number(slider.value));
    });

    prevButton.addEventListener("click", function () {
      stopFrames();
      showFrame(currentFrame - 1);
    });

    nextButton.addEventListener("click", function () {
      stopFrames();
      showFrame(currentFrame + 1);
    });

    /* 捲到這一區才開始載入，離開就暫停 */
    var preloaded = false;
    var watcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !preloaded) {
          preloaded = true;
          for (var i = 1; i <= TOTAL; i += 1) {
            new Image().src = frameSrc(i);
          }
        }
        if (!entry.isIntersecting && timer) stopFrames();
      });
    });
    watcher.observe(frameImage);

    showFrame(1);
  }
})();
