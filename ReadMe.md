# **Task Management API Documentation (with Docker)**

This is a **RESTful API** for managing tasks using **MongoDB** for data storage and **Express.js** as the web framework. The application is containerized using **Docker** for easy deployment and scaling.

---

## **Base URL:**

```
http://localhost:3000/tasks
```

---

## **Docker Setup**

### **1. Clone the Repository**

```bash
git clone https://github.com/Malk2375/todo-devops.git
cd todo-devops
```

### **2. Docker Setup**

Make sure you have Docker installed on your machine. Then, follow these steps to build and run the application in Docker.

#### **Step 1: Build the Docker Image**

In the root directory of your project (where your `Dockerfile` is located), run the following command to build the Docker image:

```bash
docker build -t task-api .
```

#### **Step 2: Run the Containers**

To run the application, make sure you have MongoDB running in a separate container, or you can use Docker Compose to set everything up. If you already have Docker Compose configured, run:

```bash
docker-compose up
```

---

## **API Endpoints**

### **1. Create a Task (POST /tasks)**

**Description**: This endpoint creates a new task in the database.

**Request:**

* **Method**: `POST`
* **URL**: `/tasks`
* **Body (JSON)**:

  ```json
  {
    "title": "My first task",
    "description": "This is a test task for the API",
    "completed": false
  }
  ```

**Response:**

* **Status Code**: `201 Created`

* **Body (JSON)**:

  ```json
  {
    "_id": "6888e2017d72f241b61e5cf6",
    "title": "My first task",
    "description": "This is a test task for the API",
    "completed": false,
    "createdAt": "2025-07-29T15:00:17.068Z",
    "updatedAt": "2025-07-29T15:00:17.068Z",
    "__v": 0
  }
  ```

* **Error Response**:

  * **Status Code**: `400 Bad Request`
  * **Body (JSON)**:

    ```json
    {
      "message": "Error while creating task",
      "error": "Detailed error message"
    }
    ```

---

### **2. Get All Tasks (GET /tasks)**

**Description**: This endpoint retrieves all tasks from the database.

**Request:**

* **Method**: `GET`
* **URL**: `/tasks`

**Response:**

* **Status Code**: `200 OK`

* **Body (JSON)**:

  ```json
  [
    {
      "_id": "6888e2017d72f241b61e5cf6",
      "title": "My first task",
      "description": "This is a test task for the API",
      "completed": false,
      "createdAt": "2025-07-29T15:00:17.068Z",
      "updatedAt": "2025-07-29T15:00:17.068Z",
      "__v": 0
    }
  ]
  ```

* **Error Response**:

  * **Status Code**: `500 Internal Server Error`
  * **Body (JSON)**:

    ```json
    {
      "message": "Error while fetching tasks",
      "error": "Detailed error message"
    }
    ```

---

### **3. Get Task by ID (GET /tasks/\:id)**

**Description**: This endpoint retrieves a task by its `ID`.

**Request:**

* **Method**: `GET`
* **URL**: `/tasks/:id`

  * Replace `:id` with the task's unique identifier.

**Example**:

* URL: `http://localhost:3000/tasks/6888e2017d72f241b61e5cf6`

**Response:**

* **Status Code**: `200 OK`

* **Body (JSON)**:

  ```json
  {
    "_id": "6888e2017d72f241b61e5cf6",
    "title": "My first task",
    "description": "This is a test task for the API",
    "completed": false,
    "createdAt": "2025-07-29T15:00:17.068Z",
    "updatedAt": "2025-07-29T15:00:17.068Z",
    "__v": 0
  }
  ```

* **Error Response**:

  * **Status Code**: `404 Not Found`

  * **Body (JSON)**:

    ```json
    {
      "message": "Task not found"
    }
    ```

  * **Status Code**: `500 Internal Server Error`

  * **Body (JSON)**:

    ```json
    {
      "message": "Error while retrieving task",
      "error": "Detailed error message"
    }
    ```

---

