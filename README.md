# web-programming-

Backend REST API built with **Node.js, Express and MongoDB (Atlas)**, following the freeCodeCamp
*Intro to Backend Web Development – Node.js & Express* tutorial. It uses a **model → controller → route** structure
and exposes user auth APIs plus full **CRUD** for posts.

## Project structure

```
src/
├── index.js                 # entry point: loads .env, connects DB, starts server
├── app.js                   # express app + route mounting
├── constants.js             # DB_NAME
├── config/database.js       # mongoose connection to MongoDB Atlas
├── models/
│   ├── user.model.js        # User (bcrypt-hashed password)
│   └── post.model.js        # Post (name, description, age)
├── controllers/
│   ├── user.controller.js   # register / login / logout
│   └── post.controller.js   # create / read / update / delete
└── routes/
    ├── user.route.js
    └── post.route.js
postman/
└── web-programming.postman_collection.json   # import into Postman desktop
```

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in your MongoDB Atlas connection string:
   ```
   PORT=4000
   MONGODB_URI=mongodb+srv://<username>:<password>@shobhit.rk28e2q.mongodb.net
   ```
   In Atlas, make sure your IP is allowed under **Network Access**.
3. `npm run dev` (nodemon) or `npm start`

## API endpoints  (base: `http://localhost:4000/api/v1`)

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/users/register`    | Register a user        |
| POST   | `/users/login`       | Log in                 |
| POST   | `/users/logout`      | Log out                |
| POST   | `/posts/create`      | **Create** a post      |
| GET    | `/posts/getPosts`    | **Read** all posts     |
| GET    | `/posts/:id`         | **Read** one post      |
| PATCH  | `/posts/:id`         | **Update** a post      |
| DELETE | `/posts/:id`         | **Delete** a post      |

Example post body:
```json
{ "name": "My first post", "description": "Created from Postman", "age": 20 }
```

## Testing with Postman

1. Open the Postman desktop app → **Import** → select `postman/web-programming.postman_collection.json`.
2. Start the server (`npm run dev`).
3. Run the requests in order (Register → Login → Logout → Create → Get All → Get By Id → Update → Delete),
   or click **Run collection**. *Create Post* saves the new post's id into `{{postId}}` automatically,
   and every request has tests that check the status code.
4. Check the `users` and `posts` collections in the `web_programming` database in MongoDB Atlas.

## Author

Shobhit — GitHub: [@CRYPT-hack](https://github.com/CRYPT-hack)
