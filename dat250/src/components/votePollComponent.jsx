import React, { useState, useEffect } from 'react';

const VotePoll = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPollId, setSelectedPollId] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState('');

  useEffect(() => {
    fetch("/api/polls")
      .then(response => response.json())
      .then(data => setPolls(data))
      .catch(error => console.error("Error fetching polls:", error));
  }, []);

  useEffect(() => {
    if (selectedPollId) {
      fetch(`/api/polls/${selectedPollId}`)
        .then(response => response.json())
        .then(data => setOptions(data.options))
        .catch(error => console.error("Error fetching poll options:", error));
    } else {
      setOptions([]);
    }
  }, [selectedPollId]);

  const handleVote = async () => {
    if (!selectedOptionId) {
      alert('Please select an option.');
      return;
    }

    const vote = {
      user: { id: 1 },
      voteOption: { id: selectedOptionId },
      publishedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(`/api/votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vote),
      });

      if (response.ok) {
        alert('Vote submitted successfully!');
        setSelectedOptionId('');
      } else {
        alert('Error submitting vote.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Vote on a Poll</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Poll:
            <select 
              value={selectedPollId} 
              onChange={(e) => setSelectedPollId(e.target.value)}
              required
            >
              <option value="">Select a Poll</option>
              {polls.map(poll => (
                <option key={poll.id} value={poll.id}>
                  {poll.question}
                </option>
              ))}
            </select>
          </label>

          {selectedPollId && (
            <div>
              <label>
                Options:
                <select 
                  value={selectedOptionId} 
                  onChange={(e) => setSelectedOptionId(e.target.value)}
                  required
                >
                  <option value="">Select an Option</option>
                  {options.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.caption}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={handleVote}>Submit Vote</button>
            </div>
          )}
        </form>
      </header>
    </div>
  );
};

export default VotePoll;
