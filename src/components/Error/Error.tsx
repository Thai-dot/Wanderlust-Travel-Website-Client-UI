import React from 'react';
interface MyError {
    error: any;
}

export default function Error(props: MyError) {
    const { error } = props;
    return <div style={{ color: 'red', fontSize: '25px' }} className='pt-40 pb-40 pr-40 pl-40'>{error}</div>;
}
