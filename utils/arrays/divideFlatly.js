export default function f(array = [], count = 1) {
    const countPerPart = Math.floor(array.length / count);
    const counts = new Array(count).fill(countPerPart);
    for(let i = 0; i < array.length - countPerPart * count; counts[i++]++);
    
    const result = [];
    for(let i = 0, last = 0; i < count; result[i] = array.slice(last, last + counts[i]), last += counts[i++]);
    return result;
};