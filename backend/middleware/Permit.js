const permit = (roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: 'Not authenticated' });
    if (!roles.includes(req.user.role)) return res.status(403).send({ error: 'Not authorized' });
    return next();
  };
};

module.exports = permit;
