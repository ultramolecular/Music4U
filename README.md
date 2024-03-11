# Music4U

Music4U lets you view and visit the pages of:

- **featured** events in your area
- events in your area that were **just announced** within the last week
- events in your area that are coming up in the **next weekend**
- events in a **city** of your liking through a **search** bar

> [!IMPORTANT]
> Please allow location access as Music4U needs it to automatically load in events in your area.
> If there are no events in your area that Ticketmaster sells tickets for, then no events will
> be displayed.

## Getting Started

> [!NOTE]
> There currently is _no stable_ release.

For development:

1. `git clone git@github.com:ultramolecular/cs378-p4.git`
    - Replace with `https://github.com/ultramolecular/cs378-p4.git` if SSH not set up.
2. `cd cs378-p4`
3. `npm install`
4. `npm run dev`
5. Open up a browser tab to `localhost:5173/cs378-p4/` to see application locally and in action.

> [!NOTE]
> Node.js v20.11 and npm v10.2 or later are recommended.

## Set up API Key

1. You will need to [register for API access](https://developer-acct.ticketmaster.com/user/register)
to use the Ticketmaster API, however, it is free and easy to do.

2. Once you have a Ticketmaster Developer account, click on your profile > My Apps. There you should find
your default user app that lists your API (Consumer) key.

3. In the root directory of the project, make a `.env` file and store your API key in a single line as such:
`VITE_API_KEY="YOUR API KEY"`.
    - This is gitignored so no worries about accidentally exposing your secret.
4. Now the application will be able to make requests successfully.

## Developer Notes

- Development may or may not continue after March 2024.

- Currently, there are a couple TODOs and issues for future development:

    1. Find a way to not make unnecessary API calls if user clicks the same button more than once.
    2. Would like for event images to be on the right half of the card, haven't figured it out yet.
    3. Currently, only city names are viable, cannot specify with state code; finding a way to implement this
    would be useful for common name cities e.g. Springfield, Portland, Arlington, San Jose.
    4. Only 10 events per request are retrieved currently, can increase it and make pages for user to surf through.

- If you'd like, open up a new issue for either one or if a bug is found!
