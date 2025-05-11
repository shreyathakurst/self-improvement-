# Self Improvement App

## Overview

The **Self Improvement App** is designed to help users track their improvement behaviors and tasks (to-dos). Users can create, manage, and delete behaviors and improvement items. The app displays the 5 behaviors with the most improvement items on the homepage. This allows users to monitor and improve various aspects of their personal growth. 

### Key Features:
- Display top 5 behaviors with the most improvement items on the homepage.
- Allow users to create, manage, and delete behaviors.
- Manage improvement items (to-dos) associated with each behavior.
- Users can register and log in to view and manage their own data.
- Each user’s behaviors and improvement items are private to them.

## Frontend

### Technologies Used:
- **Vite** for fast build and development.
- **Tailwind CSS** for styling the app.
  
### Pages:
1. **Homepage**:
   - Displays the 5 behaviors with the most improvement items.
   - Allows users to create new behaviors.
   - Users can delete behaviors along with their associated improvement items.
   - Users can select a behavior to view and manage its associated improvement items.

2. **Behavior Details Page**:
   - Lists all improvement items (to-dos) for a selected behavior.
   - Users can add, edit, and delete items.
   - Each behavior has a unique list of improvement items.

### Design:
- Use the provided screenshots as inspiration for layout and design.
- Implement your own design flavor, keeping the user experience in mind.

## Backend

### Core APIs:

1. **Behavior APIs**:
   - `GET /api/behaviors/top`: Fetch the top 5 behaviors with the most improvement items for the homepage.
   - `POST /api/behaviors`: Add a new behavior.
   - `DELETE /api/behaviors/:id`: Delete an existing behavior, including its associated improvement items.

2. **Improvement Item (To-do) APIs**:
   - `POST /api/behaviors/:id/items`: Add a new to-do under a behavior.
   - `PUT /api/items/:id`: Edit an existing to-do.
   - `DELETE /api/items/:id`: Delete an improvement item.

3. **User Management APIs**:
   - `POST /api/auth/register`: Register a new user.
   - `POST /api/auth/login`: Log in an existing user.

### Data Privacy:
- Each user's data is private, and behaviors and improvement items are only accessible to the logged-in user.

### Visit my website at :

