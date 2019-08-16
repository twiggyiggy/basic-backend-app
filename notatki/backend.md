CREATING A BACKEND WITH EXPRESS:

1. generate project with express-generator --no-view --git [bozo]
2. enter [bozo] directory and do git init
3. copy .gitignore from cheet-cheet repo @ (tools/git/gitignore)
4. npm install in [bozo], also set script for nodemon in package.json
5. initialize Eslint (mi sie nie udalo)
6. npm install mongoose
7. require mongoose in app.js (ch-ch@m2/express-apps/mongooseconnect.js) -> mongoose.connect()
8. add express errors to app.js (ch-ch@m3/express-api-errors/app.js)
9. remove default users route (users.js from /routes/, references from app.js)

10. create route routes/api.js
11. in api.js import express and create router
12. in api.js create four ENDPOINTS REQUIRED BY REST CONVENTIONS (get, post, put, delete)
    with commented out planned behavior and appropriate paths

13. mkdir /models/
14. create models/[Name].js for a data model named [name] (bozo: image? set of images? user?)
15. get model example from ch-ch@m2/mongoose-models/(event and attendees)
16. remove ObjectID
17. rename schema
18. rename const of the model (Event --> image?user?set of images?)
19. set module.export to the const from 18.
20. customize schema  (required, unique, category enums)
21. require model in api.js


22. 
    in api.js create logic for routes (async try catch(error))
23. 
    in api.js in route try block create variable to be passed in response
24. 
    in api.js in route create response with json of the variable (res.status(200).json({response__data}))
        for a list of items -- Model.find()
        for a new item -- Model.create(newItem) where newItem = req.body (data received in request)
        for updating an existing item 
            - use req.params to retrieve item id from url
            - use Model.findByIdAndUpdate(id, {Object})
        for deleting an existing item
            Model.findByIdAndRemove(id)
24.(9) 
    in api.js remember to export router variable to be available for import in app.js
    module.exports = router;

----- REQUIRE api.js FROM app.js WITH A const apiRouter -------

25. use Postman to test routes
26. create new collection of routes +New collection <^
27. create new request/route 
    - get list of all items
        localhost:3000/api/apps
                      ^ '/' comes from indexRouter in index.js
                        ^ 'api' comes from app.use( ) Express statement in app.js
                            ^ 'apps' comes from api.js via apiRouter call in app.js
    - create new item
        localhost:3000/api/apps/new
                      ^ '/' comes from indexRouter in index.js
                        ^ 'api' comes from app.use( ) Express statement in app.js
                            ^ 'apps/new' comes from api.js via apiRouter call in app.js

        when creating a new item you need to provide a request body which follows
        the standard set out in the Schema created for our Model through mongoose
        in Application.js
    - update existing item
        localhost:3000/api/apps/:id/update
                            ^ 'apps/new' comes from api.js via apiRouter call in app.js
                                 ^ this id is required in the request, either
                                   in Postman or in url (this route is defined in api.js)
        update uses PUT and so needs a body {} Object
    - remove existing item 
        localhost:3000/api/apps/:id/update
                            ^ 'apps/new' comes from api.js via apiRouter call in app.js
                                 ^ this id is required in the request, either
                                   in Postman or in url (this route is defined in api.js)
        update uses DELETE and so does not need a body
        

