import { FsOptions, FsTextFileOption } from "@tauri-apps/api/fs";
import { Command } from "@tauri-apps/api/shell";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { OptionState } from "./configSlice";
import {teamToConfig} from "./convert"
// import pako from "@Pako";
import { useLocation } from "wouter";
import { setResult } from "features/result/resultSlice";
import { Team } from "features/team/teamSlice";


export async function  run(cfg: string, opt: OptionState, team: Team){

    
  const Command = (await import("@tauri-apps/api/shell")).Command;
  const writeFile = (await import("@tauri-apps/api/fs")).writeFile;
  const readBinaryFile = (await import("@tauri-apps/api/fs")).readBinaryFile;
  const tempdir = (await import("@tauri-apps/api/os")).tempdir;
  const saveFile = (await import("@tauri-apps/api/dialog")).save;

    
    
        //combine the configs
        //fix if calc mode
        if (opt.calc) {
          console.log("before ", cfg);
          cfg = calcModeConvert(cfg);
          console.log("after ", cfg);
        }
        if (opt.useBuilder) {
          cfg = teamToConfig(team) + "\n" + cfg;
        }
        //strip out the options line and replace w our own
        cfg = cfg.replace(/^options.*$/m, "");
        //add our own options
        const cust = `options debug=${opt.debug.toString()} iteration=${
          opt.i
        } duration=${opt.d} workers=${opt.w};`;
        // console.log(cust);
        cfg = cust + "\n" + cfg;
    
        console.log(cfg);
    
        let path = "";
    
        tempdir()
          .then((dir) => {
            path = dir;
            console.log(path);
            return writeFile({
              contents: cfg,
              path: path + "/gcsim-input.txt",
            });
          })
          .then(() => {
            let params = [
              "-c=" + path + "/gcsim-input.txt",
              "-js=" + path + "/gcsim-out",
              "-gz",
              "-dh=false",
            ];
            if (opt.calc) {
              params.push("-calc");
            }
            const command = Command.sidecar("gcsim", params);
            return command.execute();
          })
          .then((message) => {
            console.log(message);
            // close();
            if (message.code !== 0) {
            //   open(Error, {
            //     err: `Error running sim (exited with code ${message.code}): ${message.stderr}`,
            //   });
              return Promise.reject("error running sim");
            } else {
              return readBinaryFile(path + "gcsim-out.json.gz");
            }
          })
          .then((data) => {
            //data is bytes array
            // gzipStore.set(data);
            // const restored:string;
            // // const restored = pako.inflate(new Uint8Array(data), { to: "string" });
            // const result = JSON.parse(restored);
            // result.ok = true;
            // dispatch(setResult(result));
            // // console.log($resultStore);
            //otherwise save the result and load the results page
            // setLocation("/result");
          });
    
        //pop open a modal with clock on it as long as we're still loading
        // open(Loader, {}, { closeOnEsc: false, closeOnOuterClick: false });

}

export function calcModeConvert(cfg:string) {
    //valid symbols are q,e,n,a,c,j,d (with a number)
    let skill = /\b(e)(\d?)\b/gm;
    let burst = /\b(q)(\d?)\b/gm;
    let attack = /\b(n)(\d?)\b/;
    let charge = /\b(c)(\d?)\b/gm;
    let low_lunge = /\b(p)(\d?)\b/gm;
    let aim = /\b(a)(\d?)\b/gm;
    let dash = /\b(d)(\d?)\b/gm;
    let jump = /\b(j)(\d?)\b/gm;
  
    //find and replace in cfg
    cfg = cfg.replace(skill, "skill:$2");
    cfg = cfg.replace(burst, "burst:$2");
    cfg = cfg.replace(attack, "attack:$2");
    cfg = cfg.replace(charge, "charge:$2");
    cfg = cfg.replace(low_lunge, "low_lunge:$2");
    cfg = cfg.replace(aim, "aim:$2");
    cfg = cfg.replace(dash, "dash:$2");
    cfg = cfg.replace(jump, "jump:$2");
  
    cfg = cfg.replace(/:(?!\d)/gm, "");
    return cfg;
  }