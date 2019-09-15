exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("gallery")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("gallery").insert([
        {
          url: "https://source.unsplash.com/collection/781477",
          description: "Self-portrait",
          user_id: 1
        },
        {
          url: "https://source.unsplash.com/collection/781477",
          description: "Self-portrait",
          user_id: 1
        },
        {
          url: "https://source.unsplash.com/collection/781477",
          description: "Self-portrait",
          user_id: 1
        },
        {
          url: "https://source.unsplash.com/collection/781477",
          description: "Self-portrait",
          user_id: 1
        },
        {
          url: "https://source.unsplash.com/collection/781477",
          description: "Self-portrait",
          user_id: 1
        }
      ]);
    });
};
