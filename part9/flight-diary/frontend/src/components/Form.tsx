import React, { useState } from 'react';

export interface Entry {
  date: string;
  visibility: 'great' | 'good' | 'ok' | 'poor';
  weather: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
  comment: string;
}

interface EntryFormProps {
  onSubmit: (entry: Entry) => void;
}

const Form: React.FC<EntryFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<'great' | 'good' | 'ok' | 'poor'>('great');
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy'>('sunny');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({ date, visibility, weather, comment });
    setDate('');
    setVisibility('great');
    setWeather('sunny');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Visibility</label>
        {['great', 'good', 'ok', 'poor'].map(v => (
          <label key={v}>
            <input 
              type="radio" 
              value={v} 
              checked={visibility === v} 
              onChange={() => setVisibility(v as 'great' | 'good' | 'ok' | 'poor')} 
            />
            {v}
          </label>
        ))}
      </div>
      <div>
        <label>Weather</label>
        {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map(w => (
          <label key={w}>
            <input 
              type="radio" 
              value={w} 
              checked={weather === w} 
              onChange={() => setWeather(w as 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy')} 
            />
            {w}
          </label>
        ))}
      </div>
      <div>
        <label>Comment</label>
        <input 
          type="text" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
