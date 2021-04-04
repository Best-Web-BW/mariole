export default function capitalizeFirstLetter(word = "word") {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
}