/**
 * Abjad "Explore the app" runtime config.
 *
 * Clips are hosted on Bunny (not in this repo). Set GATSBY_ABJAD_MEDIA_BASE_URL in .env to the
 * pull-zone folder that holds `<id>.webm` and `<id>.mp4`. The value below is a placeholder.
 * Images (posters, screenshots) live in the repo under static/abjad/.
 */
export const MEDIA_BASE_URL = (
  process.env.GATSBY_ABJAD_MEDIA_BASE_URL || "https://YOUR-PULL-ZONE.b-cdn.net/abjad/clips"
).replace(/\/$/, "");

export const MEDIA_BASE_IS_PLACEHOLDER = !process.env.GATSBY_ABJAD_MEDIA_BASE_URL;

// Fallbacks for the store buttons; the live values come from the Prismic "abjad" product.
export const STORE_FALLBACK = {
  appStore: "https://apps.apple.com/ug/app/abjad/id570214181",
  playStore: "https://play.google.com/store/apps/details?id=info.obada.abjad",
};

export const clipUrl = (id, ext) => `${MEDIA_BASE_URL}/${id}.${ext}`;
