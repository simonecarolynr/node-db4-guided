
exports.up = async function(knex) {
  await knex.schema.createTable("zoos", tbl => {
      tbl.increments("id")
      tbl.text("name").notNullable()
      tbl.text("address").notNullable().unique()
  })

  await knex.schema.createTable("species", tbl => {
      tbl.increments("id")
      tbl.text("name").notNullable().unique()
  })

  await knex.schema.createTable("animals", tbl => {
      tbl.increments("id")
      tbl.text("name").notNullable()
      tbl.integer("species_id").references("id").inTable("species")
  })

  await knex.schema.createTable("zoos_animals", tbl => {
    tbl.integer("zoo_id").notNullable().references("id").inTable("zoos")
    tbl.integer("animal_id").notNullable().references("id").inTable("animals")
    tbl.date("from_date").notNullable().defaultTo(knex.raw("current_timestamp"))
    tbl.date("to_date")

    tbl.primary(["zoo_id", "animal_id"])
  })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("zoos_animals")
    await knex.schema.dropTableIfExists("animals")
    await knex.schema.dropTableIfExists("species")
    await knex.schema.dropTableIfExists("zoos")
};
