export default function f(array = [], count = 1) {
    const result = [];
    for(let i = 0; i < count; result[i] = [], i++);
    for(let i = 0; i < array.length; result[i % count].push(array[i]), i++);
    return result;
};