# Sample Node.js Hello World

Simple Node.js application that renders an interactive "Investigate Cain" experience on the root route.

## Getting started

1. Install dependencies (none required for this simple app, but run npm install to prepare the environment if you add dependencies later):
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Visit http://localhost:3000 (or the port defined via `PORT`) to explore the four-section profile of Cain's story.

## Notes

- The server builds the HTML in `index.js`, so all Cain content is available without extra assets.
- Configure the listening port with the `PORT` environment variable when running in other environments.

