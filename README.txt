SAIGON NEEDLE V6 — BILINGUAL EN / VI

IMPLEMENTED
- English website at /en/
- Vietnamese website at /vi/
- EN / VI language switch in the header on every existing page
- Browser-language detection on the root domain
- Language preference saved in localStorage
- Canonical and hreflang SEO tags for English and Vietnamese
- Bilingual homepage, Guest Artists pages, HORITUAN profile and Dragon Koi project
- Existing images, branding, favicon, mobile styles and animations preserved

LIVE PATHS
- /en/
- /vi/
- /en/guest-artists/
- /vi/guest-artists/
- /en/guest-artists/horituan.html
- /vi/guest-artists/horituan.html
- /en/projects/dragon-koi-sleeve.html
- /vi/projects/dragon-koi-sleeve.html

DEPLOY
1. Extract SAIGON-NEEDLE-V6.zip.
2. Copy everything inside the SAIGON-NEEDLE-V6 folder.
3. Paste into your Git-connected website folder and choose Replace.
4. In VS Code Terminal run:

   git status
   git add .
   git commit -m "Update SAIGON NEEDLE V6 bilingual"
   git push

5. Wait for Vercel deployment, then hard-refresh saigonneedle.com.

IMPORTANT
Keep the /en and /vi folders together with the root index.html. Do not upload only one folder.
