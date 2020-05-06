// export function getProduct(productId) {
//   return axios.get(`${baseUrl}/products/${productId}`);
// }

// export function deleteProduct(productId) {
//   return axios.delete(`${baseUrl}/products/${productId}`);
// }

// export function createProduct(name, avatarUrl) {
//   return axios.post(`${baseUrl}/products/`, {
//     name: `${name}`,
//     avatar: `${avatarUrl}`,
//   });
// }

// export function getAllProducts() {
//   return axios.get(`${baseUrl}/products`);
// }
const now = new Date();

const comments = [
  {
    id: 1,
    user: "John",
    time: new Date(),
    content: "a",
  },
  {
    id: 2,
    user: "John",
    time: new Date(now.setDate(now.getDate() - 1)),
    content: "b",
  },
  {
    id: 3,
    user: "John",
    time: new Date(now.setDate(now.getDate() - 2)),
    content: "c",
  },
];

export function getAllComments() {
  // activities.sort((a, b) => b.date - a.date)
  return comments;
}

export function createComment(id: number, user: string, content: string) {
  comments.push({id, user, time: new Date(), content});
  return comments;
}
