console.log("--------- End of test 1 ---------");

const getSumTop2 = (arr) => {
  if (arr.length < 2) {
    throw new Error("Array length must be more than 2");
  }
  const sortedArray = [...arr].sort((a, b) => b - a);
  return sortedArray[0] + sortedArray[1];
};

const handleTestCase2 = () => {
  const testCases = [
    { input: [10, 20, 30, 40], expected: 70 }, // Regular case
    { input: [5, 5, 5, 5], expected: 10 }, // All elements are the same
    { input: [-10, -20, -30, -40], expected: -30 }, // All negative numbers
    { input: [1, 2, 3, 4, 5], expected: 9 }, // Sorted in ascending order
    { input: [100, -1, 50, 200], expected: 300 }, // Mixed positive and negative numbers
    { input: [1, 2], expected: 3 }, // Exactly two elements
    { input: [0, 0, 0, 0], expected: 0 }, // All zeros
  ];

  testCases.forEach((testCase, index) => {
    const result = getSumTop2(testCase.input);
    console.assert(
      JSON.stringify(result) === JSON.stringify(testCase.expected),
      `Test case ${index + 1} failed. Expected ${JSON.stringify(
        testCase.expected
      )}, but got ${JSON.stringify(result)}`
    );
  });
  console.log("All test cases passed!");
};

const myArray = [1, 4, 2, 3, 5];
console.log(getSumTop2(myArray));
handleTestCase2()
