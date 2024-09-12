# DAT250-Lab3 Report

## Overview
Objective of assignment: Prepare a simple GUI for the poll REST API using an SPA Framework/Library.

## Step 1: Set up Node project
Using nvm for windows, I updated my already installed Node version to the latest one. Then, I set up an empty React project using create-react-app.

## Step 2: Develop components
I created two components:
- CreatePoll - used for creating a new poll,
- VotePoll - used for casting a vote for an existing poll.

As I have some previous experience with React, I implemented those components using fetch functions from the beginning - without using the stub-data.
I used react-router-dom in order to switch between those components by using a proper url. I also added a navbar to make that process easier.
I also enabled CORS on the server side by adding @CrossOrigin annotation to my controllers.

## Step 3: Deployment
After reaching a satisfying point in the development process of my SPA, I performed "npm run build", then copied files from "/build" directory into "/resources/static" directory of my Spring Boot Server.

### Technical difficulties
During deployment, I encountered a problem caused by react-router-dom - the home page was loading correctly, but when trying to access the CreatePoll and VotePoll components, I recieved http status 404 from the server.
My solution was to create a WebMvcConig class that forwards all the requests (other than /api requests) to the index.html file.
After that, the app behaviour was as expected.
