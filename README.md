# Blog API Application Project

## Tech Stack

__server:__  Node, Express, MongoDB, Mongoose, JWT

# API FEATURES
- Authentication & Authorization
- Post CRUD operations
- Comment functionality
- System blocking user if inactive for 30 days
- Admin can block a user
- A user can block different users
- A user who block another user cannot see his/her posts
- Last date a post was created
- Check if a user is active or not
- Check last date a user was active
- Changing user award base on number of posts created by the user
- A user can follow and unfollow another user
- Get following and followers count
- Get total profile viewers count
- Get posts created count
- Get blocked counts
- Get all users who views someone's profile
- Admin can unblock a blocked user
- Update password
- Profile photo uploaded
- A user can close his/her account

# EndPoint
- [API Authentication](#API-Authentication)
   
   - [Register a new API client](https://www.github.com/octokatherine)
   - [login](https://www.github.com/octokatherine)
 
- [Users](https://www.github.com/octokatherine)
   
   - [Get my profile](https://www.github.com/octokatherine)
   - [Get all users](https://www.github.com/octokatherine)
   - [View a user profile count](https://www.github.com/octokatherine)
   - [Following a user](https://www.github.com/octokatherine)
   - [#UnFollowing-a-user](https://www.github.com/octokatherine)
   - [Update user password](https://www.github.com/octokatherine)
   - [Update your profile](https://www.github.com/octokatherine)
   - [Block another user](https://www.github.com/octokatherine)
   - [Unblock another user](https://www.github.com/octokatherine)
   - [Admin blocking a user](https://www.github.com/octokatherine)
   - [Admin Unblocking a user](https://www.github.com/octokatherine)
   - [Delete your account](https://www.github.com/octokatherine)
   - [Upload Profile Photo](https://www.github.com/octokatherine)

 # API Authentication
  Some endpoints may require authentication for example. To create a create/delete/update post, you need to register your API client and obtain an access token.
  
  The endpoints that require authentication expect a bearer token sent in the `Authorization header`.

  __Example__:

  `Authorization: Bearer YOUR TOKEN`

  ## Register a new API client
  ```http
  POST /api/v1/users/register
  ```
 The request body needs to be in JSON format.
  
