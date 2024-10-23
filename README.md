# Data Management Application

## 🎯 Project Overview
This project is a single-page web application that allows users to manage data entries through a form interface and display them in a data grid. Users can create, update, and view records with specific validation rules and interactive features.

## 🚀 Features
- Form with 4 input fields:
  - Code (pattern: 2 letters + 3 numbers)
  - Name (max 12 characters)
  - Assign Date (DD/MM/YYYY format)
  - Is Updatable? (checkbox)
- Interactive data grid for displaying entries
- Save/Update and Clean functionality
- Row selection and update capabilities
- Conditional row styling and interaction
- Generic React components for inputs and buttons
- Comprehensive form validation
- Modern UI/UX design

## 🛠 Tech Stack
- **React**: Frontend library
- **TypeScript**: Type-safe development
- **Redux Toolkit & RTK Query**: State management and API calls
- **React Hook Form**: Form handling
- **Material UI**: UI components and styling
- **React Hooks**: State and lifecycle management

## 🏗 Project Structure
```
src/
├── components/
│   ├── CommonButton
│   ├── CommonInput
│   ├── DataGrid
│   ├── DatePickerInput
│   ├── ErrorFallback
│   └── MainForm
├── hooks/
├── store/
│   ├── dataSlice
│   └── store
├── types/
├── utils/
└── App.tsx
```
## 🚦 Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.