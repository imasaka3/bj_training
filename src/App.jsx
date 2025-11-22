import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Result from './pages/Result';
import History from './pages/History';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="practice" element={<Practice />} />
          <Route path="history" element={<History />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
