import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import ManageContent from './pages/Content/manageContent';
import SideMenu from './components/SideMenu';
import AppTheme from './shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

// Pages for routing
import HomePage from './pages/Home/HomePage';
import Content from './pages/Content/content';

export default function App() {
  return (
    <Router>
        <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/upload-content" element={<Content />} />
                <Route path="/manage-content" element={<ManageContent />} />
                
                {/* <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<AboutPage />} /> */}
                {/* <Route path="/feedback" element={<FeedbackPage />} /> */}
      </Routes>
    </Router> 
  );
}
