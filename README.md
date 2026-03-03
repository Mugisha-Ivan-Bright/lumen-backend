# 🌟 LUMEN Backend - V1

LUMEN is a **collaboration and talent discovery platform** for RCA students.  
It helps students **showcase their skills, collaborate on projects, give/receive advisory, and get discovered for hiring**.  

---

## 🎯 Core Motivation

At RCA, many students **struggle to collaborate** and some **miss job opportunities** despite having hidden talent.  
LUMEN solves this by:  

1. **Talent Discovery** – All students can showcase their skills and projects to peers and potential recruiters.  
2. **Collaboration** – Students can create projects, join teams, comment, and track contributions.  
3. **Advisory & Contribution** – Students can post tips, share achievements, and help others.  
4. **Hiring Opportunities** – Recruiters or peers can find the right talent and initiate hiring conversations.  
5. **Security & Trust** – Email verification 2FA ensures real users, while JWT authentication and role-based access protect the platform.  

---

## 🛠️ Tech Stack

- **Backend Framework:** NestJS  
- **Database:** PostgreSQL (`lumendb`, port 5432)  
- **ORM:** Prisma  
- **Authentication:** JWT + bcrypt  
- **Security:** Helmet  
- **Real-time:** Socket.io (optional for chat)  
- **File Storage:** Cloudinary  
- **Email Verification:** NodeMailer / SMTP service  

---

## 📦 Features

- JWT-based authentication with **email verification (2FA)**  
- Role-based access: `user`, `admin`, `recruiter`  
- Public **talent discovery** endpoints  
- **Projects module**: create, join, invite, comment  
- **Messaging** module for advisory or hiring  
- **Skill management**: assign, track, and display skills  
- **Contribution metrics**: projects, skills, advisories  
- **File uploads**: avatars and project images via Cloudinary  
- **Security**: Helmet + rate limiting  

---

## 🔗 API Endpoints Overview

### Auth
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | /api/auth/register | Register new user & send verification email |
| GET    | /api/auth/verify-email | Verify email using token |
| POST   | /api/auth/resend-verification | Resend verification email |
| POST   | /api/auth/login | Login (only verified accounts) |
| GET    | /api/auth/me | Get authenticated user info |
| POST   | /api/auth/logout | Logout user |
| POST   | /api/auth/refresh-token | Refresh JWT token |
| POST   | /api/auth/forgot-password | Send password reset email |
| POST   | /api/auth/reset-password | Reset password |

### Users
| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| GET    | /api/talent | Public | View all talent |
| GET    | /api/talent/:id | Public | View single talent profile |
| GET    | /api/users/:id | Protected | Internal view |
| PUT    | /api/users/profile | Protected | Update own profile |
| PATCH  | /api/users/:id/availability | Protected | Update availability status |
| PATCH  | /api/users/:id/avatar | Protected | Update avatar |
| PATCH  | /api/users/:id/role | Admin | Change user role |
| DELETE | /api/users/:id | Admin | Delete user |

### Skills
| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| GET    | /api/skills | Public | List all skills |
| GET    | /api/skills/:id | Public | Get skill details |
| POST   | /api/skills | Admin | Add new skill |
| DELETE | /api/skills/:id | Admin | Remove skill |

### User-Skills
| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| POST   | /api/users/skills | Protected | Assign existing skill to user |
| GET    | /api/users/:id/skills | Protected | View user's skills |
| PATCH  | /api/users/skills/:skillId | Protected | Update user skill |
| DELETE | /api/users/skills/:skillId | Protected | Remove skill from user |

### Projects
| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| POST   | /api/projects | Protected | Create project |
| GET    | /api/projects | Protected | List all projects |
| GET    | /api/projects/:id | Protected | Get project details |
| PATCH  | /api/projects/:id | Protected | Update project |
| DELETE | /api/projects/:id | Protected | Delete project |
| POST   | /api/projects/:id/join | Protected | Join project |
| POST   | /api/projects/:id/invite | Protected | Invite user to project |
| GET    | /api/projects/:id/members | Protected | List project members |
| POST   | /api/projects/:id/comment | Protected | Add comment |
| GET    | /api/projects/:id/comments | Protected | Get project comments |

### Messaging
| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| POST   | /api/messages | Protected | Send message |
| GET    | /api/messages/conversations | Protected | List user conversations |
| GET    | /api/messages/:conversationId | Protected | Get conversation messages |

### Metrics & Advisories
| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| GET    | /api/users/:id/stats | Protected | User stats: projects, skills, contributions |
| GET    | /api/users/:id/advisories | Protected | User advisory contributions |
| POST   | /api/advisories | Protected | Post advisory or tip |

---

## ⚡ Getting Started

1. Clone repository:  
```bash
git clone https://github.com/Mugisha-Ivan-Bright/lumen-backend.git
cd lumen-backend
