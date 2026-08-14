# Bangalore Pincode Explorer

A simple full-stack app to look up the area name for a Bangalore pincode.

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Data:** Static JSON dataset of ~50 Bangalore pincodes → area names

## Features

- Enter a 6-digit pincode and get the corresponding area name
- Input validation (6-digit check) and clear error messages (not found, invalid format)
- Recent searches list
- Browsable list of all pincodes in the dataset

## Project Structure

```
pincode-explorer/
├── backend/
│   ├── data/bangalorePincodes.json   # pincode → area dataset
│   ├── server.js                     # Express API
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx                   # main UI
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint               | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/api/pincode/:code`   | Returns `{ pincode, area }` for a valid pincode |
| GET    | `/api/pincodes`        | Returns the full pincode → area list |
| GET    | `/api/health`          | Health check                         |

## Setup — Run Locally

### 1. Backend

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000`.

### 2. Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

By default the frontend calls the backend at `http://localhost:5000`. To point it elsewhere (e.g. after deploying the backend), create a `.env` file in `frontend/`:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

## Deployment (for the live demo link)

1. **Backend → Render/Railway:** Push `backend/` to a GitHub repo, create a new Web Service on Render, set the root directory to `backend`, build command `npm install`, start command `npm start`.
2. **Frontend → Vercel/Netlify:** Push `frontend/` (or the whole repo with `frontend` as the root), set the environment variable `VITE_API_URL` to your deployed backend URL, deploy.

## Screenshot

<img width="1366" height="768" alt="Screenshot (451)" src="https://github.com/user-attachments/assets/72c6fb85-e116-4290-86a9-45ea0932e56d" />


## Notes

- Dataset currently covers ~50 well-known Bangalore pincodes (Koramangala, Indiranagar, Whitefield, HSR Layout, Electronic City, etc.) — easy to extend by adding entries to `backend/data/bangalorePincodes.json`.
