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
  console.log(`twillio added`);

  //   const validationRes = validate(config);
  //   if (!validationRes.ok) {
  //     core.setFailed(validationRes.error);
  //   }

  const client = require("twilio")(config.twillioSID, config.twillioAuthToken);

  client.calls
    .create({
      url: "https://handler.twilio.com/twiml/EH3bedf0ab841a726b3a4fa442d181a108",
      from: config.twillioNumber,
      to: config.number,
      text: "just to test the dynamic text " + config.who,
    })
    .then((call) => console.log("called successfully", call))
    .catch((e) => console.log("twillio error: ", e));

  const time = new Date().toTimeString();
  core.setOutput("time", time);

  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
