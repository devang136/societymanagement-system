@echo off
start cmd /k "cd backend && npm install && npm start"
start cmd /k "cd frontend && npm install && npm run dev"
