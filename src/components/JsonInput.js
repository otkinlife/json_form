import React, { useState } from 'react';

import { jsonToSchema } from '../utils/jsonToSchema';

const JsonInput = ({ onJsonChange }) => {
    const [json, setJson] = useState({});
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        try {
            const parsedJson = JSON.parse(e.target.value);
            setJson(parsedJson);
            setError(null);
            const schema = jsonToSchema(parsedJson);
            onJsonChange(schema);
        } catch (err) {
            setError('Invalid JSON');
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsedJson = JSON.parse(event.target.result);
                setJson(parsedJson);
                setError(null);
                const schema = jsonToSchema(parsedJson);
                onJsonChange(schema);
            } catch (err) {
                setError('Invalid JSON');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} className="file-input" />
            <textarea
                rows="10"
                cols="50"
                onChange={handleInputChange}
                placeholder="Paste JSON here or upload a file"
                className="json-textarea"
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default JsonInput;
