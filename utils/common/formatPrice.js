import divideArrayToSubarrays from "../arrays/divideToSubarrays";

export default function formatPrice(raw = "NOT SPECIFIED") {
    const divided = divideArrayToSubarrays(Array.from(`${raw}`).reverse(), 3);
    return `${divided.map(a => a.reverse().join("")).reverse().join(".")},00`;
};