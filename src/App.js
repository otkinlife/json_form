import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import JsonPreview from './components/JsonPreview';

import './App.css';


function App() {
  const [jsonSchema, setJsonSchema] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleJsonChange = (schema) => {
    setJsonSchema(addSchemaLevel(schema));
  };

  const handleFormSubmit = ({ formData }) => {
    // 将 JSON Schema 转换为普通 JSON 数据
    // const jsonData = schemaToJson(formData);
    setFormData(formData);
  };

  const addSchemaLevel = (schema, level = 0) => {
    schema.level = level;
    if (schema.properties) {
      for (let key in schema.properties) {
        addSchemaLevel(schema.properties[key], level + 1);
      }
    }
    return schema;
  };

  return (
    <div className="App">
      <h1>JSON to Form</h1>
      <div className="container">
        <div className="card">
          <JsonInput onJsonChange={handleJsonChange} />
        </div>
        <div className="card" style={{ width: '100%' }}>
          {jsonSchema && (
            <Form
              schema={jsonSchema}
              onSubmit={handleFormSubmit}
              formData={formData}
              validator={validator}
            />
          )}
        </div>
      </div>
      <div className="container">
        <div className="card">
          {formData && <JsonPreview data={formData} />} {/* 传递普通的 JSON 数据 */}
        </div>
      </div>
    </div>
  );
}

export default App;
