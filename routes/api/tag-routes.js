const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  const tags = await Tag.findAll({
    // be sure to include its associated Product data
    include: [{ model: Product, through: ProductTag, as: "tag_products" }],
  });

  res.status(200).json(tags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  const tag = await Tag.findByPk(req.params.id, {
    // be sure to include its associated Product data
    include: [{ model: Product, through: ProductTag, as: "tag_products" }],
  });

  res.status(200).json(tag);
});

router.post("/", async (req, res) => {
  let tagProductIds;

  try {
    // create a new tag
    const newtag = await Tag.create(req.body);

    // bulk create product pairings, if specified
    if (req.body.productIds) {
      tagProductsArr = req.body.productIds.map((product_id) => {
        return {
          product_id,
          tag_id: newtag.id,
        };
      });

      tagProductIds = await ProductTag.bulkCreate(tagProductsArr);

      res.status(200).json(tagProductIds);
      return;
    }
    // If no products specified, return new tag
    res.status(200).json(newtag);
    return;
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
