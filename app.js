class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    this.calcHSL();
  }

  innerRGB() {
    const { r, g, b } = this;
    return `${r} ,${g} ,${b}`;
  }

  rgb() {
    return `rgb(${this.innerRGB()})`;
  }

  rgb(a = 1.0) {
    return `rgb(${this.innerRGB()}, ${a})`;
  }

  hsl() {
    const { h, s, l } = this;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  hex() {
    const { r, g, b } = this;
    return ("#" + (1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  opposite() {
    const { h, s, l } = this;
    const newHue = (h + 180) % 360;
    return `hsl(${newHue}, ${s}%, ${l}%)`;
  }

  fullySaturated() {
    const { h, l } = this;
    return `hsl(${h}, 100%, ${l}%)`;
  }

  calcHSL() {
    // Make r, g, and b fractions of 1
    let { r, g, b } = this;
    r /= 255;
    g /= 255;
    b /= 255;

    // Find the greatest and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r)
      // Red is max
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      // Green is max
      h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360deg
    if (h < 0) h += 360;
    // calculate lightness
    l = (cmax + cmin) / 2;

    // calculate saturation

    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply s and l by 100;
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    this.h = h;
    this.s = s;
    this.l = l;
  }
}

const red = new Color(255, 67, 89, "tomato");
const white = new Color(255, 255, 255, "white");
const carrot = new Color(230, 126, 34, "carrot");
