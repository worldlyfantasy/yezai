import { promises as fs } from "node:fs";
import path from "node:path";

const OUTPUT_DIR = path.join(process.cwd(), "public", "generated");
const LOGO_FILE = path.join(process.cwd(), "public", "yezai.png");

const avatarPalettes = [
  { base: "#EEE4D6", accent: "#BC8B6C", depth: "#6E4B3C" },
  { base: "#E7DCCA", accent: "#B17855", depth: "#724D41" },
  { base: "#F1E6DC", accent: "#C79778", depth: "#684739" },
  { base: "#E6D7C6", accent: "#A37254", depth: "#5A3C33" }
];

const skinTones = ["#E5C3AA", "#D7B198", "#C99D82", "#B9826D"];
const hairTones = ["#4A352B", "#3A2A22", "#6B4C3F", "#2F2420", "#5B3E33"];
const garmentTones = ["#7F8B83", "#8E6F5D", "#B48C74", "#6C7B72", "#937B6A", "#55635D"];

const landscapePalettes = [
  { sky: "#F2E6D8", horizon: "#D9C3AE", ridge: "#B08B73", slope: "#87624B", sand: "#6D4B3B" },
  { sky: "#F5E9DD", horizon: "#DBC5B0", ridge: "#A87D63", slope: "#7C5A47", sand: "#574034" },
  { sky: "#EDE1D2", horizon: "#D3BEA9", ridge: "#B2886B", slope: "#8A614B", sand: "#624437" }
];

const ideaPalettes = [
  { paper: "#F4EBDD", ink: "#6B5141", accent: "#C69673", tape: "#D8C6A9" },
  { paper: "#F0E4D4", ink: "#5F4537", accent: "#B27A5A", tape: "#CCBA9E" },
  { paper: "#EFE2CF", ink: "#604739", accent: "#C08F71", tape: "#D6C5AC" }
];

const avatarCount = 8;
const destinationCount = 12;
const ideaCount = 10;

type GradientStop = {
  offset: string;
  color: string;
  opacity?: number;
};

const clamp = (value: number, min = 0, max = 255) => Math.min(Math.max(value, min), max);

const hexToRgb = (hex: string) => {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
};

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((v) => clamp(Math.round(v)).toString(16).padStart(2, "0"))
    .join("")}`;

const mixColor = (color: string, target: string, ratio: number) => {
  const c = hexToRgb(color);
  const t = hexToRgb(target);
  return rgbToHex(c.r + (t.r - c.r) * ratio, c.g + (t.g - c.g) * ratio, c.b + (t.b - c.b) * ratio);
};

const lighten = (color: string, ratio: number) => mixColor(color, "#ffffff", ratio);
const darken = (color: string, ratio: number) => mixColor(color, "#000000", ratio);

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const ensureDir = async (dir: string) => {
  await fs.mkdir(dir, { recursive: true });
};

const createNoise = (id: string, seed: number, opacity = 0.2) => `
  <filter id="${id}" x="0" y="0" width="1" height="1">
    <feTurbulence type="fractalNoise" baseFrequency="${0.6 + seededRandom(seed) * 0.2}" numOctaves="3" seed="${Math.floor(
      seed * 997
    )}" />
    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${opacity} 0" />
  </filter>
`;

const createGradient = (id: string, stops: GradientStop[], angle = 90) => `
  <linearGradient id="${id}" gradientTransform="rotate(${angle})">
    ${stops
      .map(
        (stop) =>
          `<stop offset="${stop.offset}" stop-color="${stop.color}"${
            stop.opacity !== undefined ? ` stop-opacity="${stop.opacity}"` : ""
          } />`
      )
      .join("\n")}
  </linearGradient>
