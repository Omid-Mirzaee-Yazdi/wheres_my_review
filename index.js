const core = require("@actions/core");
const github = require("@actions/github");
const validate = require("./validate");

try {
  const config = {
    who: core.getInput("who"),
    number: core.getInput("number"),
    severity: core.getInput("severity"),
    twillioSID: core.getInput("twillioSID"),
    twillioAuthToken: core.getInput("twillioAuthToken"),
    twillioNumber: core.getInput("twillioNumber"),
  };

  const validationRes = validate(config);
  if (!validationRes.ok) {
    core.setFailed(validationRes.message);
  }

  console.log(`Hello ${who}! your phone number is  ${number}`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
