export const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://cafe-mern.onrender.com';