`;

const createLogoMark = (logoHref: string | null, clipId: string, width: number, height: number) => {
  const size = 58;
  const padding = 24;
  const x = width - size - padding;
  const y = height - size - padding;

  if (logoHref) {
    return `
      <clipPath id="${clipId}">
        <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="10" ry="10" />
      </clipPath>
      <rect x="${x - 6}" y="${y - 6}" width="${size + 12}" height="${size + 12}" fill="rgba(60,40,30,0.12)" rx="16" />
      <image href="${logoHref}" x="${x}" y="${y}" width="${size}" height="${size}" clip-path="url(#${clipId})" preserveAspectRatio="xMidYMid slice" opacity="0.9" />
    `;
  }

  return `
    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="12" ry="12" fill="rgba(80,60,45,0.3)" />
    <text x="${x + size / 2}" y="${y + size / 2 + 8}" text-anchor="middle" font-size="20" fill="#F6EFE7" font-family="serif">野哉</text>
  `;
};

const createLayerPath = (seed: number, width: number, height: number, base: number, amplitude: number) => {
  const segments = 8;
  const startY = height * base;
  let path = `M 0 ${height} L 0 ${startY}`;

  for (let i = 0; i <= segments; i++) {
    const x = (width / segments) * i;
    const wave =
      Math.sin((i + seed) * 0.8) * amplitude * height * 0.7 + seededRandom(seed + i) * amplitude * height;
    const y = startY - wave;
    const cpX = x - width / segments / 2;
    const cpY = y - 18 * seededRandom(seed + i + 1);
    path += ` Q ${cpX} ${cpY} ${x} ${y}`;
  }

  path += ` L ${width} ${height} Z`;
  return path;
};

const createAvatarSvg = (index: number, logoHref: string | null) => {
  const width = 380;
  const height = 380;
  const palette = avatarPalettes[index % avatarPalettes.length];
  const skin = skinTones[index % skinTones.length];
  const hair = hairTones[index % hairTones.length];
  const garment = garmentTones[index % garmentTones.length];
  const accent = palette.accent;
  const bgGradientId = `avatarBg${index}`;
  const garmentGradientId = `avatarGarment${index}`;
  const noiseId = `avatarNoise${index}`;
  const logoClip = `avatarLogo${index}`;

  const cheekColor = lighten(skin, 0.08 + (index % 3) * 0.05);
  const lipColor = mixColor(skin, accent, 0.35);
  const pupil = darken(hair, 0.25);

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${createGradient(
          bgGradientId,
          [
            { offset: "0%", color: lighten(palette.base, 0.1) },
            { offset: "60%", color: palette.base },
            { offset: "100%", color: palette.depth }
          ],
          120
        )}
        ${createGradient(garmentGradientId, [
          { offset: "0%", color: garment },
          { offset: "100%", color: darken(garment, 0.25) }
        ])}
        ${createNoise(noiseId, index + 2, 0.18)}
      </defs>
      <rect width="${width}" height="${height}" fill="url(#${bgGradientId})" rx="32" />
      <g filter="url(#${noiseId})" opacity="0.35">
        <rect width="${width}" height="${height}" fill="#000" />
      </g>
      <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 16}" fill="rgba(255,255,255,0.08)" />
      <path
        d="M ${width / 2 - 140} ${height}
           L ${width / 2 - 140} ${height - 110}
           Q ${width / 2} ${height - 190} ${width / 2 + 140} ${height - 110}
           L ${width / 2 + 140} ${height}
           Z"
        fill="url(#${garmentGradientId})"
        opacity="0.95"
      />
      <ellipse cx="${width / 2}" cy="${height / 2 - 40}" rx="84" ry="90" fill="${hair}" />
      <ellipse cx="${width / 2}" cy="${height / 2 - 54}" rx="94" ry="70" fill="${darken(hair, 0.2)}" opacity="0.85" />
      <circle cx="${width / 2}" cy="${height / 2 - 10}" r="82" fill="${skin}" />
      <rect x="${width / 2 - 30}" y="${height / 2 + 30}" width="60" height="80" rx="22" fill="${skin}" />
      <ellipse cx="${width / 2}" cy="${height / 2 + 54}" rx="58" ry="40" fill="${garment}" opacity="0.45" />
      <circle cx="${width / 2 - 46}" cy="${height / 2 - 6}" r="18" fill="${cheekColor}" opacity="0.55" />
      <circle cx="${width / 2 + 46}" cy="${height / 2 - 6}" r="18" fill="${cheekColor}" opacity="0.55" />
      <path d="M ${width / 2 - 45} ${height / 2 - 15} Q ${width / 2 - 24} ${height / 2 - 26} ${width / 2 - 5} ${
    height / 2 - 20
  }" stroke="${darken(hair, 0.1)}" stroke-width="5" stroke-linecap="round" opacity="0.5" />
      <path d="M ${width / 2 + 45} ${height / 2 - 15} Q ${width / 2 + 24} ${height / 2 - 26} ${width / 2 + 5} ${
    height / 2 - 20
  }" stroke="${darken(hair, 0.1)}" stroke-width="5" stroke-linecap="round" opacity="0.5" />
      <path d="M ${width / 2 - 32} ${height / 2 - 5} Q ${width / 2 - 16} ${height / 2} ${width / 2 - 4} ${
    height / 2 - 2
  }" stroke="${pupil}" stroke-width="6" stroke-linecap="round" />
      <path d="M ${width / 2 + 32} ${height / 2 - 5} Q ${width / 2 + 16} ${height / 2} ${width / 2 + 4} ${
    height / 2 - 2
  }" stroke="${pupil}" stroke-width="6" stroke-linecap="round" />
      <path d="M ${width / 2} ${height / 2 - 20} Q ${width / 2 - 6} ${height / 2 + 10} ${width / 2} ${
    height / 2 + 18
  }" stroke="${darken(skin, 0.25)}" stroke-width="6" stroke-linecap="round" fill="none" />
      <path d="M ${width / 2 - 14} ${height / 2 + 28} Q ${width / 2} ${height / 2 + 35} ${width / 2 + 14} ${
    height / 2 + 28
  }" stroke="${lipColor}" stroke-width="5" stroke-linecap="round" />
      ${
        index % 3 === 0
          ? `<path d="M ${width / 2 - 28} ${height / 2 + 2} Q ${width / 2} ${height / 2 + 10} ${width / 2 + 28} ${
              height / 2 + 2
            }" stroke="${darken(hair, 0.05)}" stroke-width="7" stroke-linecap="round" opacity="0.7" />`
          : ""
      }
      ${
        index % 4 === 1
          ? `<path d="M ${width / 2 - 52} ${height / 2 - 60} Q ${width / 2} ${height / 2 - 110} ${width / 2 + 52} ${
              height / 2 - 60
            } L ${width / 2 + 60} ${height / 2} L ${width / 2 - 60} ${height / 2} Z" fill="${darken(
              hair,
              0.15
            )}" opacity="0.85" />`
          : ""
      }
      ${createLogoMark(logoHref, logoClip, width, height)}
    </svg>
  `;
};

const createDestinationSvg = (index: number, logoHref: string | null) => {
  const width = 720;
  const height = 460;
  const palette = landscapePalettes[index % landscapePalettes.length];
  const skyGradientId = `destSky${index}`;
  const noiseId = `destNoise${index}`;
  const logoClip = `destLogo${index}`;
  const sunColor = lighten(palette.ridge, 0.2);

  const ridgePath = createLayerPath(index + 10, width, height, 0.55, 0.08);
  const midPath = createLayerPath(index + 20, width, height, 0.7, 0.05);
  const frontPath = createLayerPath(index + 30, width, height, 0.83, 0.04);
  const dunePath = createLayerPath(index + 40, width, height, 0.92, 0.02);

  const contourLines = Array.from({ length: 3 }).map((_, lineIndex) => {
    const y = height - 120 - lineIndex * 30;
    const amplitude = 20 + lineIndex * 8;
    const pathSegments = Array.from({ length: 6 })
      .map((__, segIndex) => {
        const x = 40 + segIndex * 110;
        const offset = Math.sin(segIndex + index * 0.3 + lineIndex) * amplitude;
        return `${x} ${y + offset}`;
      })
      .join(" T ");
    return `<path d="M 40 ${y} T ${pathSegments}" stroke="rgba(255,255,255,0.25)" fill="none" stroke-width="2" stroke-linecap="round" opacity="0.5" />`;
  });

  const clouds = Array.from({ length: 2 }).map((_, cloudIndex) => {
    const cx = 140 + cloudIndex * 220 + (index % 3) * 30;
    const cy = 120 + cloudIndex * 18;
    return `
      <g opacity="0.4">
        <ellipse cx="${cx}" cy="${cy}" rx="${60 + cloudIndex * 12}" ry="20" fill="${lighten(
          palette.sky,
          0.12
        )}" />
        <ellipse cx="${cx + 26}" cy="${cy - 8}" rx="${28}" ry="14" fill="${lighten(palette.sky, 0.25)}" />
      </g>
    `;
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${createGradient(
          skyGradientId,
          [
            { offset: "0%", color: lighten(palette.sky, 0.12) },
            { offset: "40%", color: palette.sky },
            { offset: "100%", color: darken(palette.sky, 0.05) }
          ],
          100
        )}
        ${createNoise(noiseId, index + 5, 0.22)}
      </defs>
      <rect width="${width}" height="${height}" fill="url(#${skyGradientId})" />
      <circle cx="${120 + (index % 5) * 40}" cy="${90 + (index % 4) * 10}" r="34" fill="${sunColor}" opacity="0.35" />
      ${clouds.join("\n")}
      <path d="${ridgePath}" fill="${palette.horizon}" opacity="0.95" />
      <path d="${midPath}" fill="${palette.ridge}" opacity="0.95" />
      <path d="${frontPath}" fill="${palette.slope}" opacity="0.96" />
      <path d="${dunePath}" fill="${palette.sand}" opacity="0.98" />
      ${contourLines.join("\n")}
      <g filter="url(#${noiseId})" opacity="0.4">
        <rect width="${width}" height="${height}" fill="#000" />
      </g>
      ${createLogoMark(logoHref, logoClip, width, height)}
    </svg>
  `;
};

