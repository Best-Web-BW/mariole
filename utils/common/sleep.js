export default function f(delay = 0) {
    return new Promise(resolve => setTimeout(resolve, delay));
}