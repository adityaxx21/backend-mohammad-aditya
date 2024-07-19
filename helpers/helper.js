module.exports = {
  successResponse: function (statusCode, data = null) {
    return {
      success: true,
      statusCode: statusCode,
      data: data,
    };
  },
  failedResponse: function (statusCode, message = null) {
    return {
      success: false,
      statusCode: statusCode,
      message: message,
    };
  },
  // discountSchema: function (transactions) {
  //   const totalProductPrice = transactions.product;
  //   const totalProductPrice = transactions.totalProductPrice;

  //   const shipping = 
  //   const discount = currentPrice > 15000 ? transactions.discount : 0; // percentage
  //   const discountPrice = currentPrice - discount;
  //   if (condition) {
  //   }
  // },
};