const createIdeaSvg = (index: number, logoHref: string | null) => {
  const width = 660;
  const height = 420;
  const palette = ideaPalettes[index % ideaPalettes.length];
  const landscape = landscapePalettes[(index + 1) % landscapePalettes.length];
  const paperGradientId = `ideaPaper${index}`;
  const tapedPhotoMask = `ideaMask${index}`;
  const noiseId = `ideaNoise${index}`;
  const logoClip = `ideaLogo${index}`;

  const lowerLandscape = createLayerPath(index + 70, width - 140, 160, 0.55, 0.08);
  const lowerMid = createLayerPath(index + 80, width - 140, 160, 0.75, 0.05);

  const scribbles = Array.from({ length: 4 }).map((_, lineIndex) => {
    const y = 100 + lineIndex * 28;
    return `<path d="M 60 ${y} Q ${width / 2} ${y - 6} ${width - 60} ${y - (lineIndex % 2 === 0 ? 16 : -12)}" stroke="${
      palette.ink
    }" stroke-width="2" stroke-linecap="round" opacity="0.4" fill="none" />`;
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${createGradient(
          paperGradientId,
          [
            { offset: "0%", color: lighten(palette.paper, 0.06) },
            { offset: "100%", color: palette.paper }
          ],
          90
        )}
        <mask id="${tapedPhotoMask}">
          <rect x="0" y="0" width="${width}" height="${height}" fill="#fff" />
          <rect x="80" y="190" width="${width - 160}" height="190" rx="24" ry="24" fill="#000" />
        </mask>
        ${createNoise(noiseId, index + 90, 0.18)}
      </defs>
      <rect width="${width}" height="${height}" fill="url(#${paperGradientId})" />
      <g filter="url(#${noiseId})" opacity="0.35">
        <rect width="${width}" height="${height}" fill="#000" />
      </g>
      <rect x="40" y="40" width="${width - 80}" height="160" rx="18" fill="none" stroke="${lighten(
        palette.ink,
        0.5
      )}" stroke-dasharray="7 10" opacity="0.6" />
      ${scribbles.join("\n")}
      <rect x="${width / 2 - 60}" y="40" width="120" height="24" rx="12" fill="${palette.tape}" opacity="0.7" />
      <rect x="${width / 2 - 160}" y="182" width="320" height="30" rx="8" fill="${palette.tape}" opacity="0.45" />
      <g transform="translate(80, 190)">
        <rect width="${width - 160}" height="190" rx="24" fill="${landscape.sky}" />
        <path d="${lowerLandscape}" fill="${landscape.ridge}" opacity="0.96" transform="translate(0, 20)" />
        <path d="${lowerMid}" fill="${landscape.slope}" opacity="0.96" transform="translate(0, 40)" />
        <path d="${createLayerPath(index + 81, width - 140, 160, 0.92, 0.03)}" fill="${landscape.sand}" transform="translate(0, 60)" />
        <circle cx="80" cy="50" r="18" fill="${lighten(landscape.ridge, 0.2)}" opacity="0.55" />
        <path d="M 30 150 Q ${(width - 140) / 2} 120 ${width - 170} 140" stroke="rgba(255,255,255,0.35)" stroke-width="2" fill="none" />
      </g>
      <rect x="70" y="210" width="${width - 140}" height="210" rx="26" ry="26" fill="none" stroke="#C1B3A4" opacity="0.3" />
      <g opacity="0.5">
        <circle cx="100" cy="320" r="8" fill="${palette.accent}" />
        <rect x="120" y="308" width="120" height="8" rx="4" fill="${palette.ink}" opacity="0.4" />
        <rect x="120" y="324" width="80" height="6" rx="3" fill="${palette.ink}" opacity="0.3" />
      </g>
      <g mask="url(#${tapedPhotoMask})">
        <rect x="0" y="0" width="${width}" height="${height}" fill="rgba(0,0,0,0.04)" />
      </g>
      ${createLogoMark(logoHref, logoClip, width, height)}
    </svg>
  `;
};

const writeAsset = async (filename: string, content: string) => {
  const filePath = path.join(OUTPUT_DIR, filename);
  await fs.writeFile(filePath, content.trim() + "\n", "utf8");
};

const main = async () => {
  await ensureDir(OUTPUT_DIR);
  let logoHref: string | null = null;

  try {
    await fs.access(LOGO_FILE);
    logoHref = "../yezai.png";
  } catch {
    logoHref = null;
  }

  const avatarFiles = Array.from({ length: avatarCount }).map((_, idx) =>
    writeAsset(`creator-${String(idx + 1).padStart(2, "0")}.svg`, createAvatarSvg(idx, logoHref))
  );

  const destinationFiles = Array.from({ length: destinationCount }).map((_, idx) =>
    writeAsset(`dest-${String(idx + 1).padStart(2, "0")}.svg`, createDestinationSvg(idx, logoHref))
  );

  const ideaFiles = Array.from({ length: ideaCount }).map((_, idx) =>
    writeAsset(`idea-${String(idx + 1).padStart(2, "0")}.svg`, createIdeaSvg(idx, logoHref))
  );

  await Promise.all([...avatarFiles, ...destinationFiles, ...ideaFiles]);
  console.log("Mock assets regenerated in /public/generated");
};

main().catch((error) => {
  console.error("Failed to generate mock assets:", error);
  process.exitCode = 1;
});
