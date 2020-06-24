const db = require("../data/config")

function find() {
	return db("animals as a")
		.leftJoin("species as s", "s.id", "a.species_id")
		.select("a.id", "a.name", "s.name as species_name")
}

function findById(id) {
	return db("animals as a")
		.where("a.id", id)
		.leftJoin("species as s", "s.id", "a.species_id")
		.first("a.id", "a.name", "s.name as species_name")
}

module.exports = {
	find,
	findById,
}