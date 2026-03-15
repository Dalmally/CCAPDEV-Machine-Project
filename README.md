# The Tech Mod Forum
 
---
 
This website is a web forum built using the following tech stack.
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Templating | Handlebars |
| Database ODM | Mongoose |
 
## Getting Started
 
To run the website on your machine, do the following steps:
 
1. Open a terminal to the root of the project folder
2. Install dependencies by using the following command:
   ```
   npm i
   ```
3. Run the following command to start the server:
   ```
   npm run serve
   ```
 
---
 
The currently logged in user will be **RockyB123**. All posts and comments made by you will be presented as RockyB123 as the author.
 
The current users present in the database are:
 
| Email | Password |
|---|---|
| rocky@email.com | hashedpassword1 |
| circuitwiz@email.com | hashedpassword2 |
| firmwareking@email.com | hashedpassword3 |
 
---
 
## Project Structure
 
```
controller/   - Route handlers and controllers for each view
middleware/   - Contains the middleware for controllers to use
model/        - Contains MongoDB database schemas using Mongoose
public/       - All frontend components
routes/       - Routing definitions
views/        - Contains the main layouts, partials and all Handlebars files
```