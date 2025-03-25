# Student Management System API

A Node.js-based REST API for managing students and admin users, allowing role-based authentication, task assignments, and student data management.

---

## Features

**Admin Features:**

- Create and manage student accounts
- List all student details
- Assign tasks to students with due dates
- Track tasks progress

**Student Features:**

- Login and View assigned tasks
- List tasks filtered by task progress
- Update task status

**Authentication & Security:**

- Role-based access control (**Admin & Student**)
- JWT-based authentication
- Password hashing with bcrypt

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** JWT, bcrypt

---

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/Nelvin-26/student-management.git
cd student-management
```

### Install Dependencies

```sh
npm install
```

### Configure Environment Variables (`.env`)

Create a `.env` file in the root directory and add:

```
PORT=3000
DATABASE=mongodb+srv://Nelvin:AvMamryMmAQh2HC0@nelvinworks.m4yfl.mongodb.net/MySchool
JWTKEY=MySchool@123
```

### Start the Server

```sh
npm start
```

Your API will be running at **`http://localhost:3000`**

---

## Postman API Collection

To test the API using **Postman**, click the link below to import the collection:

https://gold-equinox-477899.postman.co/workspace/Nelvin's-Workspace~f27b61f4-a094-4e68-832d-d73dba70c402/collection/16276949-dbeed6a3-c2b9-44ef-a550-be771aa7cc46?action=share&creator=16276949

Click the link below to view the published API documentation in Postman :

https://documenter.getpostman.com/view/16276949/2sAYkKJdAp

---

## Security Measures

- **JWT Authentication** for secure access
- **Role-based Access Control** to prevent unauthorized actions
- **Password Hashing** using bcrypt
