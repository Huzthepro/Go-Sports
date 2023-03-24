import jasonWebToken from "jsonwebtoken";
import userCollection from "../models/userModel.js";

// verify authentication
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  //Taking token:'bearer aad123dada'
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jasonWebToken.verify(token, process.env.JWT_SECRET);
    //We will add user to all requests if they use this middleware. Req now has user which is _id
    req.user = await userCollection.findById({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
