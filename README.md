# Sprint 5 – Signup Form, Part 1

It's time to finally connect all the dots we've worked on so far and create a backend which can persist data which is passed to it from a frontend.

The task is to build a signup form which allows users to register an account by providing a username, email address, and password. You will create the backend in Express with MongoDB as a database, and the frontend in React.

Later, for part 2, you'll implement a login form which will allow the user to authenticate against your user table and "sign in". Take a note of how to store passwords properly below, and don't be afraid to ask questions!

## How to complete this assignment

This assignment can be simply broken down into two main parts; the frontend and backend. For the main part of the assignment, each part can be quite minimal - just one endpoint on the backend, and one page on the frontend. Here's some tips to get you started:

### Frontend

Build a page in React with a form with at least 3 elements; username, email, and password. Build the inputs as controlled inputs as we have before, where they update the state with the values from the inputs. When the user submits the form, it should use `fetch` to send a POST request to the server with all the fields.

The /frontend folder contains a copy of the react-starter project to get started with. As always, to run, cd into the folder, run `npm install` and then `npm start`.

### Backend

In the /backend folder of this assignment you'll find a basic express server setup which you can use as a starting point, if you'd like. To get started, as usual, cd into the backend folder and run `npm install` and then `npm start` to start the server listening on http://localhost:8080. If you visit that url, you'll see an example of an encrypted password (more on that in the security section below).

To start with in the API, set up a mongo model for a User with the same attributes as the form will send; username, email, and password.

Then, build one endpoint; `POST /users`. In the endpoint, you should get the body from the request, and pass it into mongo to save the record. Try to piece together examples from the lectures to get it to work.

### Error handling

Don't worry too much about error handling to begin with - just start with getting a complete form to submit and persist in the database. Treat error handling as a stretch goal (more on this at the bottom!).

### Security

Storing a password in the database in plain text is a massive security flaw. Anyone with access to the database can see everyone's password. This is no good!

The only really secure way to handle passwords is not to store them at all, but since that's not an option, a common way to handle storing passwords is to encrypt the password string, and then store the encrypted string in the database. Instead of decrypting the password later, you just encrypt the password the user enters when trying to log in later and compare the two encrypted strings. This way, you can only guess the password through brute force instead of being able to just decrypt it and see what its original string was.

Security and encryption is a huge, and very complicated topic and is beyond the scope of this bootcamp. In backend/server.js you'll find an example of using [bcrypt](https://www.npmjs.com/package/bcrypt-nodejs) to encrypt a password string and securely compare it to another string. This is a decent start which you can use in your endpoint without needing to read up on encryption ;)

### :books: Reading List

* [Mongoose Docs](http://mongoosejs.com/docs/index.html)
* [Using promises in Mongoose](http://erikaybar.name/using-es6-promises-with-mongoosejs-queries/)
* [Express](https://expressjs.com/)
* [Handling GET and POST endpoints in express](https://codeforgeek.com/2014/09/handle-get-post-request-express-4/)

---

### :sos: How to get help
Learning how to think as a web developer is learning how to be an expert in problem solving. So whenever you get stuck start with step 1 and continue until problem solved.

1. Google! In English, type in the error message if there is one, search within the language you're using (ie CSS, JavaScript etc).
2. Ask your code buddies in your Company.
3. Ask your fellow students in Slack.
4. Ask Damien. Please note: we are part of a sharing community - share the answer with your fellows.

---

### :boom: Success!

After completing this assignment you should have experienced what's involved with creating a full-stack application which persists user input. You should be starting to get more comfortable with express and mongo, and should have a bit of an idea about data security and encryption.

---

### :runner: Stretch Goals

Done with the main task? Here's some ideas for things to continue with:

1. Add error handling in the frontend:
  * Make all 3 fields required before the user can submit the form
  * Add restrictions to the password to require a minimum length, or numbers and letters, etc.
1. Add error handling to the backend following the same rules, so that only "good" data is persisted.
1. Make the form look pretty and be responsive.
1. Investigate how to add validations through mongoose, to ensure data in your database is always good.
