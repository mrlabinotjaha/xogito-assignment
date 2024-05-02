# Xogito home assignment (Proudcts lits)

# Instructions

Create a simple React app and provide a public GitHub repository to the solution.

1. For UI elements use Material UI (https://material-ui.com)
2. Entities

   - a. Project
   - - i. id (numeric)
   - - ii. name (string)
   - - iii. description (string)
   - - iv. owner (user)

3. Views

   - a. List Projects (landing page)
   - - i. A button to create a new project.
   - - ii. Search input which should search in the Project name and description on
       change
   - - iii. Table element to list all projects with pagination.
   - - iv. Each row should have an action button for edit project action
   - b. Create/Edit project
   - - i. Dialog form to create a new project to input all fields from the entity
       except ID
   - - ii. ID should be calculated so all projects would have a unique incrementing
       ID
   - - iii. Owner field should be a dropdown list of existing users.

4. Requirements

- a. Use json-server library for fake REST api
- b. Use Redux
- c. Create at least one custom hook (optional)
- d. Do at least 1 unit test.
- e. Use react-hook-form library to handle form (optional)
- f. Feel free to use any additional libraries that will help you

## Available Scripts

In the project directory, you can run:

### `npx json-server --port 3001`

To set up a mock server and access it at [http://localhost:3001](http://localhost:3001) using json-server.

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
