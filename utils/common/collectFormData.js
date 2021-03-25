export default function f(form) {
    return Array.from(form).reduce((result, { tagName, type, name, value, checked }) => {
        if(["INPUT", "TEXTAREA"].includes(tagName)) switch(type) {
            case "checkbox":
                result[name] = checked;
                break;
            case "radio":
                if(checked) result[name] = value;
                break;
            default:
                result[name] = value;
        }
        return result;
    }, {});
}