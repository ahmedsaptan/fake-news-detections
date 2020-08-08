const tf = require("@tensorflow/tfjs-node");

const fun = async () => {
  const model = await tf.loadLayersModel("./models/model.json");

  const pred = model.predict(["sahhlhk sakhflkkasg hklsjgklsdgasg"]);
  console.log(pred);
};

fun();
