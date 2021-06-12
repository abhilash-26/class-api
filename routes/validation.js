const validation = (query) => {
  if (query !== undefined && query.length !== 0) {
    if (isNaN(query)) {
      const pattern =
        /[0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}/;
      console.log(pattern.test(query));
      if (pattern.test(query)) return true;
    } else if (String(query).length === 10) return true;
  }
  return false;
};

module.exports = validation;
