const express = require("express")
const router = express.Router()
const controller = require("../controller/musicController")


router.get("/", controller.getAllMusic)

router.post("/", controller.createMusic)

router.get("/:id", controller.getMusic)

router.put("/:id", controller.updateMusic)

router.patch("/:id/watched", controller.updateHeardStatus)

router.delete("/:id", controller.deleteMusic)

module.exports = router