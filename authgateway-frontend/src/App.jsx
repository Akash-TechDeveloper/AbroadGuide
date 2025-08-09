import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
     import RegisterForm from './components/RegisterForm';
     import UserDetails from './components/UserDetails';

     function App() {
       return (
         <Router>
           <div className="bg-gray-800 text-white p-4">
             <nav className="flex justify-center space-x-4">
               <Link to="/" className="hover:text-blue-300">Register</Link>
               <Link to="/user-details" className="hover:text-blue-300">Find User</Link>
             </nav>
           </div>
           <Routes>
             <Route path="/" element={<RegisterForm />} />
             <Route path="/user-details" element={<UserDetails />} />
           </Routes>
         </Router>
       );
     }

     export default App;