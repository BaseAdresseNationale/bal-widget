# BAL Widget

BAL Widget est un outil permettant de soulager le support en répondant aux problèmes les plus courants des utilisateurs.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Configuration

Cette application utilise des variables d'environnement pour sa configuration.
Elles peuvent être définies classiquement ou en créant un fichier `.env` sur la base du modèle `.env.sample`.

| Nom de la variable                     | Description                      |
| -------------------------------------- | -------------------------------- |
| `PORT`                                 | Port utilisé                     |
| `PUBLIC_URL`                           | Url publique du site             |
| `REACT_APP_BAL_ADMIN_API_URL`          | URL de base de BAL Admin         |
| `REACT_APP_MES_ADRESSES_URL`           | URL de base de mes-adresses      |
| `REACT_APP_MES_ADRESSES_API_URL`       | URL de base de mes-adresses-api  |
| `REACT_APP_API_DEPOT_URL`              | URL de base de l'api de depot    |
| `REACT_APP_MES_SIGNALEMENTS_URL`       | URL de base de mes-signalements  |
| `REACT_APP_MES_SIGNALEMENTS_SOURCE_ID` | ID de la source de signalement   |
| `REACT_APP_API_SIGNALEMENT_URL`        | URL de base de l'API signalement |

Toutes ces variables ont des valeurs par défaut que vous trouverez dans le fichier `.env.sample`.

### Licence

MIT
