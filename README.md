<p align="center">
  <br />
<img src="/public/app-screenshot.png" alt="screenshot-demo" height="600px"/>

</p>

<h1 align="center"><b>Issue and verify credentials with Paradym</b></h1>

Easily integrate [Paradym](https://paradym.id) workflows into your frontend application with this demo. Enroll in university courses by proving prior course completions.

## Before you begin

This demo uses [Paradym](https://paradym.id), a workflow builder for developers that provides the actions, workflows and infrastructure you need to use verifiable credentials in your solution.

If you don't have an account yet, you can start with our [quick start guide](https://docs.paradym.id/).

This demo also uses the [Paradym Wallet](https://docs.paradym.id/integrating-with-a-holder-wallet/paradym-wallet), an open source companion app to the Paradym platform available on the [Apple App Store](https://apps.apple.com/nl/app/paradym-wallet/id6449846111?l=en) and [Google Play Store](https://play.google.com/store/apps/details?id=id.paradym.wallet).

## Prerequisites

### Setup your workflows

The demo app requires 3 workflows. All workflows used for this demo application can be found in the `/paradym` folder.

- **Register Credential Template**: workflow used to register your credential schema and definition. The result of this workflow is used in the other 2 workflows.
- **Issue Cource Certificate**: workflow used to issue a course credential once the course is completed.
- **Verify Course Certificate**: workflow used to request and validate the required credentials for a course.

#### Step 1: Register your credential information

- Create a new workflow in Paradym with the name Register Credential Template.
- Copy the contents from `registerCredentialTemplate.yaml` into your created workflow.
- Publish the workflow.
- Execute the workflow via the executions tab.
- Click on the execution to view the result of your workflow.
- Copy the `credentialDefinitionId` from the result and save the value for later.

#### Step 2: Create the other workflows

Next, you need to create the other 2 workflows: Issue Course Certificate and Verify Course Certificate.

- Copy the contents from `.yaml` files from the `paradym` directory and create the workflows.
- Replace the `<YOUR_CREDENTIAL_DEFINITION_ID>` values with the `credentialDefinitionId` value from step 1 for both workflows.
- Publish the workflows.

Once you have created the workflows in the Paradym dashboard, you can copy the workflow ID's from Paradym and set them as environment variables.

#### Step 3: Create your Paradym API Key

You can generate your API key in the settings tab on the Paradym dashboard as described in [here](https://docs.paradym.id/executing-a-workflow/api-execution#api-key).

#### Step 4: Setup Paradym Webhook

The application uses Paradym Webhooks. For this, we need to create a Webhook in the Paradym dashboard (as described [here](https://docs.paradym.id/working-with-executions/using-webhooks)).

For this to work with your local environment, we'll need to expose port 3000 to the internet. This can be done using [ngrok](https://ngrok.com/). Once you have installed ngrok, you can run the following command to expose port 3000 to the internet.

```bash
ngrok http 3000
```

Use the **https** url to create your webhook in the Paradym dashboard. Make sure to add `/api` after the url (e.g. https://107a-217-123-79-23.ngrok-free.app/api).

You'll need set the webhook secret in your environment variables.

#### Step 5: Set the environment variables

The environment variables consist of your Paradym API Key, and the ID's of the workflows just created. Once you have created the workflows in the Paradym dashboard, you can copy the workflow ID's from Paradym and set them as environment variables.

```bash
cp .env.example .env.local
```

| Variable                                | Description                                                                                                                                                                                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PARADYM_API_KEY`                       | This is the API key used to send request to Paradym. You can generate your API key in the settings tab on the Paradym dashboard as described in [here](https://docs.paradym.id/executing-a-workflow/api-execution#api-key).                                              |
| `PARADYM_WEBHOOK_SECRET`                | This is a secret that is generated once you create a Webhook in the Paradym dashboard. You can set up a Webhook in the settings tab on the Paradym dashboard as described in [here](https://docs.paradym.id/working-with-executions/using-webhooks#setting-up-webhooks). |
| `ISSUE_COURSE_CERTIFICATE_WORKFLOW_ID`  | This is the ID of the issue course credential workflow. Once you have created the workflow in Paradym you can copy the ID from the [executions tab](https://docs.paradym.id/executing-a-workflow/api-execution#workflow-id).                                             |
| `VERIFY_COURSE_CERTIFICATE_WORKFLOW_ID` | This is the ID of the verify course credential workflow. Once you have created the workflow in Paradym you can copy the ID from the [executions tab](https://docs.paradym.id/executing-a-workflow/api-execution#workflow-id).                                            |

## Running the demo

First, run `yarn` to install the dependencies:

```bash
yarn
```

You can then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
