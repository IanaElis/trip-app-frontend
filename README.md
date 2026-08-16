# TripApp Frontend

React-based frontend for TripApp, a travel management application that allows users to organize trips, manage itineraries, view locations on an interactive map, and receive notifications.

## Technologies

- React
- JavaScript
- Vite
- React Bootstrap
- Axios
- React Router
- React Leaflet
- Leaflet
- OpenMapTiles
- Google Places API

## Application structure

The frontend is organized into reusable components and pages:

- `components/` – reusable UI components
- `contexts/` – global application and authentication state
- `hooks/` - reusable custom React hook
- `pages/` – application pages
- `routes/` -  application routing and protected route configuration
- `services/` – API communication and application services
- `utils/` – utility functions
- `assets/` – static assets and images

The application communicates with the TripApp backend through REST API.

## Components

The UI is built using reusable React components for trips, itinerary items, authentication, maps, and other application features.

Examples include:

- Trip cards and trip management components
- Itinerary and timeline components
- Authentication forms
- Interactive map components

React Bootstrap is used for the main UI components and responsive layout.

## State / authentication

Authentication state is managed using React Context.

The application uses JWT-based authentication with HTTP-only cookies. Axios is configured to include credentials when communicating with the backend and to handle authentication token refresh when required.

## API communication

Axios is used for communication with the TripApp backend REST API.

API requests are organized through a dedicated Axios configuration and service layer. Authentication credentials are automatically included in requests.

## Routing

React Router is used for client-side navigation.

The application includes routes for:

- Authentication
- User profile
- Trip management
- Trip details
- Itinerary management
- Notifications
- Administration

Protected routes restrict access to authenticated users and, where required, to users with the appropriate role.

## Maps

The application uses React Leaflet and Leaflet to display interactive maps.

OpenMapTiles is used as the map tile provider, the Google Places API provides place search and autocomplete functionality.

Trip and itinerary locations are displayed on the map using their geographic coordinates.

## Testing

## Configuration
The application requires the following environment variables:

| Variable                 | Description                              | Default  |
|--------------------------|------------------------------------------|----------|
| VITE_GOOGLE_PLACES_API_KEY | Google Places API key | -        |

> **Note:** Do not commit credentials, API keys, or other secrets to the repository.
> Use environment variables or a local `.env`/configuration file instead.

## Running locally
### Prerequisites

- Node.js
- npm
- Running TripApp backend

### Installation

Clone the repository and install the dependencies:
```bash
npm install
```

Create a .env file in the project root:
VITE_GOOGLE_PLACES_API_KEY=your_api_key

Start the development server:
```bash
npm run dev
```

The application will be available at the URL displayed by Vite in the terminal.





### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
