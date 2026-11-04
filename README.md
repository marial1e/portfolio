# 香香軟軟屍體

曾怡柔的作品集網站。純 HTML、CSS、JavaScript，不需要安裝或編譯，直接用瀏覽器開 `index.html` 就能看。

## 檔案

| 檔案 | 內容 |
| --- | --- |
| `index.html` | 首頁，紙雕主視覺 |
| `works.html` | 作品列表，可依分類篩選 |
| `work.html` | 單件作品頁，內容依網址的 `?id=` 帶入 |
| `blue-night.html` | 定格動畫《藍夜》：影片、段落跳轉、一格一格看 |
| `about.html` | 關於我 |
| `404.html` | 找不到頁面 |
| `works-data.js` | 所有作品的資料 |
| `style.css` | 共用樣式，配色都在最上面的變數 |
| `script.js` | 共用互動 |
| `images/`、`video/` | 網頁用的圖片與影片 |

## 新增作品

1. 把圖片放進 `images/`。
2. 打開 `works-data.js`，複製一段 `{ ... }` 改內容。
3. 存檔。列表、篩選和單件作品頁都會自動更新。

## 檔案大小

GitHub 單檔上限是 100 MB，影片要先壓縮：

```bash
ffmpeg -i 原始影片.mp4 -vf "scale=1920:-2,fps=30" -c:v libx264 -preset slow -crf 26 -maxrate 2800k -bufsize 5600k -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart video/新影片.mp4
```

© 2026 曾怡柔
