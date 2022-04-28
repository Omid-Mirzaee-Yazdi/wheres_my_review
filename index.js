const core = require("@actions/core");
const github = require("@actions/github");

const validate = (config) => {
  const allowedSeverity = ["be nice", "angry", "outrageous"];
  for (const [key, value] of Object.entries(config)) {
    if (key !== "who" || !value)
      return { ok: false, error: `missing field ${key}` };
    if (key === "severity" && !allowedSeverity.includes(value))
      return { ok: false, error: `unaccepted value for field ${key}` };
  }

  return { ok: true, error: `` };
};

try {
  const config = {
    who: core.getInput("who"),
    number: core.getInput("number"),
    severity: core.getInput("severity"),
    twillioSID: core.getInput("twillioSID"),
    twillioAuthToken: core.getInput("twillioAuthToken"),
    twillioNumber: core.getInput("twillioNumber"),
  };

  //   const validationRes = validate(config);
  //   if (!validationRes.ok) {
  //     core.setFailed(validationRes.message);
  //   }

  console.log(config);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
