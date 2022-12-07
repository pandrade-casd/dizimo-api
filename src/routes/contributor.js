/*
Contributor' Router
This router contains all endpoints for the Tithe entit
*/
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const contributorCtrl = require("../controllers/contributorController");

router.get("/", auth, contributorCtrl.getAll);

// router.get("/:actives", contributorCtrl.getActives);

router.get("/:id", auth, contributorCtrl.get);

router.post("/", auth, contributorCtrl.create);

router.post("/:id", auth, contributorCtrl.update);

router.delete("/:id", auth, contributorCtrl.remove);

router.get("/:id/contribution", auth, contributorCtrl.contributions);

router.post("/:id/contribution", auth, contributorCtrl.addContribution);

router.post("/:id/contribution/:id_contrib", auth, contributorCtrl.updateContribution);

router.delete("/:id/contribution/:id_contrib", auth, contributorCtrl.removeContribution);

router.post("/:id/child", auth, contributorCtrl.addChild);

//router.param('id', contributorCtrl.load);

module.exports = router;
