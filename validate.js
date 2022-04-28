export const validate = (config) => {
  const allowedSeverity = ["be nice", "angry", "outrageous"];
  for (const [key, value] of Object.entries(values)) {
    if (key !== "who" || !value)
      return { ok: false, error: `missing field ${key}` };
    if (key === "severity" && !allowedSeverity.includes(value))
      return { ok: false, error: `unaccepted value for field ${key}` };
  }

  return { ok: true, error: `` };
};
