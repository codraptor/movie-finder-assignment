# Movie Finder App

This is a React-based Movie Finder application that allows users to search, filter, and view detailed information about movies. The app fetches movie data from the OMDb API and displays it in a grid format. Users can click on any movie card to view additional details in a modal overlay.

## Features

- **Search Movies**: Search movies by title using the search bar.
- **Filter by Decade**: Filter movies by decade (1980s, 1990s, 2000s, 2010s, 2020s).
- **Sort by Year**: Sort movies in ascending or descending order by release year.
- **Modal Overlay**: View additional details about a movie (Genre, Director, Plot, Year) in a modal when clicking on a movie card.
- **Load More Movies**: Click "Load More" to fetch more movies from the OMDb API.
- **Responsive Design**: The app is designed to be responsive and should work well on both desktop and mobile devices.

## Setup and Running the Project

Follow these steps to set up and run the project locally:

### 1. Clone the repository:

git clone https://github.com/shruti27jauhari/movie-finder-assignment.git

2. Navigate to the project directory:

cd movie-finder-assignment

3. Install the dependencies:
   Ensure that you have Node.js installed on your system. Then, run the following command to install all required packages:

npm install

4. Set up OMDb API Key:

Create a .env file in the root directory of the project and add your OMDb API key like this:

REACT_APP_OMDB_API_KEY=your-api-key

You can obtain an API key by signing up at OMDb API.

5. Start the application:
   Run the following command to start the development server:

npm start
This will start the app on http://localhost:3000.

Libraries and Tools Used
React: The core framework used to build the app.
Styled-components: For styling the components using tagged template literals.
OMDb API: For fetching movie data based on the search query.
React Hooks: For managing state and lifecycle events in functional components.
keyframes: For adding simple animations (like spinning for the loading indicator).
React Router (optional, if applicable in other use cases).
Decisions Made
Modal Implementation: The modal overlay is triggered when a user clicks on a movie card, displaying detailed information such as Genre, Director, Plot, and Year. This was chosen to keep the user interface clean and minimal.

Styled-components: I used styled-components to handle component-level styling in JavaScript. This allowed for easy styling management and encapsulation, making it easier to modify components without worrying about conflicts with global styles.

Decade and Sorting Filters: The application includes a filter to view movies by decade and an option to sort movies by their release year. This helps users quickly browse movies from specific time periods.

Load More Feature: Instead of fetching all movie data at once, the app allows users to click the "Load More" button to fetch additional movies. This ensures that the app stays responsive and reduces the load time on initial page load.
