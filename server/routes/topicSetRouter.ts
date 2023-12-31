import express from "express";
import topicSetCtrl from "../controller/topicSetCtrl";

const router = express.Router();

router.get("/topicSets/:topic", topicSetCtrl.getTopicSets);

router.get("/topicSets/:topicSetId", topicSetCtrl.getTopicSet);

router.post("/topic-set", topicSetCtrl.createTopicSet);

router.delete("/topic-set/:topicSetId", topicSetCtrl.deleteTopicSet);

export default router;
