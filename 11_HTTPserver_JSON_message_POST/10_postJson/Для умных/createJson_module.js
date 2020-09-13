exports.createResp = (obj) => {
  let resStr = `{"__comment": "Ответ",
    "x_plus_y": ${obj.x + obj.y};
}`;
  return resStr;
};
