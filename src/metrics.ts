
export function movingAverage(series: number[], window: number): number[] {
  const out: number[] = [];

  // Handle invalid window sizes
  if (window <= 0 || window > series.length) {
    return out;
  }

  // Calculate the sum for the first window
  let sum = 0;
  for (let i = 0; i < window; i++) {
    sum += series[i];
  }
  out.push(sum / window);

  // Slide the window for subsequent calculations
  for (let i = window; i < series.length; i++) {
    sum += series[i] - series[i - window]; // Add new element, remove old element
    out.push(sum / window);
  }

  return out;
}
