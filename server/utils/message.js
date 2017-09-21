const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?1=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  }
}

module.exports = {generateMessage, generateLocationMessage};
