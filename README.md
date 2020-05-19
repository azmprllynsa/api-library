<h2 align="center">Library API</h2>

<p align="center" >
  <a href="https://nodejs.org/">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of Contents

* [Prerequiste](#Prerequiste)
* [Installation](#Installation)
* [Create Environment Variable](#create-environment-variable)
* [Start Development Server](#Start-Development-Server)
* [Postman Collection](#Postman-Collection)
* [API Endpoint](#API-Endpoint)
* [About Project](#About-Project)
* [Contributing](#Contributing)
* [Related Project](#Related-Project)
* [Contact](#Contact)

## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/) - Make sure it's running on the default port.
- Redis - Download and Install [Redis](https://redis.io/)


## Installation
### Clone
```
$ git clone https://github.com/azmprllynsa/api-library.git
$ cd api-library
$ npm install
```

## Create Environment Variable

```
DB_HOST=YOUR_DB_HOST
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_TABLE_NAME
PORT=YOUR_PORT
PORT_REDIS = YOUR_REDIS_PORT // default=6879
SECRET_KEY = YOUR_SECRET_KEY
URL_EMAIL_CONFIRM = YOUR_EMAIL_VALIDATION_PAGE_FRONTEND
EMAIL = YOUR_EMAIL_CONFIRMATION
PASSWORD = YOUR_EMAIL_PASSWORD
```

## Start Development Server
```
$ npm start
```

## Postman Collection
[Click Here](https://www.getpostman.com/collections/fc001183ae45c207af2a)


## API Endpoint
```
### Book Endpoint
| No  | HTTP Method | URI                                 | Operation                                  |
| --- | ----------- | ----------------------------------- | ------------------------------------------ |
| 1   | GET         | /api/v1/book/                       | Get all books data                         |
| 2   | GET         | /api/v1/book/:book_id               | Get book’s data by it’s ID                 |
| 3   | GET         | /api/v1/book/?page=1                | Get book’s data on the 1st page            |
| 4   | GET         | /api/v1/book/?search=book_title     | Search book data by title keyword          |
| 5   | GET         | /api/v1/book/?sortBy=title          | Sort book data by the title                |
| 6   | GET         | /api/v1/book/?sortBy=released_date  | Sort book data by the released date        |
| 7   | GET         | /api/v1/book/?sortBy=genre          | Sort book data by the genre                |
| 8   | POST        | /api/v1/book/admin                  | Insert new book data                       |
| 9   | PATCH       | /api/v1/book/admin/:book_id         | Edit or update the book’s data by it’s ID  |
| 10  | DELETE      | /api/v1/book/admin/:book_id         | Rent the book by it’s ID                   |

