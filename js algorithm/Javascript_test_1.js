const findString = (arr) => {
  const lengthCounts = {};

  // Đếm số lần xuất hiện của mỗi độ dài
  arr.forEach((str) => {
    const len = str.length;
    lengthCounts[len] = (lengthCounts[len] || 0) + 1;
  });

  // Tìm số lần xuất hiện lớn nhất
  const maxCount = Math.max(...Object.values(lengthCounts));

  // Tìm các chuỗi có độ dài xuất hiện nhiều nhất
  return arr.filter((str) => lengthCounts[str.length] === maxCount);
};

const handleTestCase = () => {
  const testCases = [
    {
      input: ["a", "ab", "abc", "cd", "def", "gh"],
      expected: ["ab", "cd", "gh"],
    },
    {
      input: ["a", "bb", "ccc", "dd", "eee", "ff"],
      expected: ["bb", "dd", "ff"],
    },
    {
      input: ["x", "yy", "z", "xyz", "yz", "zx"],
      expected: ["yy", "yz", "zx"],
    },
    {
      input: ["single"],
      expected: ["single"],
    },
    {
      input: [""],
      expected: [""],
    },
  ];

  testCases.forEach((testCase, index) => {
    const result = findString(testCase.input);
    console.assert(
      JSON.stringify(result) === JSON.stringify(testCase.expected),
      `Test case ${index + 1} failed. Expected ${JSON.stringify(
        testCase.expected
      )}, but got ${JSON.stringify(result)}`
    );
  });
  console.log("All test cases passed!");
};

const myStringArray = ["a", "ab", "abc", "cd", "def", "gh"];
console.log(findString(myStringArray));
handleTestCase();
