import React, { useState, useEffect } from 'react';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';
import Description from './components/Description/Description';


const App = () => {
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    });

    useEffect(() => {
        const storedFeedback = localStorage.getItem('feedback');
            if (storedFeedback) {
                setFeedback(JSON.parse(storedFeedback));
            }
        }, []);

    const updateFeedback = feedbackType => {
        setFeedback(prevState => ({
            ...prevState,
            [feedbackType]: prevState[feedbackType] + 1
        }));
    }

    const resetFeedback = () => {
        setFeedback({ good: 0, neutral: 0, bad: 0 });
    }

    useEffect(() => {
        localStorage.setItem('feedback', JSON.stringify(feedback));
    }, [feedback]);

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positivePercentage = totalFeedback === 0 ? 0 : Math.round((feedback.good / totalFeedback) * 100);

    return (
    <div>
        <Description />
        {totalFeedback === 0 ? (
        <Notification message="No feedback yet" />
        ) : (
        <Feedback feedback={feedback} totalFeedback={totalFeedback} positivePercentage={positivePercentage} />
        )}
        <Options updateFeedback={updateFeedback} resetFeedback={resetFeedback} totalFeedback={totalFeedback} />
    </div>
    );
}

export default App;