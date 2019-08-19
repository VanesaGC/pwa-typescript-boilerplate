const express = require("express"),
  fs = require("fs"),
  path = require("path"),
  dataFile = "/data/categories.json",
  router = express.Router();

const getNextAvailableId = allCategories => {
  let maxId;
  allCategories.reduce((prev, current) => {
    if (current.id > prev.id) {
      maxId = current.id;
    }
    return maxId;
  });
  return ++maxId;
};

const getCategoriesData = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname + dataFile), "utf8"));

const saveCategoryData = data =>
  fs.writeFile(
    path.join(__dirname + dataFile),
    JSON.stringify(data, null, 4),
    err => {
      if (err) {
        console.log(err);
      }
    }
  );

router
  .route("/")
  .get((_, res) => {
    const data = getCategoriesData();
    res.send(data);
  })
  .post((req, res) => {
    const data = getCategoriesData();
    const nextId = getNextAvailableId(data);
    const newCategory = {
      id: nextId,
      name: req.body.name
    };
    data.push(newCategory);
    saveCategoryData(data);

    res.status(201).send(newCategory);
  });

/* GET, PUT and DELETE individual category */
router
  .route("/:id")
  .get((req, res) => {
    var data = getCategoriesData();
    var matchingCategory = data.find(item => item.id === +req.params.id);

    if (!matchingCategory) {
      res.sendStatus(404);
    } else {
      res.send(matchingCategory);
    }
  })
  .delete((req, res) => {
    var data = getCategoriesData();
    var pos = data.map(e => e.id).indexOf(parseInt(req.params.id, 10));

    if (pos > -1) {
      data.splice(pos, 1);
    } else {
      res.sendStatus(404);
    }

    saveCategoryData(data);
    res.sendStatus(204);
  })
  .put((req, res) => {
    var data = getCategoriesData();
    var matchingCategory = data.find(item => item.id === req.params.id);

    if (!matchingCategory) {
      res.sendStatus(404);
    } else {
      matchingCategory.name = req.body.name;

      saveCategoryData(data);
      res.sendStatus(204);
      res.send(matchingCategory);
    }
  });

module.exports = router;
