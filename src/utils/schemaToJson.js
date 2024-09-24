// utils/schemaToJson.js

export const schemaToJson = (schema) => {
    if (!schema || typeof schema !== 'object') {
        return null;
    }

    switch (schema.type) {
        case 'object':
            const obj = {};
            for (const key in schema.properties) {
                obj[key] = schemaToJson(schema.properties[key]);
            }
            return obj;
        case 'array':
            return [schemaToJson(schema.items)];
        case 'string':
            return '';
        case 'number':
            return 0;
        case 'boolean':
            return false;
        case 'null':
            return null;
        default:
            return null;
    }
};
