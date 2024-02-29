module.exports = {
  routes: [
    {
      method: "DELETE",
      path: "/cart/:username",
      handler: "cart.deleteCartByUsername",
    },
    {
      method: "PUT",
      path: "/stock/:username",
      handler: "cart.updateStock",
    },
  ],
};
