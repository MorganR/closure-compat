# Incremental Dom

Closure-compatible version of [incremental-dom](https://github.com/google/incremental-dom).

- **Version:** 2022-10-31 - [commit](https://github.com/google/incremental-dom/commit/3be2338cb18bce102b65a2df3d22add2680fc13e)

## Produced by:

1. Clone the incremental dom repo.
1. Remove the '/test' references in the tsconfig include.
1. Run `node $TSICKLE_PATH --module google3.third_party.javascript.incremental_dom --mr tslib/google3.third_party.javascript.tslib.tslib -- -p ./ --sourceMap false`

