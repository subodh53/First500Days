# First500Days

A minimal full-stack application that analyzes exported WhatsApp group chat and provides insights.

This project was built as part of a **MERN Fullstack Developer Assessment** and focuses on correctness, clean architecture, and maintanability rather than UI complexity.

## Features

- Upload an exportet WhatsApp group chat in `.txt` format.
- Analyze Chat data to compute
    - **Number of active users per day**
    - **Number of new users per day**
    - **Users active for at least 4 days in the last 7 days**
- Visualize day-wise activity using a bar chart
- Minimal React frontend (Without any CSS frameworks)

---

## Tech Stack


### Backend
- Node.js
- Express.js
- Day.js
- Multer (file upload)
- No database (in-memory procesing of files)

### Frontend
- React (Vite)
- Chart.js + react-chartjs-2
- Plain CSS

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

---

## Backend Setup

1. Navigate to the backend directory
   ```bash
   cd backend

2. Install dependencies
   ```bash
   npm install

3. Start the backend server
   ```bash
   npm run dev

4. The backend will be running at
   ```bash
   http://localhost:5000


## Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd frontend

2. Install dependencies
   ```bash
   npm install

3. Start the frontend server
   ```bash
   npm run dev

4. The frontend will be running at
   ```bash
   http://localhost:5173