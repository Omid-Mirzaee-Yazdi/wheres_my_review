module.exports = {
  validate: (config) => {
    const allowedSeverity = ["nice", "angry", "outrageous"];
    for (const [key, value] of Object.entries(config)) {
      if (key !== "who" && !value)
        return { ok: false, error: `missing field ${key}` };
      if (key === "severity" && !allowedSeverity.includes(value))
        return { ok: false, error: `unaccepted value for field ${key}` };
    }

    return { ok: true, error: `` };
  },
  encode: (value) => {
    const encoded = value.replaceAll(" ", "%20");

    return encoded;
  },
};
