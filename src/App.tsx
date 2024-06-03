import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import NavBar from './components/navBar'
import { Home } from './views/Home/Home';
import Classes from './views/Classes/Classes';
import Students from './views/Students/Students';
import RouterBreadcrumbs from './components/routeCrambs/routeCrambs';
import { GlobalStateProvider } from './context/GlobalStateContext';
import AddStudent from './components/Students/AddStudent';
import { SnackbarProvider } from './context/SnackBarContext';
import StudentDetail from './components/Students/DetailStudent';
import AddTeacher from './components/Teachers/AddTeacher';
import TeacherDetail from './components/Teachers/DetailTeacher';
import Teachers from './views/Teachers/Teachers';
import ClassDetail from './components/Classes/DetailClasses';

function App() {

  return (
    <Router>
      <SnackbarProvider>
        <GlobalStateProvider>

          <div>
            <NavBar />
            <RouterBreadcrumbs />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/add" element={<AddTeacher />} />
              <Route path="/classes/:id" element={<ClassDetail />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/add" element={<AddStudent />} />
              <Route path="/students/:id" element={<StudentDetail />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/teachers/add" element={<AddTeacher />} />
              <Route path="/teachers/:id" element={<TeacherDetail />} />
              {/*
        <Route path="/profesores" element={<Profesores />} /> */}
            </Routes>
          </div>


        </GlobalStateProvider>
      </SnackbarProvider>

    </Router>
  )
}

export default App
