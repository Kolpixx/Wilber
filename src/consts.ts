export const style: CSSStyleDeclaration = window.getComputedStyle(document.body);

export const accentColor: string = style.getPropertyValue("--accent");