import React from 'react';
interface MyError {
    error: any;
}

export default function Error(props: MyError) {
    const { error } = props;
    return <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>;
}
