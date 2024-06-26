import React, {useState, useEffect} from 'react';
import Form, {Entry} from './components/Form';
import Entries from './components/Entries';
import Notification from './components/Notification';
import axios from 'axios';
import diaryService from './services/diaryService';


const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    diaryService.getAll().then((entries) => {
      setEntries(entries);
    });
  },[])


  const addEntry = (entry: Entry) => {
    diaryService.createDiary(entry).then((returnedEntry) => {
      setEntries(entries.concat(returnedEntry));
    });
    showMessage('Entry added');
  };

  const showMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  }


  return (
    <div>
      <h1>Flight Diary</h1>
      <Notification message={message} />
      <Form onSubmit={addEntry} />
      <Entries entries={entries} />
    </div>
  );
}

export default App;