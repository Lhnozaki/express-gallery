exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("gallery")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("gallery").insert([
        {
          url:
            "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
          description: "Don't look back in anger",
          user_id: 1
        },
        {
          url:
            "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          description: "Sophistication",
          user_id: 1
        },
        {
          url:
            "https://images.unsplash.com/photo-1523626797181-8c5ae80d40c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          description: "A Good Boy",
          user_id: 1
        },
        {
          url:
            "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          description: "Sweater-Weather",
          user_id: 1
        },
        {
          url:
            "https://images.unsplash.com/photo-1530041587872-d823b3d4bed7?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
          description: "A Rainy Day.",
          user_id: 1
        },
        {
          url:
            "https://images.unsplash.com/photo-1534432586043-ead5b99229fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=992&q=80",
          description: "First Date",
          user_id: 1
        }
      ]);
    });
};
