exports.up = async function(knex) {
	await knex.schema.createTable("zoos", (table) => {
		table.increments("id")
		table.text("name").notNull()
		table.text("address").notNull().unique()
	})

	await knex.schema.createTable("species", (table) => {
		table.increments("id")
		table.text("name").notNull().unique()
	})

	await knex.schema.createTable("animals", (table) => {
		table.increments("id")
		table.text("name").notNull()
		// creates a foreign key
		table
			// should be the same data type as the primary key we're pointing at
			.integer("species_id")
			.references("id")
			.inTable("species")
			// when the primary key I'm pointing at gets deleted,
			// set the value of this foreign key to null
			.onDelete("SET NULL")
			// when the primary key I'm pointing at gets changed,
			// update this foreign key to match the new value
			.onUpdate("CASCADE")
	})

	await knex.schema.createTable("zoos_animals", (table) => {
		table
			.integer("zoo_id")
			.references("id")
			.inTable("zoos")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
		table
			.integer("animal_id")
			.references("id")
			.inTable("animals")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
		// knex.raw will pass `current_timestamp` without quotes,
		// meaning it's an internal SQL variable, not a literal string
		table.date("from_date").defaultTo(knex.raw("current_timestamp"))
		table.date("to_date")
		// since this table doesn't need an ID column, we can make the
		// primary key a combination of two columns rather than a single one
		table.primary(["zoo_id", "animal_id"])
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("zoos_animals")
	await knex.schema.dropTableIfExists("animals")
	await knex.schema.dropTableIfExists("species")
	await knex.schema.dropTableIfExists("zoos")
}
