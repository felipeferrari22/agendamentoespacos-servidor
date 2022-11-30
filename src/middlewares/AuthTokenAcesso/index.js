const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  // Authorization: {token}
  const token = req.headers['auth']

  if (token === null)
    return res.status(401).send({message: "Token não informado"})

  jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      (err, payload) => {
          if (err) return res.status(403).send({message: "Token negado"})
          if (payload.exp <= Date.now()) return res.status(410).send({message: "Token expirado"})
          req.payload = payload
          next()
      }
  )
}