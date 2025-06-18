// 📌 Aggregation Query
db.test.aggregate([
  // Stage 1: Filtering documents
  {
    $match: {
      gender: "Male",
      age: { $lte: 18 },
    },
  },

  // Stage 2: Projecting specific fields
  {
    $project: {
      name: 1,
      _id: 1,
      gender: 1,
      age: 1,
    },
  },
]);

// 🧠 Explanation:
// 🔹 $match
// -  Filters documents in the collection.
// -  Similar to the .find() filter.
// -  Here, it's selecting documents where:
// -  gender is "Male"
// -  age is less than or equal to 18

// 🔹 $project
// -  Specifies which fields to include or exclude in the output.
// -  In this case:
// -  Including: name, _id, gender, age
