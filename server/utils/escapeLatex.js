function escapeLatex(str = "") {
  return str
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

export function deepEscape(obj) {
  if (Array.isArray(obj)) return obj.map(deepEscape);

  if (typeof obj === "object" && obj !== null) {
    const out = {};
    for (const k in obj) out[k] = deepEscape(obj[k]);
    return out;
  }

  return escapeLatex(obj);
}