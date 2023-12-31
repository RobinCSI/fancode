# Movie List and Search App

This Movie List and Search App lists movies with their details and also allows users to search for movie titles based on keywords. It fetches movie data from an external API (e.g., The Movie Database - TMDb) and displays the search results in a user-friendly interface.

## Features

- **Nested Scrollable Movie List**: Display year-wise movies (max. 20) in a scrollable list with nested scrollable details for each movie.
- **Search Movies**: Users can enter keywords in the search bar to find movies matching their input.
- **Debouncing**: Implements debouncing to avoid frequent API calls while the user is typing.
- **Genre Selection**: Provides genre-based filtering to refine search results.

## Technologies Used

- **React Native**: Framework for building cross-platform mobile apps.
- **JavaScript**: Programming languages used for development.
- **API Integration**: Fetches movie data from an external API (e.g., TMDb).
- **Context API**: Manages global state for selected genres, movies, etc.
- **Debouncing**: Implemented to optimize search functionality.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- Expo CLI or React Native CLI
- API Key from The Movie Database (TMDb) (if applicable)

### Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set the API keys
4. Run the app: `npm start`

## Configuration

- Add appropriate TMDb API keys in the 3 files- App.js, Main.js and MovieTile.js (if required).

## Folder Structure

- `src/`: Contains the source code of the application.
  - `components/`: Reusable UI components.
  - `context/`: Global state management context files.

