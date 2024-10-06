#!/usr/bin/env node
/* global process:readonly */
import ftp from "basic-ftp";
import fs from "node:fs";
import path from "node:path";
import config from "./deploy.config.js";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const isVerbose = args.verbose || false;
const hooksOnly = args.hooks || false;
  
if (hooksOnly) {
  console.log('uploading only pb_hooks');
}

if (typeof config.project !== "string" || config.project === "") {
  console.log('"project" in ./deploy.config.js is not set');
  process.exit(1);
}

async function uploadDirectory(client, localDir, remoteDir) {
  await client.ensureDir(remoteDir);

  const files = fs.readdirSync(localDir);

  for (const file of files) {
    const fullLocalPath = path.join(localDir, file);
    const fullRemotePath = path.join(remoteDir, file);

    if (fs.lstatSync(fullLocalPath).isDirectory()) {
      await uploadDirectory(client, fullLocalPath, fullRemotePath);
    } else {
      console.log(`Uploading ${fullLocalPath} to ${fullRemotePath}`);
      await client.uploadFrom(fullLocalPath, fullRemotePath);
    }
  }
}

async function main() {
  const client = new ftp.Client();
  client.ftp.verbose = isVerbose;

  try {
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      // secure: true,
    });

    await uploadDirectory(client, "./out/pb_hooks", `/${config.project}/pb_hooks`);
    if (!hooksOnly) {
      await uploadDirectory(client, "./out/pb_public", `/${config.project}/pb_public`);
    }
    console.log("Upload complete!");
  } catch (err) {
    console.error("FTP error:", err);
  }

  client.close();
}

main();
