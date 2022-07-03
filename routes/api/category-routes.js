const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  const categories = await Category.findAll({
    // be sure to include its associated Products
    include: [{ model: Product }],
  });

  res.status(200).json(categories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const category = await Category.findByPk(req.params.id, {
    // be sure to include its associated Products
    include: [{ model: Product }],
  });

  res.status(200).json(category);
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);

    await category.update(req.body);

    await category.save();

    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
