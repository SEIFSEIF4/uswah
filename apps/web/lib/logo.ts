/**
 * Identity geometry, in one place because five surfaces draw it: the favicon, the iOS
 * icon, the social avatar, the link-preview card and the site header.
 *
 * The mark is أ taken apart — its hamza over a bare stem — and the wordmark is أسوة.
 * Both are outlines lifted from Thmanyah Serif Display Black, the face the wordmark is
 * set in.
 *
 * The letter is split rather than drawn whole because a whole أ is a hamza on a tall thin
 * stem, and that stem is a hairline below about 24px. The hamza alone was tried and
 * dropped: on its own it reads as ع.
 */
export const SAND = "#e4d9c6";
export const INK = "#241d18";

const HAMZA =
  "M17 67 27 82 404 -27 482 -179 471 -193 337 -168C198 -157 119 -220 119 -255C119 -290 219 -307 253 -307C302 -307 353 -271 380 -231L395 -233L400 -242C450 -345 412 -457 309 -457C184 -457 88 -293 88 -183C88 -139 103 -100 136 -68C126 -58 117 -48 108 -38Z";

export const WORDMARK_VIEWBOX = "36 -964 1854 1230";
export const WORDMARK_PATH =
  "M141 -495H129L100 -345C56 -267 36 -208 36 -136C36 -52 73 15 184 15C247 15 327 -7 374 -33L413 -131C458 -248 431 -331 338 -399L348 -437L142 -495ZM412 -172C382 -164 300 -150 215 -150C102 -150 62 -174 62 -208C62 -243 104 -293 143 -335C308 -298 379 -242 412 -172ZM371 -640C372 -640 372 -652 371 -653L293 -731L223 -661L153 -731L74 -652V-641L153 -561L223 -631L293 -561Z M901 0C933 0 950 -17 950 -49V-164H861C854 -338 770 -411 684 -411C596 -411 508 -320 508 -163C508 -56 563 0 643 0H824C751 88 624 138 480 155V173L686 266C757 184 815 103 843 0ZM524 -215C524 -243 575 -261 636 -261C706 -261 785 -233 821 -164H643C575 -164 524 -181 524 -215Z M1545 -418H1527L1473 -280C1515 -239 1544 -208 1571 -158L1362 -205L1386 -301L1360 -308L1324 -182C1295 -166 1261 -160 1229 -160C1187 -160 1132 -172 1092 -192L1137 -273L1113 -286L1047 -177C1012 -167 996 -164 951 -164C918 -164 902 -148 902 -115V0C937 0 970 -5 1002 -26L1024 -65C1058 -27 1107 0 1170 0C1227 0 1281 -23 1299 -72L1541 -13L1584 -155C1619 -271 1612 -321 1545 -418Z M1823 -684H1804V-683V-684L1723 -582L1754 16H1773L1818 -142C1828 -175 1833 -210 1833 -245V-449L1871 -493ZM1665 -711 1671 -701 1857 -755 1890 -822 1882 -832 1841 -823C1827 -821 1815 -820 1804 -820C1740 -820 1716 -854 1719 -869C1722 -881 1750 -893 1773 -893C1804 -893 1822 -873 1836 -852L1850 -855L1852 -860C1875 -910 1853 -964 1801 -964C1754 -964 1722 -917 1708 -885C1688 -841 1692 -801 1723 -773C1718 -768 1713 -763 1707 -757Z";

/**
 * The mark in a 64 box. `scale` shrinks the glyph towards the centre without moving it:
 * a social avatar is cropped to a circle, so it needs clear space a favicon does not.
 */
export function markSvg({
  ground = SAND,
  fg = INK,
  radius = 10,
  scale = 1,
}: { ground?: string | null; fg?: string; radius?: number; scale?: number } = {}) {
  // The stem sits 2 units under the hamza's box, which ends at y 36, and shares its
  // centre. Further apart and the two stop reading as one letter at avatar size.
  const glyph =
    `<g transform="translate(19.96 32.04) scale(0.0482)"><path d="${HAMZA}" fill="${fg}"/></g>` +
    `<rect x="26.5" y="38" width="11" height="17" rx="2.5" fill="${fg}"/>`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    (ground ? `<rect width="64" height="64" rx="${radius}" fill="${ground}"/>` : "") +
    `<g transform="translate(32 32) scale(${scale}) translate(-32 -32)">${glyph}</g>` +
    `</svg>`
  );
}

export const dataUri = (svg: string) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
