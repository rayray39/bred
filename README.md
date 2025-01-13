# Bred 💸🍞  
Bred is the ultimate financial management platform for your organization, designed to streamline expense tracking across projects, visualize spending patterns with dynamic charts, and provide actionable insights to make data-driven decisions effortlessly.  

Bred was built using ReactJS, Express.js, [React Bootstrap](https://react-bootstrap.netlify.app/), [Material UI](https://mui.com/?srsltid=AfmBOorUkyfvfqBEhL0ITYdPJ3b4o98voV-nNfbKw9CjwKkZ0UQLnePK), and [Chart.js](https://www.chartjs.org/) (a simple yet flexible JavaScript charting library for the modern web).  

Click [here]() to view the **User Guide**. *Not implemented yet :)  

## Motivation  
Bred began as a side project to explore ReactJS, evolving into a dynamic blend of ReactJS and Express.js as new features and data-handling requirements shaped its development. Additionally, I wanted to explore the use of various CSS frameworks to create consistent, appealing, and responsive user interfaces.  
Chart.js was leveraged to create dynamic and interactive charts for Bred, combining its simplicity with powerful built-in chart types such as scatter plots, line charts, and pie charts, ensuring seamless data visualization.  

## Learning Outcomes  
1. Frontend Development
   - Learned how to effectively design and style user interfaces using Material-UI and React Bootstrap components for a professional and responsive layout.
   - Created dynamic and interactive charts, such as pie charts, using Chart.js, and customized chart options like tooltips, legends, and resizing for better visualization.
   - Managed state effectively for real-time updates to form fields, modals, and data visualizations using useState and useEffect.
   - Handled form submission and validation, including dynamic data rendering.
   - Handled conditional rendering and dynamic updates in DOM.

2. Backend Development
   - RESTful API design.
   - Designed and implemented endpoints to dynamically fetch and filter data based on parameters like type (e.g., category or module), ensuring flexibility for future expansion.
   - Built efficient server-side logic, leveraging clean and maintanable code practices.
   - Integrated error-handling mechanisms for missing or invalid query parameters, ensuring robustness and user-friendly responses.

3. Integration
   - Implemented parallel API calls using Promise.all in React to fetch and render data from multiple endpoints simultaneously, optimizing performance.
   - Managed asynchronous data flows between the frontend and backend, ensuring accurate and timely updates to charts and tables.
   - Extracted common logic, such as chart configurations, into reusable variables to avoid duplication and improve maintainability across multiple components.
   - Built components and logic in a modular way, isolating Bred into separate components while maintaining a consistent theme and functionality.

## Getting Started  
1. Install dependencies
   - open up a terminal in the project directory.
   - run `npm install` to install all required project dependencies. These include packages like `react-bootstrap` and `@mui-material`.

2. Start the backend
   - run `npm install` (if not already done) to install all backend dependencies.
   - run `node src/server.cjs` to start the Express server, the API will run at `http://localhost:5000`.

3. Start the frontend
   - open another terminal in the project directory.
   - run `npm run dev` to start the developer server, the application will run at `http://localhost:5137`.  

---

This project was bootstrapped with Vite and React, leveraging Vite's blazing-fast build process and React's robust library for building dynamic and interactive user interfaces.
### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
