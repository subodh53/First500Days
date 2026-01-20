import { useState } from 'react'
import FileUpload from './components/FileUpload';
import ChatChart from './components/ChatChart';
import FrequentUsers from './components/FrequentUsers';
import CumulativeGrowthChart from './components/CumulativeGrowthChart';
import EngagementRaioChart from './components/EngagementRatioChart';

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
            <h2>Cumulative Growth Chart</h2>
            <CumulativeGrowthChart dailyStats={result.dailyStats} />
            <h2>Engagement Ratio Chart</h2>
            <EngagementRaioChart dailyStats={result.dailyStats}/>
          </>
        )}
      </div>
    </>
  );
}

export default App;
