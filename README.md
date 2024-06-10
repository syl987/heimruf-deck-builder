# HS Deck Builder App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) before June 22nd, 2019.

## Deployment

Run `npm run deploy` to deploy the application to firebase hosting [Heimruf Deck Builder](https://heimruf-deck-builder.web.app).

## Features

### Data Mining

Card data and images can be downloaded using the [mining scripts](scripts) based on the app [data config](src/data.config.json).

### Deck Builder

Create your own deck, for each hero separately. Add / remove cards according to the deck rules, browse your available cards.

### Collection

Browse and view available cards!

### Technical

Advanced custom NgRx structure for easy code maintenance. See [Root Store](src/app/store) for reference.

On each raw data load - extract card ids by category for faster filtering experience. See [Prefilter Library Feature Store](src/app/store/prefilter) for reference.

## Getting Started

Install [Node.js](https://nodejs.org/en/) and run `npm ci&&npm start`.

### IDE Extensions

For development, an IDE such as [Visual Studio Code](https://code.visualstudio.com) with [Typescript](https://www.typescriptlang.org) capabilities is required, alongside with the following plugins / extensions:

- [Angular](https://angular.io/) capabilities: [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- code linting: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- code formatting: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - please set auto-format on save within your IDE
- git capabilities: [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

<sup>Shared extension recommentations for Visual Studio Code are already included within the repository.</sup>

### IDE Settings

For consistent development and to fully enable the power of some plugins / extensions, please configure your IDE as follows (based on Visual Studio Code):

```json
{
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": false
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "extensions.ignoreRecommendations": false
}
```

<sup>Shared workspace settings for Visual Studio Code are already included within the repository.</sup>

## Styling Setup

### Normalize

Visit [Bootstrap Reboot](https://getbootstrap.com/docs/5.1/content/reboot/) and [Custom Base](/src/styles/scss/common/_base.scss) for normalize reference.

### Typography

Visit [Bootstrap Typography](https://getbootstrap.com/docs/5.1/content/reboot/), [Custom Typography](/src/styles/scss/common/_typography.scss) and [Imported Fonts](/src/styles/fonts/HKGrotesk/HKGroteskLegacy.css) for typography reference.

<!-- ### Icons

Visit [Font Awesome 4.7.0](https://fontawesome.com/v4.7.0/icons/) for icon reference. -->

### Grid

Visit [Bootstrap Grid](https://getbootstrap.com/docs/5.1/layout/grid/) <!-- and [Custom Container Styles](/src/styles/scss/common/_container.scss)  -->for grid utilities reference.

### Utilities

Visit [Bootstrap Utilities](https://getbootstrap.com/docs/5.1/utilities/spacing/) and [Bootstrap Helpers](https://getbootstrap.com/docs/5.1/helpers/visually-hidden/) for style utilities reference. For local filters and changes, check out [Custom Utilities](/src/styles/scss/bootstrap/_utilities.scss), [Custom Bootstrap Variables](/src/styles/scss/bootstrap/_variables_.scss) and [Custom Styles](/src/styles/scss/styles.scss) in general.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component folder-name/component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
