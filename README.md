# Movie Finder Challenge

Welcome to the **Movie Finder Challenge**! This exercise is designed to test your skills in React development, API integration, state management, and UI design. Follow the instructions below to get started.

---

## 🚀 Challenge Overview

Your task is to build a **Movie Finder Application** that allows users to search for movies using the [OMDb API](http://www.omdbapi.com/). You are expected to:

- Integrate the OMDb API to fetch and display movie data.
- Build a responsive and visually appealing UI.
- Implement state management effectively using React Context or Redux.
- Optimize the app with sorting, filtering, and caching.

---

## 🔑 API Instructions

### API Endpoint
The OMDb API base URL is:
```
https://www.omdbapi.com/
```

### Getting an API Key
1. Visit [OMDb API](http://www.omdbapi.com/apikey.aspx).
2. Sign up to get your free API key.
3. Use your API key for all requests.

### Example Request
To search for movies by title:
```
https://www.omdbapi.com/?s=Inception&apikey=YOUR_API_KEY
```

### Example Response
```json
{
  "Search": [
    {
      "Title": "Inception",
      "Year": "2010",
      "imdbID": "tt1375666",
      "Type": "movie",
      "Poster": "https://example.com/poster.jpg"
    }
  ],
  "totalResults": "1",
  "Response": "True"
}
```

---

## 🎯 Requirements

### Core Requirements
1. **Search Functionality:** Allow users to search for movies by title.
2. **Movie Grid:** Display search results as a grid of movie cards showing:
   - Title
   - Poster
   - Release Year
3. **Modal View:** Show additional movie details (e.g., genre, director, plot) when a movie card is clicked.
4. **State Management:** Use React Context API or Redux to manage state for search results and selected movie details.

### Bonus Features (Optional)
- **Sorting:** Allow users to sort movies by release year (ascending/descending).
- **Filtering:** Provide a filter to show movies by decade (e.g., 1980s, 1990s).
- **Caching:** Implement client-side caching for previously searched titles.
- **Infinite Scrolling or Pagination:** Improve UX by handling large result sets efficiently.
- **Unit Tests:** Add basic unit tests for components or utility functions.

---

## 📝 Submission Instructions

1. **Repository Structure:** Your project should follow this basic structure:
   ```plaintext
   movie-finder/
   ├── src/
   │   ├── components/
   │   ├── styles/
   │   ├── App.js
   │   ├── index.js
   ├── public/
   │   ├── index.html
   ├── README.md
   ├── package.json
   ├── .env
   └── .gitignore
   ```

2. **Code Submission:**
   - Fork this repository.
   - Push your changes to your fork.
   - Create a pull request to the original repository.

3. **Include the Following:**
   - A `README.md` file explaining:
     - How to set up and run the project.
     - The features implemented and any decisions made.
     - Any additional libraries or tools used.
   - A `.env.example` file (no API keys included).

4. **Deployment (Optional):** Host your project on a free service like Netlify or Vercel and include the live link in your submission.

---

## 📚 Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [OMDb API Documentation](https://www.omdbapi.com/)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Good luck, and happy coding! 🚀
