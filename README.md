# the-social-network
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Useage](#useage)
  - [Contribute](#contribute)
  - [Test](#test)
  - [Questions](#questions)
  - [License](#license)
  ## Description
  This is a social networking application and it uses the mongoose database. This application runs on the express server for routing. It uses a MVC model. Their are models for Users and Thoughts. A user can join and post their thoughts. A thought can have reactions. 
   
   In the code snippet below, I search all the users, then match to a userId. From there I unpack all the thoughts that belong to that userId.

  ```javascript
  const thought = async (userId) =>
    User.aggregate([
        { $match: { _id: ObjectId(userId) } },
        {
            $unwind: '$thoughts'
        },
        {
            $group: {
                _id: ObjectId(userId)
            }
        }
    ]);
  ```
  You can view the repo here:
  [Github](https://github.com/johnfrom209/the-social-network)

  ## Installation
 Once you clone the repo, you want to run 'npm install' for the dependencies. After that you can run 'npm start' and run the routes via insomnia. 

  ## Useage
  NA 
  ## Contribute
  NA
  ## Test
  NA
  ## Questions
  Github repo: [johnfrom209](https://github.com/johnfrom209)

  [Linkedin](https://www.linkedin.com/in/johnfrom209/)

  ## License
  The license used for this project is MIT. Get more information by checking out the repo.
