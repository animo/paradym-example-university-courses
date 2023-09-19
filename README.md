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

Before you can start, you need to set the environment variables:

```bash
cp .env.example .env.local
```

The environment variables consist of your Paradym API Key, and the ID's of the workflows used in this application. All workflows used for this demo application can be found in the `/paradym` folder.

Once you have created the workflows in the Paradym dashboard, you can copy the workflow ID's from Paradym and set them as environment variables. **Make sure your workflows are 'published'.**

| Variable                                | Description                                                                                                                                                                                                                   |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PARADYM_API_KEY`                       | This is the API key used to send request to Paradym. You can generate your API key in the settings tab on the Paradym dashboard as described in [here](https://docs.paradym.id/executing-a-workflow/api-execution#api-key).   |
| `ISSUE_COURSE_CERTIFICATE_WORKFLOW_ID`  | This is the ID of the issue course credential workflow. Once you have created the workflow in Paradym you can copy the ID from the [executions tab](https://docs.paradym.id/executing-a-workflow/api-execution#workflow-id).  |
| `VERIFY_COURSE_CERTIFICATE_WORKFLOW_ID` | This is the ID of the verify course credential workflow. Once you have created the workflow in Paradym you can copy the ID from the [executions tab](https://docs.paradym.id/executing-a-workflow/api-execution#workflow-id). |

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
