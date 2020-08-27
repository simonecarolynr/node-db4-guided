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

function findAnimals(zooId) {
	return db("zoos_animals as za")
		.join("zoos as z", "z.id", "za.zoo_id")
		.join("animals as a", "a.id", "za.animal_id")
		.where("z.id", zooId)
		.select("a.*")
}

module.exports = {
	findAnimals,
	find,
	findById
}