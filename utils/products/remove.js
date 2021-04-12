export default async function remove(id) { // Fuck JS with keyword "delete"
    return await fetch(`/api/products/${id}`, { method: "DELETE" });
}