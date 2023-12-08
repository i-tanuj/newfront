import React, { useState } from 'react';

const FormComponent = () => {
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [messageValue, setMessageValue] = useState('');

  const handleCheckboxChange = () => {
    setCheckboxChecked(!isCheckboxChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isCheckboxChecked) {
      // Run different condition for variable value submission when checkbox is checked
      console.log('Running condition for checked checkbox');
      console.log('Name:', nameValue);
    } else {
      // Run different condition for variable value submission when checkbox is unchecked
      console.log('Running condition for unchecked checkbox');
      console.log('Name:', nameValue);
      console.log('Email:', emailValue);
      console.log('Message:', messageValue);
    }
  };

  return (
    <div>
      <h1>Toggle Form Input Fields</h1>
      <label>
        <input
          type="checkbox"
          checked={isCheckboxChecked}
          onChange={handleCheckboxChange}
        />
        Hide Form
      </label>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </label>
        <br />

        {/* Display Email field only when the checkbox is unchecked */}
        {!isCheckboxChecked && (
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </label>
        )}
        <br />

        {/* Display Message field only when the checkbox is unchecked */}
        {!isCheckboxChecked && (
          <label>
            Message:
            <textarea
              name="message"
              rows="4"
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
            />
          </label>
        )}
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
