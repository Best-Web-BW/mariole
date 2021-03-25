export default function f(array = [], length = 1) {
    const result = [];
    for(let i = 0; i < Math.ceil(array.length / length); i++) {
        result[i] = array.slice(i * length, (i + 1) * length);
    }
    return result;
}