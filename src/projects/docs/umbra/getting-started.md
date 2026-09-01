# Getting started

Two ways in. Pick the one that matches what you are building, then run the
refusal at the bottom so you have watched the boundary hold once.

## Install umbra

`umbra` reads KDL policy plus committed locks and builds a standalone guarded
CLI, with no hand-written Go.

```sh
brew tap coilyco-flight-deck/tap https://forgejo.coilysiren.me/coilyco-flight-deck/homebrew-tap
brew install coilyco-flight-deck/tap/umbra
```

```powershell
scoop bucket add coilyco-flight-deck https://forgejo.coilysiren.me/coilyco-flight-deck/scoop-bucket
scoop install coilyco-flight-deck/umbra
```

Tagged releases also publish raw binaries and `SHA256SUMS` for Linux, macOS, and
Windows on amd64 and arm64. umbra shells out to the Go toolchain to resolve
locks and build, so Go has to be present.

## Or import the primitives

Every package stands alone if you are adding a boundary to an existing
[urfave/cli](https://github.com/urfave/cli) v3 app.

```sh
GOPRIVATE=forgejo.coilysiren.me go get forgejo.coilysiren.me/coilyco-flight-deck/umbra
```

## See a refusal

The shortest runnable example rejects a shell metacharacter before `execve`:

```sh
go run ./examples/policy unsafe 'foo; rm -rf /'
```

[`examples/`](../examples/) holds one app per primitive, and its README gives a
reading order from the minimum useful program up to the network gate.

## Next

[The no-code driver](umbra-cli.md) covers authoring the guardfile.
[Architecture](architecture.md) covers the two surfaces underneath it.
