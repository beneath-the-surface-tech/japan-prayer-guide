This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started (Editors)

The preferred flow for editors to make basic textual changes are via a Github account with editorial permissions and tested via an automatic deploy via Vercel.

### Setup

Github account + Permissions:

1. Go to the [Github Homepage](https://github.com/) and click on the `Sign Up` button in the top right.
2. Follow the provided prompts to create your account as a `Individual` (not Organization). You can ignore all optional prompts (for personalization / pricing recommendations), as a free account is all you need.
3. Notify the owner ([schang213](https://github.com/schang213)) and wait for the Github email prompt to confirm access as a `Collaborator`.

### Making edits

The rough flow for making edits is as follows:

1. Navigate to the desired text `*.json` file on Github,
2. Edit via the provided controls,
3. Verify your changes, then
4. Pull-request to production.

#### (1) Locate the desired text file

There are two main ways, either by Github search, or by navigation. Either way, make sure you are always on the [`editorial` branch](https://github.com/wliu080/japan-prayer-guide/tree/editorial) before you begin to make changes. You can verify this by checking the url for `editorial`, e.g, `...japan-prayer-guide/<action/type>/editorial/...`.

1. Locate by github search
   ![1-locate-via-search](https://user-images.githubusercontent.com/8304496/221731096-b8eab71a-0982-4608-a651-fd48028db927.gif) 1. Github has a search function but the results will direct you to the `main` branch, so you will need to remember to toggle back to the editorial branch once you have found the desired file. 2. Simply put in the search text in the top left search bar and choose the `in this repository` option when searching. 3. Toggle back to the editorial branch via the button next to the breadcrumbs. 4. Note: unlike the gif above, the files you will be changing will always be a `*.json` file.
2. Locate by navigation
   ![1-locate-via-navigation](https://user-images.githubusercontent.com/8304496/221730916-4034fe6d-44ee-4956-a537-9a7062f2099c.gif) 1. For navigation, simply navigate to the `/public/locales` folder. It will have folders for each supported language `en`, `ja` etc. 2. Whichever language you choose, the files inside will all have the same structure - there will be files for each section `downloads.json`, `about.json`, as well as files for each individual topic page, select the relevant file you desire.

### (2) Edit and commit your changes to the editorial branch

![2-edit-and-3-commit](https://user-images.githubusercontent.com/8304496/221731625-08d09584-a18e-4684-b495-ab40ffa7809a.gif)

1. With the file selected, make your desired edits by clicking the pencil icon ('Edit this file`) located next to the 'Raw | Blame' buttons.
    1. The format of all the text .json files are collections of key-value pairs, with the whole file enclosed with brackets '{', '}'
    2. Each pair is in the format of `"key": "website text"` with a comma to separate pairs (do not add a comma to the end of the last item!)
    3. The `key` value is what the code uses and is replaced with the `website text` when rendered, make your desired changes in the `website text` part of the file.
2. When you are happy with your change, scroll to the bottom of the page to see a `Commit Changes` form. You will have the option to provide additional information to be associated with your change, as well as a option to either commit the change to the `editorial` branch, or `create a new branch` for your changes. Please commit it to the `editorial` branch (default option). Note that if a different branch is listed here, you are on the wrong branch! Make a copy of your changes (on notepad or wherever) and toggle your branch back to `editorial`.

### (３) Verify your changes

Once your change has been successfully committed, a deployment will be made automatically. Depending on how busy, it may take around a minute or so. You should receive a notification in the `eng` slack channel on completion. 1. View your changes on the [`editorial` test page](https://japan-prayer-guide-git-editorial-wliu080.vercel.app/).

### (4) Pull Request to production

When you are happy for your changes to go to production, you can make a _pull-request from the editorial branch to main_
![5-create-pr](https://user-images.githubusercontent.com/8304496/221732894-a30645d6-f01e-4a2f-892b-0a75ca70837e.gif)

1.  From the github project page, click on the `pull requests` tab in the tab bar (where 'code', 'issues', etc sit)
2.  You will see a list of open pull-requests, and a green button to create a `New pull request`. Click it.
3.  There should now be a grey bar showing the `base` and `compare` branches. Ensure that `base` is set to `main` and `compare` is `editorial`.
4.  You should now see a summary of your changes below, the files changed and a preview of the changes themselves. Click on the `Create pull request button` to confirm and continue.
5.  You will be given a optional field to provided a more detailed explanation for other editors to see when reviewing your changes. By default at least one person needs to approve your changes before it can be merged (unless you are the code owner). Confirm your message by click the `Create pull request` button (make sure it is not set to Create Draft pull request)
6.  Wait for someone to approve your changes. You can always view the status of your pull request on the `pull requests` tab. The conversation tab in your pull-request will display any updates, comments or suggestions from others, and will also have a button allowing you to `Merge pull request` once you have the necessary approvals.

### Giving other accounts permission

1. As the codebase owner, navigate to the [project access settings page](https://github.com/wliu080/japan-prayer-guide/settings/access). You may be prompted to re-input your account password to proceed.
2. Click on the green `Add people` button, and in the provided pop-up form, input the desired account's github email (or search by their github username)
3. The desired account owner will receive an email from Github that needs to be confirmed in order to have access.

## Getting Started (Developers)

### Installation

1. Install [NVM](https://github.com/nvm-sh/nvm). This helps us to maintain the node dev environment.
2. Install dependencies

```bash
nvm use && yarn start
# or
nvm use && npm i
```

### Development

Open the `.env.example` file and fill in the required variables. If you do not have access to Retool, please ask in #eng channel.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

#### Retool for topic pages

Topic page contents are stored in Retool, and are fetched via the `/api/topics` endpoint. The data is cached until it is invalidated. 

There is a "Clear Cache" button bottom right corner of the page that will invalidate the cache.

Nb: We aim to match the following naming conventions:

-   Page files under `pages`: kebab-case ('-' delineated, lower case)
-   Components under `components`: PascalCase (every word capitalized, no spaces)

## Testing

This project is tested with [BrowserStack](https://www.browserstack.com/).

```bash
nvm use && npm test
```

```
npm run test -- --watch
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
