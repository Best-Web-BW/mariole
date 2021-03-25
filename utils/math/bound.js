export default function f(num = 0, a = 0, b = 0) {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
};