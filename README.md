# NovaEra ERP API

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-316192?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary-red)

A comprehensive RESTful API for an Enterprise Resource Planning (ERP) system built with Node.js, Express, and PostgreSQL. This API provides complete backend functionality for managing modules, tables, records, users, roles, permissions, notifications, file uploads, audit logs, and more.

## ✨ Introduction

NovaEra ERP API is a robust backend solution designed for enterprise-level resource planning and management. It features a modular architecture with role-based access control, comprehensive audit logging, real-time notifications, file management, and flexible data modeling capabilities.

### Key Features

- 🔐 **Authentication & Authorization**: JWT-based authentication with role-based access control (RBAC)
- 📊 **Dynamic Data Modeling**: Create and manage custom modules, tables, and columns
- 📝 **Record Management**: Full CRUD operations for records with assigned users and comments
- 🔔 **Notifications**: Real-time and scheduled notifications system
- 📁 **File Management**: Secure file upload and management
- 📋 **Views & Sorting**: Custom views with advanced sorting capabilities
- 🔍 **Audit Logging**: Comprehensive audit trail for all system activities
- 👥 **Collaboration**: User assignment, comments, and table collaboration features
- ⏰ **Scheduled Jobs**: Automated notification scheduling using node-cron
- 🔗 **Relationships**: Foreign key relationships between tables and columns

## 🚀 Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Task Scheduling**: node-cron
- **File Handling**: Built-in Node.js file system
- **Environment Management**: dotenv
- **CORS**: cors middleware
- **Cookie Parsing**: cookie-parser

## ⚙️ Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/novaera-erp-api.git
   cd novaera-erp-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and fill in your database credentials and other configuration values:

   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=erpsystem

   # SSL Configuration (options: disable, require, true)
   DB_SSL=disable

   # Optional: Database URL (for hosted environments)
   # DATABASE_URL=postgresql://user:password@host:port/database

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key

   # CORS Configuration (optional)
   # CORS_ORIGIN=http://localhost:3000
   ```

4. **Set up the database**
   - Create a PostgreSQL database
   - Run the SQL schema scripts from `novaera-saas-erp-db` repository
   - Ensure the database user has appropriate permissions

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Start the production server**

   ```bash
   npm start
   ```

The API will be available at `http://localhost:3001` (or the port specified in your `.env` file).

## 📋 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name

# SSL Configuration (options: disable, require, true)
# Set to 'disable' for local development
# Set to 'true' or 'require' for production/hosted databases
DB_SSL=disable

# Optional: Database URL (for hosted environments like Render, Railway, Heroku)
# If provided, this will be used instead of individual DB_* variables
# DATABASE_URL=postgresql://user:password@host:port/database

# JWT Configuration
# Generate a strong secret key for production (minimum 32 characters)
JWT_SECRET=your_jwt_secret_key

