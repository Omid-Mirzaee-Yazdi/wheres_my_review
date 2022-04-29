# wheres_my_review
  wheres my review is a github action made to decrease the waiting time for your code review. 
  This github action will make a phone call to your slow co-worker and ask for a pull request review.
  You can configure the severity of its speech tone to be nice, angry or outrageous.
  NOTE: don't use outrageous mode unless neccessary, its going to be really angry 😂
  you can check [the demo video here](https://youtu.be/Q5WBOec-mCw "the demo video")



# How to use

You will need to introduce  `uses: Omid-Mirzaee-Yazdi/wheres_my_review@v1.0.0` in your job 




# How to get your Twilio api credentials

Sign up to [Twilio](https://www.twilio.com/ "Twilio") official web page. Then register a new number to use it as from parameter. If you use free trial account you have to add verified phone number to use it as to parameter. Account SID and Auth token you can find on Dashboard page.



## Parameters
  
| Paarameter | description | Required | Default | accepted values |
| ---------- | ----------- | -------- | ------- | --------------- |
| who | Name of the person to call | N | "" | string |
| number | Target phone number | Y | null | string |
| severity | How angry do you want the call to be | N | "outrageous" | "nice", "angry", "outrageous" |
| twilioAuthToken | Your Twilio auth token | Y | null | string |
| twilioSID | Your Twilio account SID | Y | null | string |
| twilioNumber | Your Twilio number from which the call is originated | Y | null | string |



# Example

### Trigger a call on every push

  ```
name: 'where is my review'
on:  [push]
    
jobs:
  pokeTest:
    runs-on: ubuntu-latest
    name: where is my review
    steps:
      - name: call
        id: call
        uses: Omid-Mirzaee-Yazdi/wheres_my_review@v1.0.0
        with:
          who: 'omid'
          number: '+461234567890'
          severity: "angry"
          twilioNumber: '+11234567890'
          twilioAuthToken: 'YOUR AUTH TOKEN'
          twilioSID: 'YOUR ACCOUNT SID'
    
      - name: Get the output time
        run: echo "I called them at ${{ steps.call.outputs.time }}."
        
  ```


# Copyright 
  The call engine is provided by twilio, you are required to to create your own api credentials to be able to use this service
  You can use this tool for personal and commercial purposes free of charge. 
  
# Disclaimer
  the developer of this action is not liable for any misuse of this tool, please note that "wheres_my_review" is just a tool for having fun, you will be responsible for any irretation and harrasment that might be caused as a result of your actions.
