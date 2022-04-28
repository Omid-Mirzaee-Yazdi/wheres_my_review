const core = require("@actions/core");
const github = require("@actions/github");

const validate = (config) => {
  const allowedSeverity = ["nice", "angry", "outrageous"];
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
  const greet = ["hello,", "hey,", "whatsup"];
  const messages = {
    nice: [
      "would you please review my code",
      "sir, im waiting for your review",
      "please review the code Mr. Senior developer",
    ],
    angry: [
      "I am still waiting, what are you doing",
      "bruh, you are making me crazy, review the code",
      "can you please? it take two minutes, you know what am I talking about, ugh",
    ],
    outrageous: [
      "I have no idea who told you you are a senior developer when you dont even review my pull request",
      "You good for nothing developer, the whole team is waiting for your stupid code review! can you please?",
    ],
  };
  const selectedArray = messages[config.severity];
  const selectedSentence =
    selectedArray[Math.floor(Math.random() * selectedArray.length)];
  const encodedSentece = selectedSentence.replaceAll(" ", "%20");
  client.calls
    .create({
      url:
        "https://handler.twilio.com/twiml/EH3bedf0ab841a726b3a4fa442d181a108" +
        `?text=${encodedSentece}`,
      from: config.twillioNumber,
      to: config.number,
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
