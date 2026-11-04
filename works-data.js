/* ==========================================================
   作品資料：網站上所有作品都從這裡來。

   新增一件作品的步驟：
   1. 把圖片放進 images/ 資料夾
   2. 複製下面任一段 { ... }，改內容（id 不可重複，只用英文小寫）
   3. 存檔。列表、篩選、單件作品頁都會自動更新

   欄位說明：
   id       網址用的代號
   title    作品名稱
   type     分類，篩選按鈕會自動產生
   medium   媒材說明
   image    圖片路徑
   w, h     圖片原始寬高（避免載入時版面跳動）
   alt      圖片的文字描述
   text     作品說明，可用陣列分段
   note     一句碎念（可省略）
   featured 設為 true 會出現在首頁（可省略）
   link     設定後會連到別的頁面，不用單件作品頁（可省略）
   ========================================================== */

const WORKS = [
  {
    id: "blue-night",
    title: "《藍夜》",
    type: "動畫",
    medium: "定格動畫・紙",
    image: "images/still-folds.webp",
    w: 960,
    h: 540,
    alt: "《藍夜》畫面：藍色紙偶在白色摺紙線條之間",
    text: ["用紙搭出來的定格動畫。"],
    note: "好累喔 但很好玩",
    link: "blue-night.html",
  },
  {
    id: "clouds",
    title: "《藍夜》的雲",
    type: "紙",
    medium: "紙雕・光影",
    image: "images/clouds.webp",
    w: 1800,
    h: 1012,
    alt: "層層白紙剪成的雲，中間露出兩個黃頭藍身的小人",
    text: [
      "《藍夜》的場景。白紙剪成一層一層的雲，靠打光和影子把深度撐出來，小人就躲在雲的後面。",
    ],
  },
  {
    id: "arcade",
    title: "彩繪機台",
    type: "立體",
    medium: "立體物件・彩繪",
    image: "images/arcade.webp",
    w: 820,
    h: 1728,
    alt: "粉紅、綠、藍色彩繪的機台側板，上面有一張黃色圓臉",
    text: ["粉紅、綠、藍畫滿整個機台，黃色的圓臉從側板盯著你看。"],
    featured: true,
  },
  {
    id: "leaf",
    title: "落葉懸吊",
    type: "立體",
    medium: "裝置・落葉、線",
    image: "images/leaf.webp",
    w: 1000,
    h: 2028,
    alt: "用線縫合大量落葉而成的長條形物件，懸掛在樹上",
    text: ["把落葉一片一片縫起來，再掛回樹上。走近看可以看到每片葉子上的針腳。"],
    featured: true,
  },
  {
    id: "pipe",
    title: "接頭",
    type: "繪畫",
    medium: "炭筆・紙",
    image: "images/pipe.webp",
    w: 1000,
    h: 1778,
    alt: "炭筆大幅素描，畫面是巨大的金屬管接頭，右下角有一個小小的人",
    text: ["把一個小小的金屬接頭，用炭筆放大到一整張大紙。右下角站著一個很小的人。"],
    featured: true,
  },
  {
    id: "figure",
    title: "戴黃桶的人",
    type: "繪畫",
    medium: "紙上彩繪",
    image: "images/figure.webp",
    w: 1200,
    h: 1600,
    alt: "紙上彩繪的人物背影，頭上戴著黃色方桶，腰間圍著橘黃色的布",
    text: ["一個頭上戴著黃色方桶的人，轉身往旁邊走。"],
  },
];
