import React, { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

const Countdown = ({ time }) => {
    const now = new Date();
    const [counter, setCounter] = useState((time - now) / 1000);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    return <span class={styles.number}>{Math.ceil(counter)}</span>;
};

export default Countdown;
