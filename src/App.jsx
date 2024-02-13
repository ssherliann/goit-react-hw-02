import Description from './components/Description'
import Feedback from './components/Feedback';
import Options from './components/Options';
import Notification from './components/Notification';
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const initialFeedback = { good: 0, neutral: 0, bad: 0 };
  const [feedback, setFeedback] = useState(JSON.parse(localStorage.getItem('feedback')) || initialFeedback);

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100) || 0;

  const updateFeedback = feedbackType => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1
    }));
  }

  const handleReset = () => {
    setFeedback(initialFeedback);
  };
  
  return (
    <>
      <Description/>
      <Options 
        updateFeedback={updateFeedback} 
        handleReset={handleReset}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
      <Feedback 
        feedback={feedback}
        totalFeedback={totalFeedback}
        positiveFeedback={positiveFeedback}
      />
      ) : (
        <Notification/>
      )}
    </>
  )
}

export default App;