import React, { useState, useEffect } from 'react';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [users, setUsers] = useState([]);
  const [creatorId, setCreatorId] = useState('');

  useEffect(() => {
    fetch("/api/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.slice();
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const poll = {
      question,
      publishedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      creator: { id: creatorId },
      options: options.map((caption, index) => ({ caption, presentationOrder: index })),
    };

    try {
      const response = await fetch("/api/polls", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(poll),
      });

      if (response.ok) {
        alert('Poll created successfully!');
        setQuestion('');
        setOptions(['']);
        setCreatorId('');
      } else {
        alert('Error creating poll.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Create a New Poll</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Poll Question:
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </label>

          <label>
            Creator:
            <select value={creatorId} onChange={(e) => setCreatorId(e.target.value)} required>
              <option value="">Select Creator</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select>
          </label>

          <div>
            <label>Options:</label>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddOption}>Add Option</button>
          </div>

          <button type="submit">Create Poll</button>
        </form>
      </header>
    </div>
  );
};

export default CreatePoll;
