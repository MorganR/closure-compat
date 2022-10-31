load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

closure_js_library(
    name = "incremental-dom",
    srcs = glob(include = [
        "*.js",
        "src/*.js",
    ]),
    suppress = [
        "JSC_REQUIRES_NOT_SORTED",
        "JSC_WRONG_NUMBER_OF_PARAMS",
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
    deps = ["//tslib"],
)
