// utils/jsonToSchema.js

export const jsonToSchema = (json, title = '') => {
    const schema = { type: getType(json) };

    if (title) {
        schema.title = title;
    }

    if (schema.type === 'object') {
        schema.properties = {};
        for (const key in json) {
            schema.properties[key] = jsonToSchema(json[key], key);
        }
    } else if (schema.type === 'array') {
        schema.items = json.length > 0 ? jsonToSchema(json[0], '') : {};
    }

    return schema;
};

const getType = (value) => {
    if (Array.isArray(value)) {
        return 'array';
    } else if (value === null) {
        return 'null';
    } else {
        return typeof value;
    }
};
