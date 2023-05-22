import React, { useState, useEffect } from 'react';

interface ShowTextForSecondsType {
    text: string;
    seconds: number;
}

const ShowTextForSeconds = (props: ShowTextForSecondsType) => {
    const { text, seconds } = props;
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(false);
        }, seconds * 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [seconds]);

    return isVisible ? <div style={{ color: 'green', marginTop: "10px" }}>{text}</div> : null;
};

export default ShowTextForSeconds;
