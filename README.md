# Currency Converter Application

## Overview

This project is a Currency Converter Application developed as a final assessment for the JavaScript unit. It showcases the use of JavaScript, HTML, CSS, Express, and Sequelize to create a fully functional web application. The application allows users to convert currencies, view historical exchange rates, and save their favorite currency pairs.

## Features

- **Currency Conversion**: Converts a specified amount from one currency to another based on the latest exchange rates.
- **Historical Exchange Rates**: Displays historical exchange rates for a selected date.
- **Favorite Currency Pairs**: Allows users to save their favorite currency pairs for quick access.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite with Sequelize ORM
- **API**: Free Currency API


## Detailed Description

### HTML

The HTML file (`index.html`) contains the structure of the web application. It includes dropdowns for selecting the base and target currencies, input fields for the amount and date, and buttons for conversion, viewing historical rates, and saving favorite pairs.

### CSS

The CSS file (`styles.css`) styles the web application, providing a user-friendly interface. It ensures that the application is responsive and visually appealing.

### JavaScript

The JavaScript file (`script.js`) handles the functionality of the application:

- **Fetching and displaying currencies**: Uses the Free Currency API to fetch the list of available currencies and populate the dropdowns.
- **Currency conversion**: Performs the currency conversion based on the selected currencies and amount.
- **Viewing historical rates**: Fetches and displays historical exchange rates for the selected date.
- **Saving favorite pairs**: Allows users to save their favorite currency pairs and load them for quick access.

### Express and Sequelize

The backend is built using Express and Sequelize:

- **Express**: Serves the static HTML, CSS, and JavaScript files and provides API endpoints for managing favorite currency pairs.
- **Sequelize**: Interacts with the SQLite database to store and retrieve favorite currency pairs.

### Error Handling

The application includes comprehensive error handling to provide feedback to the user:

- Alerts the user if the API rate limit is reached.
- Validates user inputs and alerts if they are invalid.
- Ensures the selected date for historical rates is before today.

## API Endpoints

- `GET /api/favorites`: Fetches all saved favorite currency pairs.
- `POST /api/favorites`: Saves a new favorite currency pair.

## Running the Application

1. Open the application in your browser.
2. Select the base and target currencies from the dropdowns.
3. Enter the amount to be converted.
4. Click the "Convert" button to see the converted amount.
5. Enter a date and click the "View History" button to see historical exchange rates.
6. Click the "Save as Favorite" button to save the selected currency pair for quick access.

## Conclusion

This Currency Converter Application demonstrates the integration of frontend and backend technologies to create a functional web application. It covers essential aspects such as API consumption, data persistence, and user interaction, providing a comprehensive learning experience.


## Running the Application with Docker

This application can be run using Docker. Follow the steps below to build and run the Docker container.

### Prerequisites

- Ensure you have [Docker](https://www.docker.com/get-started) installed on your machine.
- Make sure to have your API key ready to be added to the `.env` file.

### Step 1: Create a `.env` File

Create a `.env` file in the root of your project directory and add your API key:

```env
CURRENCY_API_KEY=your_api_key_here
```

### Step 2: Build the Docker Image

In your terminal, navigate to the root of your project directory and run the following command to build the Docker image:

```bash
docker-compose build
```

### Step 3: Run the Docker Container

After the image is built, you can run the Docker container with the following command:

```bash
docker-compose up
```

### Step 4: Access the Application

Once the container is running, you can access the application in your web browser at:

```
http://localhost:3000
```

### Step 5: Stopping the Application

To stop the application, press `Ctrl + C` in the terminal where the Docker container is running.

### Additional Notes

- Ensure that your `.dockerignore` file is set up to exclude unnecessary files from the Docker image.
- If you make changes to your application code, you may need to rebuild the Docker image using the `docker-compose build` command again.
