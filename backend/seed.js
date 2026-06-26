const prisma = require('./db/prisma');

async function main() {
  console.log("Seeding dummy problems into the database...");

  // Problem 1: Two Sum
  const p1 = await prisma.problem.create({
    data: {
      title: "Two Sum",
      description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
      timeLimitMs: 2000,
      memLimitMb: 256,
      testCases: {
        create: [
          { input: "[2,7,11,15]\n9", output: "[0,1]", isHidden: false },
          { input: "[3,2,4]\n6", output: "[1,2]", isHidden: false },
          { input: "[3,3]\n6", output: "[0,1]", isHidden: true } // Hidden testcase!
        ]
      }
    }
  });

  // Problem 2: Palindrome Check
  const p2 = await prisma.problem.create({
    data: {
      title: "Palindrome Number",
      description: "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.",
      timeLimitMs: 2000,
      memLimitMb: 256,
      testCases: {
        create: [
          { input: "121", output: "true", isHidden: false },
          { input: "-121", output: "false", isHidden: false }
        ]
      }
    }
  });

  console.log("Database seeded successfully! Added:", p1.title, "and", p2.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });