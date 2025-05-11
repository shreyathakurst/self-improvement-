Behavior Tracker Application
Overview
This application allows users to create, manage, and track behaviors and their associated improvement items (to-dos). The homepage displays the top 5 behaviors with the most improvement items, and users can manage their own behaviors and items after registering and logging in. The application is built with a modern frontend and backend, ensuring a seamless user experience with user-specific data handling.

Note: This assignment is time-consuming and requires significant effort. Selection depends on the quality and completeness of submissions, as only a small number of candidates will be recruited. Please consider if you would like to proceed with this assignment.

Application Purpose

Primary Goal: Display the 5 behaviors with the most improvement items on the homepage.
Functionality: Allow users to create, manage, and delete behaviors and their associated improvement items dynamically.
User-Specific: Ensure users can only view and manage their own data after logging in.

Features
Frontend Requirements
Homepage

Displays the top 5 behaviors with the most improvement items.
Option to create new behaviors.
Ability to delete behaviors and their associated improvement items.
Select a behavior to view and manage its improvement items.

Behavior Details Page

Shows a list of improvement items (to-dos) for the selected behavior.
Text box to add new improvement items.
Edit or delete existing improvement items.
Each behavior maintains a separate list of improvement items.

User-Specific Data

Users must register and log in to access the application.
Data (behaviors and improvement items) is private to the logged-in user.

Dynamic Behaviors

Behaviors are user-defined and can be created, updated, or deleted dynamically.

Backend Requirements
Core APIs

Fetch Top 5 Behaviors: API to retrieve the top 5 behaviors with the most improvement items for the homepage.
Behavior Management:
Add a new behavior.
Delete an existing behavior (including associated improvement items).


Improvement Item Management:
Add a new to-do item for a behavior.
Edit an existing to-do item.
Delete a to-do item.


User Management

User registration and login functionality.
Ensure behaviors and improvement items are tied to the logged-in user.

Tech Stack

Frontend:
Vite: For fast development and optimized builds.
React: For building the user interface with reusable components.
Tailwind CSS: For styling the application with a utility-first approach.


Backend:
Node.js, Mongoose, Express


Deployment:
Hosted on Netlify: 

Usage

Register or log in to the application.
On the homepage, view the top 5 behaviors with the most improvement items.
Create a new behavior or select an existing one to manage its improvement items.
Add, edit, or delete improvement items on the Behavior Details page.
Delete behaviors as needed.
