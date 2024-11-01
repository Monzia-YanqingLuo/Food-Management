# Food Management System

This project is a **Food Management System** designed to help users track and organize food items by category. It supports CRUD operations, allowing users to create, read, update, and delete items. Key features include item creation, search by name, filtering by category, and paginated browsing. Additionally, users can view all current food items by leaving the search field empty and clicking search. Items can be updated directly through the creation page, and deletion is available if needed.

![image](img.png)

## Features

### Backend
- **API**: RESTful API built with Express.js for food item and category management.
- **CRUD Operations**: Supports Create, Read, Update, and Delete for food items and categories.
- **Pagination**: Efficient pagination on food item listings for large datasets.
- **Search by Name**: Enables users to search for food items and food categories by name.
- **Database Integration**: Sequelize ORM with MySQL for structured and efficient database interactions.

### Frontend
- **Responsive UI**: Developed with React and TypeScript for an intuitive and user-friendly experience.
- **Search Functionality**: Supports item search by name with filtering options.
- **DatePicker Integration**: Select and filter food items based on expiration dates.
- **Pagination Controls**: Easy navigation through items with Back, Next, and page number buttons.
- **Category Filtering**: View food items based on specific categories.
- **CRUD Operations:** Users can create new food items, view detailed information, update item details directly from the UI, and delete items with confirmation prompts for secure data management.

## Tech Stack

- **Backend**: Node.js, Express.js, Sequelize, MySQL
- **Frontend**: React, TypeScript, Axios, React-DatePicker
- **Tools**: ESLint, Git, GitHub

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [MySQL](https://www.mysql.com/)

### Setup

1. **Clone the Repository**
``` bash
git clone https://github.com/yourusername/food-management-system.git
cd food-management-system
```

2. **Install Dependencies**
- Backend
``` bash
cd backend
npm install
```

- Frontend
``` bash
cd ../frontend
npm install
```

3. **Run Migrations and Seed Data**
``` bash
cd backend
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

4. **Start the Servers**
- Backend
``` bash
cd backend
node app.js
```

- Frontend
``` bash
cd ../frontend
npm run dev
```