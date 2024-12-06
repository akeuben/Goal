# GOAL
Take control of your gaming journey with our all-in-one tracking platform! 
Whether you're a casual player or a completionist, our site helps you organize 
your progress, set goals, and celebrate your achievements. From tracking your 
completed games and customizing completion categories to reviewing games and 
sharing your gaming profile with friends, we make it easy to stay on top of 
your backlog. Earn points for unlocking achievements, create personalized 
to-do lists, and explore what others are playing—all designed to make gaming 
even more rewarding.

## Dependencies
The frontend requiures the following dependencies to run:
- `nodejs` version `20` or later
The backend requiures the following dependencies to run:
- `OpenJDK` version `21` or later
- `maven` version ``

## Setup/Usage
### Frontend
To set up the frontend, navigate to the frontend directory.
```
cd frontend
```
Then install requiured nodejs packages:
```
npm i
```
Then start the nextjs server:
```
npm run dev
```

### backend
To set up the backend, navigate to the backend directory.
```
cd backend
```
Then run the backend server with
```
mvn package && mvn exec:java
```

> [!IMPORTANT]
> Before running the backend, the database must be set up. See [Database Setup](#database-setup)

## Repository Layout
The repository has two main directories, `frontend` which holds 
the code for the web-based frontend, and `backend` which holds
the code for the backend java server.

### Frontend
The `frontend/src` directory contains the following subdirectories:

| Directory     |                            Description                            |
|---------------|-------------------------------------------------------------------|
| `api`         | Contains the funtionality for communicating with the backend      |
| `app`         | Contains the pages for the website                                |
| `components`  | Contains reusable components used on multiple pages               |
| `lib`         | Helper functionality for various pages and components             |
| `types`       | Type information for API requests, as well as internal types      |

### Backend
The `backend` is a traditional maven project with the following packages:

| Package                   |                       Description                                             |
|---------------------------|-------------------------------------------------------------------------------|
| `org.example.requests`    | Contains the API requests that can be made to the backend server              |
| `org.example.sql`         | Contains helpers to fetch and update information from/to the database         |
| `org.example`             | Contains the main class, which is responsible for registering each API route  |

## Database Setup
To set up the database, make sure you have an instance of MySQL running.
The `root` user must have the password set to `root`, and allow connections
from the address of the frontend server.

To set up the database and required tables, the `backend/sql/databaseCreation.sql`
provides the necessary sql statements to set everything up.
