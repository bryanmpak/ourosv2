// fisher-yates shuffle
export function getRandomSubset(arr, k) {
  let n = arr.length
  for (let i = 0; i < k; i++) {
    // Generate a random index between i and n-1
    const j = i + Math.floor(Math.random() * (n - i))
    // Swap arr[i] and arr[j]
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  // Return the first k elements
  return arr.slice(0, k)
}
