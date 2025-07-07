# Smart Security Cameras Project

A full-stack final project for security footage analysis. This system allows uploading surveillance videos, processes them using advanced computer vision models in Python, and presents an interactive visualization of the number of people detected over time in a responsive React dashboard. The system includes authentication, user roles, MongoDB integration, and video processing using YOLOv8.

---

## Project Structure

The project is divided into three main folders:

```
project-root/
├── react/     # Frontend - React application for UI and user management
├── nodejs/    # Backend - Express.js server handling auth, file upload, DB
├── python/    # Video processing service using YOLOv8 and Flask
```

🖼️  
**הוסיפי כאן תרשים מבנה של המערכת – למשל דיאגרמת זרימה של React ⇄ Node ⇄ Python**

---

## Main Features

- Upload surveillance video files through the React interface.
- Authenticate users using JWT with email verification via Nodemailer.
- Manage users, roles, permissions, and video access.
- Use YOLOv8 model (via Ultralytics) to detect people in each video segment.
- Process video in intervals and return average people count per segment.
- Visualize results as interactive graphs using Recharts in React.
- Communicate between backend (Node.js) and video analysis service (Python) via HTTP POST.
- Store video metadata and users in MongoDB.

![alt text](screenshots/צילום%20מסך%202025-07-07%20200410.png)

---

## Technologies

---

## Screenshots

### User Management

**Login Screen**  
![alt text](screenshots/צילום%20מסך%202025-07-07%20203748.png)

---

**Admin Dashboard – Add/Edit User**  
![alt text](screenshots/צילום%20מסך%202025-07-07%20201144.png)

**User Requests Access from Admin**  
![alt text](screenshots/צילום%20מסך%202025-07-07%20201952.png)

**Admin Approves Access**  
![alt text](screenshots/צילום%20מסך%202025-07-07%20201716.png)

---

### Video Upload and Analysis

**Upload Video via React Interface**  


**Processing in Progress (Loading State)**  
🖼️  
**מסך ביניים שמציג הודעת 'טוען...' או אנימציית המתנה עד לסיום ניתוח הסרטון**

**Final Graph Display – People per Minute**  

![alt text](screenshots/צילום%20מסך%202025-07-07%20202112.png)

---

## Installation Instructions


---

## Running the Project


---

## Flow Description

1. A user logs in to the system using a verified email.
2. The user uploads a video file via the React interface.
3. The Node.js server saves the video locally and forwards its name to the Python service.
4. The Python service processes the video using YOLOv8, detects people in each interval, and returns a summary as JSON.
5. The React app receives the data and renders a graph per video, showing the number of people per minute.



---

## Example Output

```json
[
  { "hour": "00:00", "people": 2 },
  { "hour": "00:01", "people": 3 },
  ...
]
```

![alt text](screenshots/צילום%20מסך%202025-07-07%20201838.png)


---

## Future Improvements


---

## License


---

## Developed by

**Elisheva Oyerbach**  
Final Project | Full Stack Security System  
React • Node.js • Python • Computer Vision • MongoDB
