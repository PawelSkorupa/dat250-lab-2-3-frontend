import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePoll from './components/createPollComponent';
import VotePoll from './components/votePollComponent';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><a href="/create-poll">Create Poll</a></li>
            <li><a href="/vote">Vote on Poll</a></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/create-poll" element={<CreatePoll />} />
          <Route path="/vote" element={<VotePoll />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
