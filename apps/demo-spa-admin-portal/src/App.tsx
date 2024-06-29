import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './modules/languages/components/languages.provider';
import { ThemeProvider } from './modules/themes/components/themes.provider';
import Posts from './pages/posts';
import PostDetail from './pages/posts/detail';
import NotFound from './pages/not-found';
import About from './pages/about';
import Home from './pages/home';
import Login from './pages/login';
import Settings from './pages/settings';
import PrivateRoute from './modules/auth/components/private-route';
import PublicRoute from './modules/auth/components/public-route';
import Redirect from './pages/redirect';
import Menu from './components/menu';
import './App.css';

const App = () => (
  <Router>
    <ThemeProvider>
      <LanguageProvider>
        <Menu />
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route element={<PublicRoute />}>
            <Route path="/:locale/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/:locale/dashboard" element={<Home />} />
            <Route path="/:locale/about" element={<About />} />
            <Route path="/:locale/posts" element={<Posts />} />
            <Route path="/:locale/posts/:id" element={<PostDetail />} />
            <Route path="/:locale/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  </Router>
);

export default App;
