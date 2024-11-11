/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

export default {
  // media:跟隨系統 (win10在 系統 > 個人化 > 色彩 > 選擇顏色) ； class:手動通過事件修改
  darkMode: "class", // media class
  // Just-in-Time Mode 即時模式 (不用就註解掉)
  mode: "jit",
  // 配置
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // 停用啟用
  // corePlugins: [], // 全部停用 (不能用class)
  // corePlugins: ['margin', 'padding'], // 只有margin padding可以用
  // corePlugins: {objectFit: false,}, // 停用objectFit
  // -----------------------------------------------------------------------------------
  // 前綴 (為每個class添加前綴 可以預防class命名衝突) ex. bg-blue-300 => tw-bg-blue-300
  // 不包含自己創建的@variants 自己的要自己把前綴加上去
  // prefix: 'tw-',
  // -----------------------------------------------------------------------------------
  // 是否要讓每個class變成!important
  // important: true,
  // -----------------------------------------------------------------------------------
  // 直接用important true可能會導致某些第三方套件的inlineStyle被影響 使用下面的#app 並在最外層根元素添加id="app"
  // 注意: 根元素的檔案一定要包含在purge 否則在建置生產時所有 CSS 都會被刪除
  // important: '#app',
  // -----------------------------------------------------------------------------------
  // 將分隔的冒號替換 ex. hover:bg-sky-300 => hover_bg-sky-300
  // separator: '_',

  // theme裡面的屬性 如果沒有要用就不要寫 要寫就要全部寫完整
  // 如果放一個空object也會被套用
  theme: {
    // 如果要用screens 就必須把所有斷點都寫出來
    // screen預設都是min 如果要用max可以額外設定
    // screens: {
    // sm: '640px', // 自訂 'sm' 斷點
    // md: '768px', // 自訂 'md' 斷點
    // lg: '1024px', // 自訂 'lg' 斷點
    // xl: '1280px', // 自訂 'xl' 斷點
    // xl: {'max': '1279px'}, // max
    // xl: {'min': '1280px', 'max': '1535px'}, // min + max
    // xl: [{ min: '1280px', max: '1350px' }, { min: '1450px' }], // 兩個斷點
    // },
    colors: {
      ...colors,
      surface: "#111b27",
      primary: "#c09079",
      secondary: "#829099",
      accent: "#82B1FF",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107",
      background: "#05090c",
      tahiti: {
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
      tahiti2: {
        light: "#67e8f9",
        DEFAULT: "#06b6d4",
        dark: "#0e7490",
      },
    },
    // spacing: {},
    fontFamily: {
      sans: ["Noto Sans TC", "sans-serif"],
    },
    // container設定
    container: {
      center: true,
      padding: "15px",
      // padding: {
      //     DEFAULT: '1rem',
      //     sm: '2rem',
      //     lg: '4rem',
      //     xl: '5rem',
      //     '2xl': '6rem'
      // }
    },
    // 新增或覆蓋
    extend: {
      padding: {
        200: "200px",
      },
      opacity: {
        0: "0",
        20: "0.2",
        40: "0.4",
        60: "0.6",
        80: "0.8",
        100: "1",
      },
      screens: {
        xl: "1280px",
        "2xl": "1450px",
        "3xl": "1700px",
      },
    },
  },
  // 變數
  // variants: {
  //     extend: {
  //         backgroundColor: ['active'],
  //         // ...
  //         borderColor: ['focus-visible', 'first'],
  //         // ...
  //         textColor: ['visited']
  //     }
  // },
  // 變數的順序
  // variantOrder: [
  //     'first',
  //     'last',
  //     'odd',
  //     'even',
  //     'visited',
  //     'checked',
  //     'group-hover',
  //     'group-focus',
  //     'focus-within',
  //     'hover',
  //     'focus',
  //     'focus-visible',
  //     'active',
  //     'disabled'
  // ],
  plugins: [],
};
