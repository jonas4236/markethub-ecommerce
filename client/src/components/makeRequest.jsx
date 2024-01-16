import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization:
      "bearer " +
      "6ad17dd2b34d077e0c5f0d2357575eb756243e12c9b812606fe92da743e133aff6aa0ff58317af379aa7ab66129b8890ee9efaa11f223aabdae21565d7aae35ff1f9cc0f04084e724d53aeae0674bfd352766713157adfe2ef294105e175285436c92fef8873b6f3c3213495f457e9766c528ca9154800511bea3f3f87723d58",
  },
});
