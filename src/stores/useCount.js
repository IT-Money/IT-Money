export default function useCount() {
  function useMonthlyAmount(arr = []) {
    const total = arr.reduce((s, v) => Number((s += v.amount)), 0)
    return total
  }

  return { useMonthlyAmount }
}
