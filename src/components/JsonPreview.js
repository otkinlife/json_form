import React from 'react';
import ReactJson from 'react-json-view';

const JsonPreview = ({ data }) => {
    return (
        <div>
            <h2>JSON Preview</h2>
            <ReactJson src={data} />
        </div>
    );
};

export default JsonPreview;
