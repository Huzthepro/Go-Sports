<a name="readme-top"></a>
<div id="header" align="center">
  <img src="/frontend/src/assets/site-template.png" width="800"/>
  
  # Go Team Go Sports
 

</div>
<img src="/frontend/src/assets/tactic.png" width="200" align="right" />

<div id="header" align="center">
  
### → → [Here is the link](https://go-team-go-sports.netlify.app/) ← ← 
 
</div>
<div align="center">

  ## Easy way to build your team
  
<br />
  <p align="center">
    Plan your sport game squads with some style!
  </p>
</div>




<!-- ABOUT THE PROJECT -->
## About The Project

Simple app that let you -add players, -give score for players, -put them on field.
So you can share latest squat with your friends before starting the game

Features:
* Up and running its own server
* Create user option
* Login and get Token (User authentication)
* Server side CRUD operations with players.
* React on client side

<!-- DOWNLOAD -->
## DOWNLOAD

First clone the repository.

### BACKEND
After cloning it in your computer, you need to open -backend- folder in terminal and type

  ```sh
  npm init
  ```
  than
  
   ```sh
  npm install
  ```
This will install node modelues for backend. Then you need to add .env file in your backend.

.env file should have 3 value:
 ```env
   PORT = 4000
   ```
   
 ```env
   MONGO_URI = mongodb+srv://<YourUserName>:<YourUserPassword>@<MongoDBConfiguration>
   ```
   
 ```env
   JWT_SECRET = yoursecret
   ```
  
  You should get MONGO_URI from your MongoDB cloud atlass
  
  After that 
  
   ```sh
  npm start
  ```
and your server will start running 🎉🎉



### FRONTEND

After cloning it in your computer, you need to open -frontend- folder in terminal and type

  ```sh
  npm init
  ```
  than
  
   ```sh
  npm install
  ```
This will install node modelues for frontend.

Then be sure your requests are going to your server in 

- frontend
    - src
        - helpers
            -Fetcher.js
          
 ```js
   // this.apiUrl = "https://gosports.onrender.com/api/";
    this.apiUrl = "http://localhost:4000/api/";
   ```
   
Local host is not commended


  After that 
  
   ```sh
  npm start
  ```
and your app will start running 🎉🎉



<h1 align="right"><a href="#readme-top">⇧</a></h1>



<!-- ROADMAP -->
## Roadmap

- [x] Add Login/Register
- [x] Add more customization for players
- [ ] Add dark/light mode
- [ ] Add some games user can play
- [ ] Multi-language Support
    - [ ] Dutch
    - [ ] French

<h1 align="right"><a href="#readme-top">⇧</a></h1>



