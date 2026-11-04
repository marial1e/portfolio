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
    medium: "定格動畫・紙雕・光影",
    image: "images/still-folds.webp",
    w: 960,
    h: 540,
    alt: "《藍夜》畫面：藍色紙偶在白色摺紙線條之間",
    text: ["用紙搭出來的定格動畫。"],
    note: "好累喔 但很好玩",
    link: "blue-night.html",
  },
  {
    id: "arcade",
    title: "《蛋寶大冒險》",
    type: "立體",
    medium: "立體物件、遊戲",
    image: "images/arcade.webp",
    w: 820,
    h: 1728,
    alt: "粉紅、綠、藍色彩繪的機台側板，上面有一張黃色圓臉",
    text: ["使用RPG maker製作，並使用木板及顏料架設出一個遊戲機台。"],
    featured: true,
  },
  {
    id: "leaf",
    title: "《避債蛾》",
    type: "立體",
    medium: "裝置・落葉、鐵網、針線",
    image: "images/leaf.webp",
    w: 1000,
    h: 2028,
    alt: "用線縫合大量落葉而成的長條形物件，懸掛在樹上",
    text: ["把落葉一針一線縫起來，期望自己也能保持著不畏困難的精神。"],
    featured: true,
  },
  {
    id: "pipe",
    title: "小物件放大",
    type: "繪畫",
    medium: "炭筆・紙",
    image: "images/pipe.webp",
    w: 1000,
    h: 1778,
    alt: "炭筆大幅素描，畫面是巨大的金屬管接頭，右下角有一個小小的人",
    text: ["把一個小小的金屬接頭仔細觀察後放大到一整張紙。"],
    featured: true,
  },
  {
    id: "figure",
    title: "設計繪畫",
    type: "繪畫",
    medium: "複合媒材",
    image: "images/figure.webp",
    w: 1200,
    h: 1600,
    alt: "紙上彩繪的人物背影，頭上戴著黃色方桶，腰間圍著橘黃色的布",
    text: ["一個頭上戴著黃色方桶的人。"],
  },
];
