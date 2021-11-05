/**
 * This script is used to rename the binary with the platform specific postfix.
 * When `tauri build` is ran, it looks for the binary name appended with the platform specific postfix.
 */

// import execa from "execa";
// import fs from "fs";
const execa = require("execa");
const fs = require("fs");

let extension = "";
if (process.platform === "win32") {
  extension = ".exe";
}

async function main() {
  const rustInfo = (await execa("rustc", ["-vV"])).stdout;
  const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
  if (!targetTriple) {
    console.error("Failed to determine platform target triple");
  }
  fs.renameSync(
    `src-tauri/binaries/gsim${extension}`,
    `src-tauri/binaries/gsim-${targetTriple}${extension}`
  );
}

main().catch((e) => {
  throw e;
});
