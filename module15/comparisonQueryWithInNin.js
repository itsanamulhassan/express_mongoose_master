// MongoDB implicitly applies an $and when you use multiple fields or multiple conditions at the top level of a query.
// ✅ Example 1: $in with Multiple Conditions (Implicit $and)
db.users.find({
  gender: { $in: ["Female", "Other"] },
  interests: { $in: ["Cooking", "Reading"] },
});

// MongoDB treats this as:
// That means: match if BOTH conditions are true — this is an implicit $and.
{
  $and: [
    { gender: { $in: ["Female", "Other"] } },
    { interests: { $in: ["Cooking", "Reading"] } },
  ];
}

// ✅ If You Want OR Behavior
db.users.find({
  $or: [
    { gender: { $in: ["Female", "Other"] } },
    { interests: { $in: ["Cooking", "Reading"] } },
  ],
});