# CORS Configuration (optional)
# CORS_ORIGIN=http://localhost:3000
```

See `.env.example` for a complete template.

## 🧩 Project Structure

```
novaera-erp-api/
│
├── src/
│   ├── app.js                      # Express app configuration
│   ├── server.js                   # Server entry point
│   │
│   ├── config/
│   │   └── db.js                   # Database connection configuration
│   │
│   ├── controllers/                # Request handlers
│   │   ├── authController.js
│   │   ├── modulesController.js
│   │   ├── tablesController.js
│   │   ├── columnsController.js
│   │   ├── columnOptionsController.js
│   │   ├── recordsController.js
│   │   ├── recordAssignedUsersController.js
│   │   ├── recordCommentsController.js
│   │   ├── recordSubscriptionsController.js
│   │   ├── usersController.js
│   │   ├── rolesController.js
│   │   ├── permissionsController.js
│   │   ├── notificationsController.js
│   │   ├── scheduledNotificationsController.js
│   │   ├── filesController.js
│   │   ├── viewsController.js
│   │   ├── viewSortController.js
│   │   ├── tableCollaboratorsController.js
│   │   └── auditLogController.js
│   │
│   ├── services/                   # Business logic layer
│   │   ├── usersService.js
│   │   ├── modulesService.js
│   │   ├── tablesService.js
│   │   ├── columnsService.js
│   │   ├── columnOptionsService.js
│   │   ├── recordsService.js
│   │   ├── recordAssignedUsersService.js
│   │   ├── recordCommentsService.js
│   │   ├── recordSubscriptionsService.js
│   │   ├── rolesService.js
│   │   ├── permissionsService.js
│   │   ├── notificationsService.js
│   │   ├── scheduledNotificationsService.js
│   │   ├── filesService.js
│   │   ├── viewsService.js
│   │   ├── viewSortService.js
│   │   ├── tableCollaboratorsService.js
│   │   └── auditLogService.js
│   │
│   ├── routes/                     # API routes
│   │   ├── auth.js
│   │   ├── modules.js
│   │   ├── tables.js
│   │   ├── columns.js
│   │   ├── columnOptions.js
│   │   ├── records.js
│   │   ├── recordAssignedUsers.js
│   │   ├── recordComments.js
│   │   ├── recordSubscriptions.js
│   │   ├── users.js
│   │   ├── roles.js
│   │   ├── permissions.js
│   │   ├── notifications.js
│   │   ├── scheduledNotifications.js
│   │   ├── files.js
│   │   ├── views.js
│   │   ├── viewSortRoutes.js
│   │   ├── tableCollaborators.js
│   │   └── auditLog.js
│   │
│   ├── middleware/                 # Custom middleware
│   │   ├── authMiddleware.js       # JWT authentication middleware
│   │   └── validateFile.js         # File upload validation
│   │
│   ├── jobs/                       # Scheduled jobs
│   │   └── notificationScheduler.js # Cron job for scheduled notifications
│   │
│   └── utils/                      # Utility functions
│       └── fileUtils.js            # File handling utilities
│
├── .env.example                    # Environment variables template
├── .env                            # Environment variables (not in git)
├── .gitignore                      # Git ignore rules
├── LICENSE                         # License file
├── package.json                    # Project dependencies
└── README.md                       # Project documentation
```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user information

### Modules

- `GET /api/modules` - Get all modules
- `POST /api/modules` - Create a new module
- `GET /api/modules/:id` - Get a specific module
- `PUT /api/modules/:id` - Update a module
- `DELETE /api/modules/:id` - Delete a module
- `GET /api/modules/exists/table-name` - Check if table name exists in module

### Tables

- `GET /api/tables/module/:module_id` - Get all tables in a module
- `POST /api/tables` - Create a new table
- `GET /api/tables/:table_id` - Get a specific table
- `PUT /api/tables/:table_id` - Update a table
- `DELETE /api/tables/:table_id` - Delete a table
- `GET /api/tables/exists/name` - Check if table name exists in module

### Columns

- `GET /api/columns` - Get all columns
- `POST /api/columns` - Create a new column
- `GET /api/columns/table/:table_id` - Get columns by table
- `GET /api/columns/:column_id` - Get a specific column
- `PUT /api/columns/:column_id` - Update a column
- `DELETE /api/columns/:column_id` - Delete a column
- `GET /api/columns/table/:table_id/exists-name` - Check if column name exists in table
- `GET /api/columns/:column_id/has-records` - Check if column has records

### Column Options

- `GET /api/column-options/column/:column_id` - Get options for a column
- `POST /api/column-options` - Create column options
- `PUT /api/column-options/:id` - Update column options
- `DELETE /api/column-options/:id` - Delete column options

### Records

- `GET /api/records/table/:table_id` - Get all records for a table
- `POST /api/records` - Create a new record
- `GET /api/records/:record_id` - Get a specific record
- `PUT /api/records/:record_id` - Update a record
- `DELETE /api/records/:record_id` - Delete a record
- `GET /api/records/table/:table_id/search` - Search records by value
- `GET /api/records/table/:table_id/count` - Count records in a table
- `GET /api/records/table/:table_id/exists-field` - Check if field exists in records

### Record Assigned Users

- `GET /api/record-assigned-users/record/:record_id` - Get assigned users for a record
- `POST /api/record-assigned-users` - Assign users to a record
- `DELETE /api/record-assigned-users/:id` - Remove user assignment from record

### Record Comments

- `GET /api/record-comments/record/:record_id` - Get comments for a record
- `POST /api/record-comments` - Create a comment on a record
- `PUT /api/record-comments/:id` - Update a comment
- `DELETE /api/record-comments/:id` - Delete a comment

### Record Subscriptions

- `GET /api/record-subscriptions/record/:record_id` - Get subscriptions for a record
- `POST /api/record-subscriptions` - Subscribe to record notifications
- `DELETE /api/record-subscriptions/:id` - Unsubscribe from record notifications

### Users

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/:id` - Update a user
- `PUT /api/users/:id/password` - Update user password
- `DELETE /api/users/:id` - Delete a user
- `PUT /api/users/:id/block` - Block a user
- `PUT /api/users/:id/unblock` - Unblock a user
- `PUT /api/users/:id/active` - Set user active status
- `PUT /api/users/:id/reset-password` - Reset password (admin only)
- `GET /api/users/exists/email` - Check if email exists
- `PUT /api/users/:id/avatar` - Set user avatar

