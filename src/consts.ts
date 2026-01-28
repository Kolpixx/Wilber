export const themes = [["system", "System"], ["light", "Light"], ["dark", "Dark"], ["catppuccin-mocha", "Catppuccin"], ["rose-pine", "Rosé Pine"], ["alien", "Alien 👽"]] as const;
export const themeMap = new Map(themes);

export type Theme = typeof themes[number][0];