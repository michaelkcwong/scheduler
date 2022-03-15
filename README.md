# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Features

- Students can create, edit and delete appointments
- When creating new appointments, students can enter any name and choose interviews from the set list

## Scheduler Images

Main Page

!["Screenshot of main page"]https://github.com/michaelkcwong/scheduler/blob/master/public/screenshots/Main.png

Create New Appointment

!["Screenshot of adding new appointment"]https://github.com/michaelkcwong/scheduler/blob/master/public/screenshots/Addsc.png

Edit Existing Appointment

!["Screenshot of editing existing appointment"]https://github.com/michaelkcwong/scheduler/blob/master/public/screenshots/Editsc.png

Delete Existing Appointment
!["Screenshot of deleting appointment"]https://github.com/michaelkcwong/scheduler/blob/master/public/screenshots/Delete.png


## Setup

- Install dependencies with `npm install`.
- Fork and Clone [Scheduler API](https://github.com/lighthouse-labs/scheduler-api) server
- Run both client and server at the same time.

## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
