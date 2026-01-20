import { useState } from 'react'
import FileUpload from './components/FileUpload';
import ChatChart from './components/ChatChart';
import FrequentUsers from './components/FrequentUsers';

function App() {
  const [result, setResult] = useState(null);
  return (
    <>
      <div className='app'>
        <h1>WhatsApp Chat Analyzer</h1>

        <FileUpload onResult={setResult}/>

        {result && (
          <>
            <ChatChart data={result.last7Days}/>
            <FrequentUsers users={result.frequentUsers}/>
          </>
        )}
      </div>
    </>
  );
}

export default App;
