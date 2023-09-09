var e = (c, o) => () => (o || c((o = { exports: {} }).exports, o), o.exports);
var l = e((t, n) => {
  n.exports = {
    function() {
      console.log("----------------------");
    }
  };
});
export default l();
