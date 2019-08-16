# Bozo

## Description

Bozo is a tool to practise quick-sketching by creating a timed practice session with your own or default images.


## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can use the app to practice gesture drawing
-  **Login:** As a user I can login to the platform so that start a practise session
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Create a custom session** As a user I customise variables in a sketching session
-  **Pause session** As a user I can pause a drawing session
-  **Finish a session** As a user I can finish a session (and return to main)
-  **Skip a photo** As a user I can skip a photo to move on to the next one
-  **Upload photo** As a user I can upload my own photographs to practise with
-  **Edit photo's category** As a user I can edit information about the photo to categorise it properly
-  **View gallery** As a user I can see my gallery of uploaded photos

<br>



## Backlog

User profile:
- see my profile
- edit my profile information
- add a profile picture

Gallery:
- images are sorted by date uploaded
- can add filter: monochrome to uploaded photos


Sketching session:
- user can choose whether to use own photos or default database
- more categories: urban, landscape, animals, objects

Other:
- practice reminder notifications
- keep track of progress
- tutorials - drawing tips


<br>


# Client / Frontend

## Routes
| Path                      | Component            | Permissions | Behaviour                                                    |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                       | SplashPage           | public      | Home page                                                    |
| `/auth/signup`            | SignupPage           | anon only   | Signup form, link to login, navigate to homepage after signup|
| `/auth/login`             | LoginPage            | anon only   | Login form, link to signup, navigate to homepage after login |
| `/auth/logout`            |       n/a            | anon only   | Navigate to homepage after logout, expire session            |
| `/setup`                  | SetupPage            | user only   | Set up practice session via form                             |
| `/practice`               | PracticePage         | user only   | View timed practice slideshow                                |
| `/practice/finished`      | PracticeFinishedPage | user only   | View end-of-session message, used photos                     |
| `/gallery`                | GalleryPage          | user only   | View own uploaded photos + form to upload new ones           |


## Components

- LoginPage

- SplashPage

- SignupPage

- SetupPage

- PracticePage

- PracticeFinishedPage

- Gallery

- EditForm

- Navbar


  

 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Photo Service
  - photo.list()
  - photo.add(id)
  - photo.delete(id)
  - photo.update(id)



<br>


# Server / Backend


## Models

User model

```javascript
{
  username - String // required
  email - String // required & unique
  password - String // required
  photos - [ObjectID]
}
```

Photo model

```javascript
 {
   imgUrl:String,
   creator: ObjectId,
   category: {
     enum: ['hands', 'feet', 'faces', 'figure', 'other']
   },
    created: {
    type: Date,
    default: new Date
  }
 }
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | /auth/profile               | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | /auth/signup                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | /auth/login                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session  |

| POST        | /auth/logout                | (empty)                      | 204            | 400          | Logs out the user                                             |
| GET         | /gallery                    |                              |                | 400          | Show all photos                                               |
| POST        | /gallery/add                | {}                           | 201            | 400          | add and save a new photo                                      |
| PUT         | /gallery/edit/:id           | {imgUrl}                     | 200            | 400          | edit information about photo                                  | ?
| DELETE      | /gallery/delete/:id         | {id}                         | 201            | 400          | delete tournament                                             |


<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/q96H8bHM/bozo) 

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)







