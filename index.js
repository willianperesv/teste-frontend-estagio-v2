const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
const { static } = require("express");
const { send } = require("process");
const e = require("express");
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());
const utilities = require("./utilities");

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.get("/equipment/:model", function (req, res) {
  const equipaments = JSON.parse(
    fs.readFileSync(
      path.join(__dirname + "/assets/data/equipment.json"),
      "utf-8"
    )
  );

  const model = req.params.model;
  var equip = equipaments.filter(function (e) {
    return e.equipmentModelId == model;
  });

  res.send(equip);
});

router.get("/equipmentModel", function (req, res) {
  res.sendFile(path.join(__dirname + "/assets/data/equipmentModel.json"));
});

router.get("/equipmentState", function (req, res) {
  res.sendFile(path.join(__dirname + "/assets/data/equipmentState.json"));
});

router.get("/equipmentStateHistory/:equipmentId", function (req, res) {
  const stateHistoric = JSON.parse(
    fs.readFileSync(
      path.join(__dirname + "/assets/data/equipmentStateHistory.json")
    )
  );

  const equipamentStates = JSON.parse(
    fs.readFileSync(path.join(__dirname + "/assets/data/equipmentState.json"))
  );

  const historicEquipmentId = req.params.equipmentId;

  var equipmentSelected = stateHistoric.find((e) => {
    return e.equipmentId == historicEquipmentId;
  });

  // varre os equipamentos
  equipmentSelected.states.map(state => {
    const unformattedDate = state.date
    state.date = utilities.formatDate(unformattedDate);
    state.time = utilities.formatTime(unformattedDate);
    
    // mescla os dados
    const eqState = equipamentStates.find(es => es.id === state.equipmentStateId)
    state.color = eqState.color;
    state.name = eqState.name;

    return state;
  })

  // ordena por data; ultima primeiro
  equipmentSelected.states.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });

  res.send(equipmentSelected);
});

router.get("/equipmentLastState/:equipmentId", function (req, res) {
  const states = JSON.parse(
    fs.readFileSync(
      path.join(__dirname + "/assets/data/equipmentStateHistory.json"),
      "utf-8"
    )
  );

  const equipmentId = req.params.equipmentId;
  var equipState = states.filter(function (e) {
    return e.equipmentId == equipmentId;
  });
  const statesHistory = equipState[equipState.length - 1].states;
  const lastState = statesHistory[statesHistory.length - 1];
  res.send(lastState.equipmentStateId);
});

router.get("/equipmentState/:id", function (req, res) {
  const typeState = JSON.parse(
    fs.readFileSync(
      path.join(__dirname + "/assets/data/equipmentState.json"),
      "utf-8"
    )
  );

  const stateId = req.params.id;
  var stateInfos = typeState.filter(function (e) {
    return e.id == stateId;
  });

  res.send(stateInfos[0]);
});

router.get("/equipCurrentPosition/:equipmentId", function (req, res) {
  const positions = JSON.parse(
    fs.readFileSync(
      path.join(__dirname + "/assets/data/equipmentPositionHistory.json"),
      "utf-8"
    )
  );

  const idPosition = req.params.equipmentId;
  var posInfos = positions.filter(function (e) {
    return e.equipmentId == idPosition;
  });

  const posHistoric = posInfos[posInfos.length - 1].positions;
  const lastPosition = posHistoric[posHistoric.length - 1];
  console.log(posInfos);
  res.send(lastPosition);
});

app.use(bodyParser.json());
app.use(express.static(__dirname + "/"));
app.use("/", router);
app.listen(3000, () => {
  console.log("Server on!");
});
