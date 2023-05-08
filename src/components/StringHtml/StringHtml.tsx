import React from 'react';

interface StringHtmlProps {
    htmlString: string;
    style?: any;
}

export default function StringHtml(props: StringHtmlProps) {
    return (
        <>
            <div
                style={props.style}
                dangerouslySetInnerHTML={{ __html: props.htmlString }}
            />
            
        </>
    );
}
