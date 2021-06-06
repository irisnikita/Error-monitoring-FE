// Libraries
import React from 'react';

interface JsonViewProps {
    src: any
}

const JsonView: React.FC<JsonViewProps> = ({
    src
}) => {
    const showRender = () => {
        if (typeof window !== 'undefined') {
            const ReactJson = require('react-json-view').default;

            return <ReactJson src={src} name={null} displayDataTypes={false} displayArrayKey={false} />;
        }

        return null;
    };

    return (
        <>
            {showRender()}
        </>
    );
};

export default JsonView;