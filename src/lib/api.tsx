const url = "https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet";

// Redundant API, FireBase connection replaced this

export function getAllComments() {
  return fetch(url);
}

export function createComment(userName: string, content: string, date: string) {
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tweet: {
        userName,
        content,
        date,
      },
    }),
  });
}
