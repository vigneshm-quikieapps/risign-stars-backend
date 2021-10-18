const calculateSubtotal = (items) => {
  return items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
};

module.exports = calculateSubtotal;
