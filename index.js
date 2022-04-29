const core = require("@actions/core");
const utils = require("./utils");

try {
  const config = {
    who: core.getInput("who"),
    number: core.getInput("number"),
    severity: core.getInput("severity"),
    twillioSID: core.getInput("twillioSID"),
    twillioAuthToken: core.getInput("twillioAuthToken"),
    twillioNumber: core.getInput("twillioNumber"),
  };
  const validationRes = utils.validate(config);
  if (!validationRes.ok) {
    core.setFailed(validationRes.error);
  }

  const client = require("twilio")(config.twillioSID, config.twillioAuthToken);
  const greetingList = ["hello", "hey", "whatsup"];
  const messages = {
    nice: [
      "would you please review my code, we are running out of time sir, thank you so much",
      "sir, im waiting for your review, I would appreciate if you apare a moment since the whole crew is awaiting your precious opinion. much appreciated!",
      "please review the code Mr. Senior developer, we have other stuff to do.",
    ],
    angry: [
      "I am still waiting, what are you doing. I am not as senior as you are, but I am well aware that it will not take that long.",
      "bruh, you are making me crazy, review the code, thanks bye",
      "This is the last time im asking you, can you please? it take two minutes, you know what am I talking about, ugh",
    ],
    outrageous: [
      "I have no idea who told you that you are a senior developer when you dont even review my pull request, for gods sake.",
      "You good for nothing developer, and you call yourself. quote. senior? the whole team is waiting for your stupid code review! can you please? good lord",
      "you lazy, good for nothing developer! go do your homework, the whole team is waiting for your stupid review to nag on the camelcase naming and whatnot, jesus christ.",
    ],
  };
  const selectedArray = messages[config.severity];
  const selectedSentence =
    selectedArray[Math.floor(Math.random() * selectedArray.length)];
  const greeting = `${
    greetingList[Math.floor(Math.random() * greetingList.length)]
  }, ${config.who}...`;
  const encodedSentece = utils.encode(greeting + selectedSentence);
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
} catch (error) {
  core.setFailed(error.message);
}
