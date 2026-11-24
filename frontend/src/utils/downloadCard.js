import { toPng } from "html-to-image";

// Same URL loaded in index.html — used to fetch the actual @font-face CSS
// so we can hand it to html-to-image directly.
const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=Pinyon+Script&family=Space+Mono:wght@400;700&display=swap";

let cachedFontCss = null;

// html-to-image normally auto-detects @font-face rules by reading
// document.styleSheets, but the Google Fonts <link> is cross-origin without
// a `crossorigin` attribute, so reading its cssRules throws a CORS error —
// html-to-image silently swallows that and skips the font, which is why the
// exported PNG fell back to a system font instead of Space Mono / Pinyon
// Script / etc. Fetching the CSS ourselves and passing it as `fontEmbedCSS`
// sidesteps that entirely: html-to-image just downloads the font files
// listed in the CSS text and inlines them as base64.
async function getFontEmbedCss() {
  if (cachedFontCss !== null) return cachedFontCss;
  try {
    const res = await fetch(GOOGLE_FONTS_URL);
    cachedFontCss = await res.text();
  } catch (e) {
    cachedFontCss = "";
  }
  return cachedFontCss;
}

// Downloads just the ID card element as a PNG.
export async function downloadCardAsImage(node, filename = "my-id-card.png") {
  if (!node) return;

  // Make sure the fonts are actually loaded in this document before we
  // rasterize, otherwise even a correct embed can race the font swap.
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const fontEmbedCSS = await getFontEmbedCss();

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: null,
    fontEmbedCSS,
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
