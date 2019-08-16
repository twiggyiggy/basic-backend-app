**16/8/19 2:43**
1. create route auth/allUsers in auth.js
```js
router.get('/allUsers', (req, res, next) => {
  res.json(User.find())
})
```
2. update 'signup' route to accomodate for email (add email to object decomposition)