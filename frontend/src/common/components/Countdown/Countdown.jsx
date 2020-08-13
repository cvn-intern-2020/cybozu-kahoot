import React, { useState, useEffect } from 'react';

const Countdown = ({ time }) => {
    const now = new Date();
    const [counter, setCounter] = useState((time - now) / 1000);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    return <div>{counter}</div>;
};

export default Countdown;
