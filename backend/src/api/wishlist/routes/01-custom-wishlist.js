module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/wishlist/new-username/:username",
      handler: "wishlist.updateWishlistUsername",
    },
  ],
};
