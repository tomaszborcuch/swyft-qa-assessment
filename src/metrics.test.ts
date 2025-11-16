
import { movingAverage } from './metrics'

describe('movingAverage', () => {
  test('basic window average', () => {
    expect(movingAverage([2,4,6,8], 2)).toEqual([3,5,7])
  })

  test('should return an empty array for an empty series', () => {
    expect(movingAverage([], 3)).toEqual([]);
  });

  test('should return an empty array when window is zero or negative', () => {
    expect(movingAverage([1, 2, 3], 0)).toEqual([]);
    expect(movingAverage([1, 2, 3], -2)).toEqual([]);
  });

  test('should handle window size greater than series length', () => {
    expect(movingAverage([1, 2, 3], 5)).toEqual([]);
  });

  test('should handle window size of 1 correctly', () => {
    expect(movingAverage([1, 2, 3, 4, 5], 1)).toEqual([1, 2, 3, 4, 5]);
  });

  test('should handle series with negative values', () => {
    expect(movingAverage([-1, -2, -3, -4, -5], 3)).toEqual([-2, -3, -4]);
  });

  test.each([
    { series: [1, 2, 3, 4, 5], window: 3, expected: [2, 3, 4] },
    { series: [10, 20, 30, 40], window: 2, expected: [15, 25, 35] },
  ])('should calculate moving average for series $series with window $window', ({ series, window, expected }) => {
    expect(movingAverage(series, window)).toEqual(expected);
  });
})
