export default function deserializeForm(form, data) {
    const flattened = flattenObject(data);
    console.log({ flattened });
    for(const name in form.elements) {
        const element = form.elements[name];
        const value = flattened[name];
        switch(element.type) {
            case "checkbox":
                element.checked = value;
                break;
            case "radio":
                element.checked = element.value === value;
                break;
            case "number":
                element.valueAsNumber = value;
                break;
            default:
                element.value = value;
        }
    }
}

function flattenObject(object) {
    const result = {};
    for(const key in object) {
        const value = object[key];
        if(typeof value === "object") {
            const flattened = flattenObject(value);
            for(const subKey in flattened) result[`${key}.${subKey}`] = flattened[subKey];
        } else result[key] = value;
    }
    return result;
}