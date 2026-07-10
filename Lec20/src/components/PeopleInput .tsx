import React from 'react';

interface PeopleInputProps {
  people: string;
  setPeople: (value: string) => void;
}

const PeopleInput: React.FC<PeopleInputProps> = ({ people, setPeople }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === '') {
      setPeople(value);
    }
  };

  const hasError = people !== '' && parseInt(people, 10) === 0;

  return (
    <div className={`input-group ${hasError ? 'error' : ''}`}>
      <label htmlFor="people">
        Number of People
        {hasError && <span className="error-message">Can't be zero</span>}
      </label>
      <div className="input-icon-wrapper">
        <span className="icon">👤</span>
        <input
          id="people"
          type="number"
          min="1"
          placeholder="0"
          value={people}
          onChange={handleChange}
          className={hasError ? 'error' : ''}
        />
      </div>
    </div>
  );
};

export default PeopleInput;