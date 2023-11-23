export const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();

  }// req.user._id has a objectId type  // req.params.id is a normal string type
  else if (req.user._id.toString() === req.params.id || req.user.orders.includes(req.params.id) ) {
    next();
  } else {
    res.status(401).send("unauthorized access!");
  }
};
