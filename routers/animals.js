const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		const animals = await db("animals as a")
			.leftJoin("species as s", "s.id", "a.species_id")
			.select("a.id", "a.name", "s.name as species_name")

		res.json(animals)
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const animal = await db("animals")
			.where("id", req.params.id)
			.first()

		if (!animal) {
			return res.status(404).json({
				message: "Animal not found",
			})
		}

		res.json(animal)
	} catch(err) {
		next(err)
	}
})

module.exports = router