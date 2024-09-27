import React, {useState} from 'react'

const Keywords = () => {
    const [inputText, setInputText] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setInputText(e.target.value); // Update the state with the input text
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Enter Keywords:</h3>
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Type something..."
        style={{ padding: '10px', width: '300px' }}
      />
      <div style={{ marginTop: '20px', fontSize: '18px' }}>
        <strong>Keywors:</strong> {inputText}
      </div>
    </div>
  )
}

export default Keywords