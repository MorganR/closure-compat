goog.require("incremental_dom.index");

goog.scope(function () {
  const module = goog.module.get("incremental_dom.index");

  const element = document.createElement("p");

  module.patch(element, function () {
    console.log("patching");
  });

  console.log("Patched");
});
