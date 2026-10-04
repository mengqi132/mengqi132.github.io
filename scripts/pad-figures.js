/* Pad paper figures to a 4:3 canvas (white) and shrink to 1200x900 max,
   so they fill the site's figure slot without cropping content. */
const sharp = require('sharp');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'figures');
const files = ['ariadne.png', 'dypsi.png', 'geo-expert.png'];
const MAX_W = 1200;
const MAX_H = 900;

(async () => {
  for (const f of files) {
    const p = path.join(dir, f);
    const meta = await sharp(p).metadata();
    const w = meta.width;
    const h = meta.height;
    // smallest 4:3 canvas that contains the image
    let tw = Math.max(w, Math.ceil((h * 4) / 3));
    let th = Math.round((tw * 3) / 4);
    if (th < h) {
      th = h;
      tw = Math.ceil((h * 4) / 3);
    }
    const buf = await sharp(p)
      .resize(tw, th, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png({ compressionLevel: 9, palette: false })
      .toBuffer();
    const out = await sharp(buf)
      .resize(MAX_W, MAX_H, { fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toBuffer();
    require('fs').writeFileSync(p, out);
    const m2 = await sharp(p).metadata();
    console.log(f, `${w}x${h}`, '->', `${m2.width}x${m2.height}`, Math.round(out.length / 1024) + 'KB');
  }
})();
