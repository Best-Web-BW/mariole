export async function getMaxID(collection) {
    const [entry] = (
        await collection
            .find({}, { projection: { _id: 0, id: 1 } })
            .sort({ id: -1 })
            .limit(1)
            .toArray()
    );

    return entry ? entry.id : -1;
}