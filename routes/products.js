const route = require("express").Router();
const _ = require("lodash");
const uuid = require("uuid/v4");
const fs = require("fs");

route.get("/:product_id", (req, res) => {
  const productiiid = req.params.product_id;
  const raaawdaattaa = fs.readFileSync("humareproducts.json");
  const humareproducts = JSON.parse(raaawdaattaa);

  const data = _.find(humareproducts, ["id", productiiid]);
  if (data) {
    delete data.id;
    return res.status(200).send({
      data,
    });
  }
  return res.status(404).send({});
});

route.post("/", (req, res) => {
  const id = uuid();
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const buy_price = req.body.buy_price;
  const sell_price = req.body.sell_price;
  const quantity = req.body.quantity;
  if (name && category && description && buy_price && sell_price && quantity > 0) {
    const raaawdaattaa = fs.readFileSync("humareproducts.json");
    const humareproducts = JSON.parse(raaawdaattaa);//
    const product = {//
      id,
      name,
      category,
      description,
      buy_price,
      sell_price,
      quantity,
    };
    humareproducts.push(product);
    const data = JSON.stringify(humareproducts);
    fs.writeFileSync("humareproducts.json", data);
    return res.status(201).send({
      ...product,
    });
  }
  return res.status(400).send({
    status: "failure",
    explanation: "Bad request",
  });
});

// Assuming product to be name of product
route.delete("/:product", (req, res) => {
  const product = req.params.product;
  const raaawdaattaa = fs.readFileSync("humareproducts.json");

  const humareproducts = JSON.parse(raaawdaattaa);
  const isPresent = _.find(humareproducts, ["name", product]);
  if (isPresent) {
    _.remove(humareproducts, p => p.name === product);
    fs.writeFileSync("humareproducts.json", JSON.stringify(humareproducts));

    return res.status(200).send({
      status: "success",
    });
  } else {
    return res.status(404).send({
      status: "failure",
      reason: "Not found",
    });
  }
});

route.put("/:product_id", (req, res) => {
  const productiiid = req.params.product_id;
  const raaawdaattaa = fs.readFileSync("humareproducts.json");
  const humareproducts = JSON.parse(raaawdaattaa);

  if (req.body.quantity < 0) {
    return res.status(404).send({
      status: "failure",
      reason: "Quantity can not be negative",
    });
  }

  var index = _.indexOf(humareproducts, _.find(humareproducts, ["id", productiiid]));
  if (index >= 0) {
    if (req.body.name) humareproducts[index].name = req.body.name;
    if (req.body.category) humareproducts[index].category = req.body.category;
    if (req.body.description) humareproducts[index].description = req.body.description;
    if (req.body.buy_price) humareproducts[index].buy_price = req.body.buy_price;
    if (req.body.sell_price) humareproducts[index].sell_price = req.body.sell_price;
    if (req.body.quantity) humareproducts[index].quantity = req.body.quantity;
    fs.writeFileSync("humareproducts.json", JSON.stringify(humareproducts));

    return res.status(200).send({
      status: "success",
    });
  } else {
    return res.status(400).send({
      status: "failure",
      reason: "Bad request",
    });
  }
});

module.exports = route;
