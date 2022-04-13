import {createAppAuth} from "@octokit/auth-app";

import {env} from "process";
import {promises as fs} from "fs";

export const auth = async (): Promise<string | Error> => {
  /* If there is a hardcoded PAT, use that and move on */
  if (env.GITHUB_API_TOKEN) {
    return env.GITHUB_API_TOKEN;
  }
  /* Checking if they have supplied all the required information to generate a GitHub App */
  if (
    !env.APP_ID ||
    !env.APP_PRIVATE_KEY_LOCATION ||
    !env.APP_INSTALLATION_ID ||
    !env.APP_CLIENT_ID ||
    !env.APP_CLIENT_SECRET
  ) {
    throw new Error(
      "You have not specified a Personal Access Token or all the requried variables for a GitHub App. Please re-check the documentation"
    );
  }

  try {
    const auth = createAppAuth({
      appId: env.APP_ID,
      privateKey: (await fs.readFile(env.APP_PRIVATE_KEY_LOCATION as string, "utf-8")) as string,
      clientId: env.APP_CLIENT_ID,
      clientSecret: env.APP_CLIENT_SECRET
    });

    const installationAuthentication = await auth({
      type: "installation",
      installationId: env.APP_INSTALLATION_ID,
    });

    return installationAuthentication.token;

  } catch (err: any) {
    console.error("Error within function (githubAuth)", err.message);
    throw new Error(
      "We failed to generate a token from the credentials provided on the GitHub App. Please re-check the credentails provided."
    );
  }
};
