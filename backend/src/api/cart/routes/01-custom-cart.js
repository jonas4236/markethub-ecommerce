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
    {
      method: "PUT",
      path: "/new-username/:username",
      handler: "cart.updateUsernameOfUser",
    },
  ],
};
