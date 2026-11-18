# Minecraft Material Close Button

A DeepSeek Harness UI plugin that adds a Minecraft-style pixel material close
button in the top-right corner. The default is a grass block; the settings let
you switch between grass, redstone, lapis lazuli, diamond, netherite, iron, gold
and emerald. Each material changes the button/effect sprite, the theme colour
and the signature sound. A single click launches a full-screen
Totem-of-Undying-inspired burst with original Minecraft audio, then requests the
normal Harness window close once the 4.5-second sequence finishes.

## Install

This is a DeepSeek Harness desktop bundle. In Harness, open **Plugins → Add
plugin** and choose this folder (or unzip the release and choose the extracted
folder). The bundle is enabled immediately; no restart is normally required.
It uses Harness's `shortcuts.closeWindow()` bridge, so it targets the desktop
app rather than a browser-hosted Harness.

## What happens on click

1. The selected pixel material button in the top-right corner pulses and plays
   its Minecraft signature sound.
2. The screen flashes, lightning branches out from the button, rune circles and
   a ray fan rotate into place, and a large pixel material core rises at the
   centre while shockwave rings and pixel chips burst outward.
3. Roughly 1,000 embers, sparks, dust motes and shards fly outward, with a
   screen-shake accent, repeated material-coloured flashes, and a final shrinking
   iris.
4. The soundtrack blends the selected material signature with original Minecraft
   TNT, dispenser and piston samples across the 4.5 s sequence.
5. At ~4.5 s the plugin asks Harness's own `shortcuts.closeWindow()` service
   to close the focused window, matching the native close-to-tray behaviour.
   The page is reset afterwards so reopening from the tray shows a clean UI
   again.

## Performance

- The particle field is a single full-screen canvas with one animation frame
  loop and no per-frame object allocation.
- Device pixel ratio is capped, and the canvas is limited to roughly 3.2 million
  device pixels, so large/high-DPI screens do not pay for needless fill rate.
- Glow, ember, ring, rune, ray and pixel-material sprites are pre-rendered
  offscreen once and then blitted; radial gradients are cached per resize.
- `prefers-reduced-motion` halves particle counts and disables screen shake.
- All timers, audio players, animation frames and the injected style element are
  released when the overlay unmounts.

## Safety / fallback

`shortcuts.closeWindow()` uses Harness's supported window-close path and hides
the window to the tray. If the window is still visible about 850 ms after the
close request (for example because focus moved to another app), the effect
resets and a toast suggests closing the window manually instead. No native
helper, external process or network port is used.

## Settings

Open **Settings → Material Close** (or the plugin's page in Plugins → Installed)
and use the "Material Close settings" section:

- **Material** — choose grass, redstone, lapis lazuli, diamond, netherite,
  iron, gold or emerald; changes the icon, theme colour and signature sound.
- **Sound** — toggle the original Minecraft material/TNT/dispenser/piston mix.
- **Effect intensity** — Full or Light; Light scales the particle field down.
- **Close window when done** — turn off for a preview-only run that leaves the
  Harness window open.

Settings are stored locally on this device and take effect on the next click.

## Files

- `client.js` — UI, canvas renderer, sample audio, close request.
- `index.js` — intentionally empty Host half.
- `cordis.patch.yml` — bundle insertion row.
- `sounds/*.ogg` — original Minecraft 1.20.1 material, click, piston and
  explosion samples used by the effect.
- `locale/en.json`, `locale/zh.json` — plugin inventory title/description.
- `icon.png` — 36×36 pixel grass-block icon.
- `assets/grass_block.png` — high-resolution grass source used by the in-app
  sprite and icon generator.

## License

The code is MIT-licensed. Minecraft textures and sounds remain the property of
Mojang Studios / Microsoft and are not covered by MIT; see `NOTICE.md` before
redistributing a fork or a commercial build.

## Uninstall

Remove the `@local/dsh-redstone-close` bundle with DSH's plugin manager. The
plugin writes nothing outside its own package and the profile's normal bundle
records.
