const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await db("species"))
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const species = await db("species")
			.where("id", req.params.id)
			.first()

		if (!species) {
			return res.status(404).json({
				message: "Species not found",
			})
		}

		res.json(species)
	} catch(err) {
		next(err)
	}
})

module.exports = router