### Roles

- `GET /api/roles` - Get all roles
- `POST /api/roles` - Create a new role
- `GET /api/roles/:id` - Get a specific role
- `POST /api/roles/:id/assign` - Assign role to user
- `DELETE /api/roles/:id/remove` - Remove role from user
- `GET /api/roles/user/:user_id` - Get roles for a user
- `POST /api/roles/:id/permissions` - Set role permissions
- `PUT /api/roles/:id/permissions` - Update role permissions
- `GET /api/roles/:id/permissions/:table_id` - Get role permissions for a table
- `DELETE /api/roles/:id/permissions/:table_id` - Delete role permissions

### Permissions

- `GET /api/permissions` - Get all permissions
- `POST /api/permissions` - Create a new permission
- `GET /api/permissions/role/:role_id/table/:table_id` - Get role-table permissions
- `DELETE /api/permissions/role/:role_id/table/:table_id` - Delete role-table permissions
- `GET /api/permissions/table/:table_id/users` - Get users with permissions for a table
- `POST /api/permissions/table/:table_id/roles` - Assign massive permissions
- `DELETE /api/permissions/table/:table_id` - Delete all permissions for a table

### Notifications

- `GET /api/notifications` - Get all notifications
- `POST /api/notifications` - Create a new notification
- `POST /api/notifications/massive` - Create massive notifications
- `GET /api/notifications/user/:user_id` - Get notifications for a user
- `PUT /api/notifications/:notification_id/read` - Mark notification as read
- `PUT /api/notifications/user/:user_id/read-all` - Mark all notifications as read
- `DELETE /api/notifications/:notification_id` - Delete a notification
- `DELETE /api/notifications/user/:user_id` - Delete all notifications for a user
- `GET /api/notifications/user/:user_id/unread-count` - Get unread notification count

### Scheduled Notifications

- `GET /api/scheduled-notifications` - Get all scheduled notifications
- `POST /api/scheduled-notifications` - Create a scheduled notification
- `GET /api/scheduled-notifications/:id` - Get a specific scheduled notification
- `PUT /api/scheduled-notifications/:id` - Update a scheduled notification
- `DELETE /api/scheduled-notifications/:id` - Delete a scheduled notification
- `GET /api/scheduled-notifications/user/:user_id` - Get scheduled notifications for a user

### Views

- `GET /api/views` - Get all views
- `POST /api/views` - Create a new view
- `GET /api/views/:id` - Get a specific view
- `PUT /api/views/:id` - Update a view
- `DELETE /api/views/:id` - Delete a view
- `GET /api/views/table/:table_id` - Get views for a table

