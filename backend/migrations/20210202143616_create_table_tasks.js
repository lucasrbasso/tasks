exports.up = function (knex) {
    return knex.schema.createTable("tasks", (table) => {
        table.increments("id").primary();
        table.string("desc").notNull();
        table.string("estimateAt").notNull().unique();
        table.string("doneAt").notNull();
        table.integer("userId").references("id").inTable("users").notNull();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("tasks");
};
