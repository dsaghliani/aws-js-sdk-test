const { CloudFormationClient, UpdateStackCommand } = require('@aws-sdk/client-cloudformation');
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");

const cognitoIdentityClient = new CognitoIdentityClient({ region: "eu-west-1" });

const client = new CloudFormationClient({
  region: "eu-west-1",
  credentials: fromCognitoIdentityPool({
    client: cognitoIdentityClient,
    identityPoolId: "eu-west-1:89063953-e48c-4f68-87ba-2f0d3f05be5b"
  })
});

const commandInput = {
  StackName: "arn:aws:cloudformation:eu-west-1:550862374618:stack/aljeem-masjid-1/67511c60-8d6e-11eb-8938-0a391a546edb",
  UsePreviousTemplate: true,
  Parameters: [
    {
    ParameterKey: "StackOffline",
    ParameterValue: "Online"
    }
  ],
  Capabilities: [
    "CAPABILITY_IAM",
    "CAPABILITY_AUTO_EXPAND"
  ]
};

const updateCommand = new UpdateStackCommand(commandInput);

const updateStack = async () => {
  try {
    const data = await client.send(updateCommand);
    console.log("Success", data);
  }
  catch (err) {
    console.log(err);
  }
};

// Expose the function to the browser.
// window.updateStack = updateStack;

updateStack();