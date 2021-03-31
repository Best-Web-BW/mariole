export default function serializeForm(htmlForm) {
    const parsedForm = parseForm(htmlForm);
    return hasNestedEntries(parsedForm) ? transformForm(parsedForm) : parsedForm;
}

function parseForm(htmlForm) {
    return Array.from(htmlForm).reduce((result, { tagName, type, name, value, checked, valueAsNumber }) => {
        if(["INPUT", "TEXTAREA"].includes(tagName)) switch(type) {
            case "checkbox":
                result[name] = checked;
                break;
            case "radio":
                if(checked) result[name] = value;
                break;
            case "number":
                result[name] = valueAsNumber;
                break;
            default:
                result[name] = value;
        }
        return result;
    }, {});
}

function hasNestedEntries(parsedForm) {
    for(const name in parsedForm) if(name.includes(".")) return true;
    return false;
}

function transformForm(parsedForm) {
    const splitted = splitNames(parsedForm);
    const joined = joinNested(splitted);
    const recursivelyJoined = recursivelyJoinSubnested(joined);
    const smoothed = smoothNames(recursivelyJoined);
    const object = convertToObject(smoothed);
    return object;
}

function splitNames(data) {
    const result = [];
    for(const key in data) result.push([key.split("."), data[key]]);
    return result;
}

function joinNested(data) {
    const result = [];
    const nested = {};
    for(const [names, value] of data) {
        if(names.length === 1) result.push([names, value]);
        else {
            const name = names[0];
            nested[name] ??= [];
            nested[name].push([names.slice(1), value]);
        }
    }
    for(const name in nested) result.push([[name], nested[name]]);
    return result;
}

function recursivelyJoinSubnested(data) {
    const result = [];
    for(const [names, value] of data) {
        result.push([names, value instanceof Array ? joinNested(value) : value]);
    }
    return result;
}

function smoothNames(data) {
    const result = [];
    for(const [[name], value] of data) {
        result.push([name, value instanceof Array ? smoothNames(value) : value]);
    }
    return result;
}

function convertToObject(data) {
    const result = {};
    for(const [name, value] of data) {
        result[name] = value instanceof Array ? convertToObject(value) : value;
    }
    return result;
}