### View Sorts

- `GET /api/view-sorts/view/:view_id` - Get sorts for a view
- `POST /api/view-sorts` - Create a view sort
- `PUT /api/view-sorts/:id` - Update a view sort
- `DELETE /api/view-sorts/:id` - Delete a view sort

### Table Collaborators

- `GET /api/table-collaborators/table/:table_id` - Get collaborators for a table
- `POST /api/table-collaborators` - Add a collaborator to a table
- `DELETE /api/table-collaborators/:id` - Remove a collaborator from a table

### Files

- `POST /api/files/upload` - Upload a file
- `GET /api/files/:id` - Get file metadata
- `GET /api/files/:id/download` - Download a file
- `DELETE /api/files/:id` - Delete a file

### Audit Log

- `GET /api/audit-log` - Get audit logs
- `GET /api/audit-log/record/:record_id` - Get audit logs for a record
- `GET /api/audit-log/user/:user_id` - Get audit logs for a user
- `GET /api/audit-log/table/:table_id` - Get audit logs for a table

## 🔒 Security Features

- JWT-based authentication with secure cookie storage
- Password hashing using bcryptjs
- Role-based access control (RBAC)
- CORS configuration for allowed origins
- SQL injection prevention through parameterized queries
- Input validation and sanitization
- Audit logging for security monitoring
- File upload validation and size limits
- Protected routes with authentication middleware

## 🚀 Deployment

### Recommended Platforms

- **Render**: Easy deployment with PostgreSQL support
- **Railway**: Simple setup with automatic database provisioning
- **Heroku**: Traditional PaaS with add-on support
- **AWS**: Full control with EC2, RDS, and Elastic Beanstalk
- **DigitalOcean**: App Platform or Droplets
- **Vercel**: Serverless functions (may require adjustments)

### Deployment Checklist

1. Set `NODE_ENV=production` in environment variables
2. Configure production database credentials
3. Set a strong `JWT_SECRET` (minimum 32 characters)
4. Configure `DB_SSL` appropriately for your database provider
5. Update CORS allowed origins in `src/app.js` or via `CORS_ORIGIN` environment variable
6. Ensure database migrations are run
7. Set up environment variables on your hosting platform
8. Configure automatic restarts (PM2, systemd, etc.)
9. Set up file storage directory with proper permissions
10. Configure cron job for scheduled notifications

### Example: Deploying to Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables from your `.env` file
6. Create a PostgreSQL database on Render
7. Update database connection variables
8. Deploy

## 🧪 Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

### Development Best Practices

- Use environment variables for all configuration
- Follow the existing code structure and patterns
- Add appropriate error handling
- Write meaningful commit messages
- Test API endpoints before committing
- Use parameterized queries for all database operations
- Implement proper logging for debugging
- Follow RESTful API conventions

## 📝 License

This project is proprietary and confidential. All rights reserved.

### Copyright (c) 2025 Steven Morales Fallas

Redistribution, modification, reproduction, sublicensing, or any form of transaction (including commercial, educational, or promotional use) involving this repository, its source code, or derived works is strictly prohibited without the explicit and personal written authorization of the Lead Developer, Steven Morales Fallas.

Unauthorized commercial use, resale, or licensing of this repository or its contents is strictly forbidden and will be subject to applicable legal action.

For licensing inquiries, please contact: Steven Morales Fallas

## 👤 Author

### Steven Morales Fallas

- Full Stack Developer
- Specialized in Node.js, Express, PostgreSQL, and modern web technologies

## 🤝 Contributing

This is a proprietary project. Contributions are not accepted at this time. For collaboration inquiries, please contact the author.

## 📞 Support

For issues, questions, or licensing inquiries, please contact the project maintainer.

---

**Note**: This API is designed to work with a frontend application (`novaera-saas-erp-web`) and database (`novaera-saas-erp-db`). Ensure proper CORS configuration and authentication flow when integrating with client applications.
