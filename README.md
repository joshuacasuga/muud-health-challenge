# Muud Health Challenge

This mobile app is a submission for the Muud Health frontend engineering challenge. It provides a basic journal and contact manager with user authentication. The application is designed using **React Native** with **Expo**, and includes unit tests with **Jest** and **React Native Testing Library**.

**NOTICE**: All environment variables necessary for local setup are included in the .env file. I understand that this is against normal best practices, but I left them there for the sake of local testing.

---

## Features

- User Registration & Login with basic JWT handling
- View and Add Contacts
- View and Add Journal Entries
- Navigation between screens
- Unit tests for all major screens

---

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/muud-health-challenge.git
cd muud-health-challenge
```

### 2. Install Node Modules
```bash
npm install OR yarn install
```

### 3. Install Expo CLI
```bash
npm install -g expo-cli
```

### 4. Run the App Locally
Connect to Supabase PostgreSQL database
```bash
cd backend
node index.js
```
Start the Expo development server
```bash
cd frontend
npx expo start
```
This will launch the Metro bundler.

Press "w" to run on your browser.

---
### Running Unit Tests
This project uses **Jest** for unit testing.
```bash
cd frontend
npx jest
```
---
### Technologies Used
| Category             | Library / Framework                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| **Mobile Framework** | [React Native](https://reactnative.dev)                                                                  |
| **Development Tool** | [Expo](https://expo.dev)                                                                                 |
| **Navigation**       | [React Navigation](https://reactnavigation.org)                                                          |
| **API Requests**     | [Axios](https://axios-http.com)                                                                          |
| **Testing**          | [Jest](https://jestjs.io)                                                                                |
|                      | [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro)      |
| **Authentication**   | [JWT](https://jwt.io/)
| **Async Storage**    | [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) |
| **Alerts**           | `react-native`'s built-in `Alert` module                                                                 |
| **Mocking**          | `jest.mock()` and `jest.spyOn()`                                                                         |

---
### Assumptions Made
- JWT tokens are stored in AsyncStorage to simulate authentication
- Navigation assumes a standard flow: Register -> Login -> Home Screen -> Journal/Contacts
- UI/UX is simplified with no mockups or design specifications given
- App simulates basic CRUD behavior
- Components were written for clarity and testability, rather than optimization or production-readiness
