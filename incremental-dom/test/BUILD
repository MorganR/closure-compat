load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_binary", "closure_js_library")

closure_js_library(
    name = "main_lib",
    srcs = ["main.js"],
    deps = [
        "//incremental-dom",
    ],
)

closure_js_binary(
    name = "main_bin",
    deps = [":main_lib"],
)
