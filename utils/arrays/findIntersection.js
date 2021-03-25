export default function f(a = [], b = []) {
    return a.filter(entry => b.includes(entry));
}