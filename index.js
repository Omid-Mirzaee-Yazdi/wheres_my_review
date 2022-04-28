const core = require("@actions/core");
const github = require("@actions/github");

try {
  const who = core.getInput("who");
  const number = core.getInput("number");
  console.log(`Hello ${who}! your phone number is  ${number}`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
