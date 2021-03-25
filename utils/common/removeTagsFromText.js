export default function f(text) {
    return text.replace(/<.+?>/g, "");
}