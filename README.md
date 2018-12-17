## What's this?

This is a POC of a serverside rendered dynamic SPA in React+redux(thunk).

This was inspired by this excellent article: https://medium.com/bucharestjs/upgrading-a-create-react-app-project-to-a-ssr-code-splitting-setup-9da57df2040a

## How can I see it in action?

Just install dependencies, build the app and run the express server:

```
yarn install
yarn run start (dev server (no ssr) + watcher)
yarn run build (production build)
yarn run server (runs the SSR.)
```
