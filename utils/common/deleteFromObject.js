export default function deleteFromObject(object, names) {
    for(const name of names) delete object[name];
}