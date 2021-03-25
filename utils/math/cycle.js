export default function f(num = 0, border = 1) {
    if(num < 0) num -= Math.floor(num / border) * border;
    return +Math.abs(num % border).toFixed(8);
};