### **4. Update Task (PUT /tasks/\:id)**

**Description**: This endpoint updates a task by its `ID`. You can update the `title`, `description`, and `completed` status.

**Request:**

* **Method**: `PUT`

* **URL**: `/tasks/:id`

  * Replace `:id` with the task's unique identifier.

* **Body (JSON)**:

  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated description of the task",
    "completed": true
  }
  ```

**Response:**

* **Status Code**: `200 OK`

* **Body (JSON)**:

  ```json
  {
    "_id": "6888e2017d72f241b61e5cf6",
    "title": "Updated Task Title",
    "description": "Updated description of the task",
    "completed": true,
    "createdAt": "2025-07-29T15:00:17.068Z",
    "updatedAt": "2025-07-29T16:00:17.068Z",
    "__v": 0
  }
  ```

* **Error Response**:

  * **Status Code**: `400 Bad Request`

  * **Body (JSON)**:

    ```json
    {
      "message": "Error while updating task",
      "error": "Detailed error message"
    }
    ```

  * **Status Code**: `404 Not Found`

  * **Body (JSON)**:

    ```json
    {
      "message": "Task not found"
    }
    ```

---

### **5. Delete Task (DELETE /tasks/\:id)**

**Description**: This endpoint allows you to delete a task by its `ID`.

**Request:**

* **Method**: `DELETE`
* **URL**: `/tasks/:id`

  * Replace `:id` with the task's unique identifier.

**Response:**

* **Status Code**: `200 OK`

* **Body (JSON)**:

  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

* **Error Response**:

  * **Status Code**: `404 Not Found`

  * **Body (JSON)**:

    ```json
    {
      "message": "Task not found"
    }
    ```

  * **Status Code**: `500 Internal Server Error`

  * **Body (JSON)**:

    ```json
    {
      "message": "Error while deleting task",
      "error": "Detailed error message"
    }
    ```

---

## **Model - Task**

The `Task` model has the following fields:

* **title** (`String`): The title of the task. It is a required field.
* **description** (`String`): A description of the task. It is also required.
* **completed** (`Boolean`): Indicates whether the task is completed. Default is `false`.
* **createdAt** (`Date`): The timestamp when the task was created. Default is the current date.
* **updatedAt** (`Date`): The timestamp when the task was last updated. Default is the current date.

---

## **Testing and Continuous Integration**

### ** Running Tests Locally**

This project uses **Jest** for unit and integration testing.

To run the test suite:

```bash
npm install
npm test
```

#### Notes:

* Unit tests require a local **MongoDB instance** running at `mongodb://localhost:27017/todolist-test`.
* Integration tests use an **in-memory MongoDB** via `mongodb-memory-server`, so they do not require a local database.

---

### ** GitHub Actions CI**

Two GitHub Actions workflows are configured to run automatically on `push` and `pull_request` to the `master` branch:

#### **1. Node CI Workflow**

Located at: `.github/workflows/node-ci.yml`

* Sets up Node.js environment
* Starts a MongoDB service
* Installs dependencies
* Runs the full test suite with `npm test`

This ensures that all tests pass before changes are merged.

#### **2. Docker Build Workflow**

Located at: `.github/workflows/docker-image.yml`

* Builds the Docker image automatically using the latest `Dockerfile`
* Tags the image with a timestamp

Parfait, voici une section claire et concise à ajouter à ton `README.md`, en anglais, pour expliquer le **deployment sur Render**.

---

## ** Deployment (Render)**

This project is deployed using [Render](https://render.com), a cloud platform for hosting web services.

### ** Steps to Deploy**

1. Go to [https://dashboard.render.com](https://dashboard.render.com) and create a new **Web Service**.

2. Connect your **GitHub repository** to Render.

3. Choose the root of your project as the build path.

4. Fill out the required settings

5. Click **"Create Web Service"** to deploy.

### ** Live URL**

Once deployed, your API will be available at:

```
https://your-app-name.onrender.com
```

You can test the endpoints (e.g. `/tasks`).