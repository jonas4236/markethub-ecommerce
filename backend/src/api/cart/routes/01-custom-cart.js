module.exports = {
  routes: [
    {
      method: "DELETE",
      path: "/cart/:username",
      handler: "cart.deleteCartByUsername",
    },
  ],
};
