# 🎶 React Music App 🎵

This is a music finding web app that helps users discover albums across various genres. The app provides an easy-to-use interface with options to filter, sort, and favorite music albums.

## 🚀 Running the App

Get into the app directory:

```sh
cd react-music-app
```

Use npm or any other package manager (e.g., pnpm) to:

- 📥 Install dependencies:
  ```sh
  npm install
  ```
- ▶️ Run the app:
  ```sh
  npm run dev
  ```
- 🧪 Run the tests:
  ```sh
  npm run test
  ```
- ✅ Verify the app for deployment:
  ```sh
  npm run verify
  ```

## 💻 Tech Stack

The app is built using the following technologies:

- **⚛️ React**: For building the user interface.
- **📘 TypeScript**: Provides static typing for better code quality and developer experience.
- **🎨 Tailwind CSS**: For styling the UI and ensuring a responsive design.
- **📦 React Context API**: To manage global state for features like favorite albums, filters, and sorting.
- **💾 LocalStorage**: Used to persist favorite albums across browser sessions.
- **🧪 Playwright**: For end-to-end testing to ensure application stability.
- **🧪 Jest**: For unit testing core components and utilities.

## ✨ Features

- **🔍 Search and Filter**: Users can filter albums by different genres and search for albums by name.
- **❤️ Favorite Albums**: Allows users to add albums to their favorites list for easy access.
- **↕️ Sorting Options**: Users can sort albums by release date or popularity.
- **🌗 Light/Dark Theme**: The app supports dark mode for a more comfortable viewing experience.

## 🔮 Future Enhancement Ideas

- **🌗 Theme Toggle Button**: Allow users to manually switch between light and dark themes.
- **⚙️ Configuration-Driven Panels**: Build panels using global configuration to improve modularity and customization.
- **➕ Add E2E Tests**: Implement more comprehensive end-to-end tests using Playwright to improve app reliability.
- **🛠️ Extract Common Components**: Extract shared components and logic used in grid and list views to reduce redundancy.

## 📁 Directory Structure

- `src/components` - Reusable UI components like buttons, menus, etc.
- `src/layouts` - Page layouts used to compose different screens in the app.
- `src/state` - Manages global state using Context and custom hooks.
- `__tests__/e2e` - Contains E2E tests to verify app functionality.

## 🤝 Contribution Guidelines

We welcome contributions! To contribute:

1. 🍴 Fork the repository.
2. Create a feature branch:
   ```sh
   git checkout -b feature/your-feature
   ```
3. 💾 Commit your changes and push the branch.
4. Create a pull request for review.

Please make sure to add/update relevant tests for any new features.

## 📜 License

This project is licensed under the MIT License.
