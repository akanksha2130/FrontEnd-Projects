# 🧾 Multi-Step Form

A responsive, user-friendly **multi-step form** built with React and Material UI (MUI), enabling users to enter and manage resume details through an intuitive interface. Includes dynamic field handling, drag-and-drop reordering, and `localStorage` persistence.

---

## 🚀 Features

- 🔄 Multi-step navigation with real-time validation  
- 📄 Upload and preview resumes (PDF)  
- 🧠 Add, remove, and **drag & drop reorder** skills  
- 🎓 Manage education history dynamically  
- 📋 Summary and confirmation steps  
- 💾 Persistent form data using **localStorage**  
- 🎨 Styled with **Material UI**, following Figma designs  
- ⚛️ Built using **React.js**

---

## 📁 Folder Structure

```bash
multi-step-form/
├── public/                # Static assets and public files
├── src/                   # Application source code
│   ├── components/        # Reusable components
│   │   └── MultiStepForm.js   # Main logic and stepper UI
│   ├── steps/             # Individual form steps
│   │   ├── UploadResume.js    # Resume upload step
│   │   ├── BasicDetails.js    # Basic details step
│   │   ├── Skills.js          # Skills step
│   │   ├── Education.js       # Education history step
│   │   ├── Summary.js         # Summary step
│   │   └── Confirmation.js    # Confirmation step
│   ├── App.js              # Root component
├── .gitignore             # Git ignore rules
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation

## 🛠️ Tech Stack

- [React.js](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Dnd Kit](https://dndkit.com/) for drag & drop
- [Vercel](https://vercel.com/) for deployment

## 🛠️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/akanksha2130/FrontEnd-Projects/tree/multi-step-form-react
cd multi-step-form-react

# 2. Install dependencies
npm install

# 3. Start the development server
npm start

# 4. Build for production
npm run build

# 📧 Contact

For any information or queries, feel free to reach out at **[akankshasingh8086@gmail.com](mailto:akankshasingh8086@gmail.com)**.
