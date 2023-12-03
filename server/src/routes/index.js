export const route = (app) => {
  app.use("/api", (req, res) => {
    res.json({
      print: "hello world",
    });
  });
};
