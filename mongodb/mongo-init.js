// This script runs on first initialization only.
// It creates a sample database, collection, and inserts seed data.

db = db.getSiblingDB("appdb");

db.createUser({
  user: "appuser",
  pwd: "changeme",
  roles: [
    { role: "readWrite", db: "appdb" }
  ]
});

db.createCollection("items");

db.items.insertMany([
  {
    name: "Sample Item 1",
    description: "This is a sample document",
    category: "general",
    tags: ["sample", "seed-data"],
    createdAt: new Date(),
    active: true
  },
  {
    name: "Sample Item 2",
    description: "Another sample document",
    category: "general",
    tags: ["sample", "seed-data"],
    createdAt: new Date(),
    active: true
  },
  {
    name: "Sample Item 3",
    description: "A third sample document",
    category: "testing",
    tags: ["sample", "test"],
    createdAt: new Date(),
    active: false
  }
]);

db.items.createIndex({ name: 1 });
db.items.createIndex({ category: 1, active: 1 });

print("Database initialized with sample data.");
