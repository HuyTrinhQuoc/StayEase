import { useState, useEffect } from 'react';

export const useCountdown = (initialSeconds: number = 600) => {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    // Hàm format thời gian mm:ss
    const getFormattedTime = () => {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        timeLeft,
        formattedTime: getFormattedTime(),
        isTimeUp: timeLeft <= 0
    };
};