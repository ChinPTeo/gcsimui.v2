import { artifacts } from "genshin-db";
import React, { useState } from "react";
import { Character, Artifact, toKey, staticPath, SlotKey } from "../../util";

export interface AllCharArtifacts {
  flower: Artifact;
  plume: Artifact;
  sands: Artifact;
  goblet: Artifact;
  circlet: Artifact;
}

let allsets = [
  { value: "Adventurer", label: "Adventurer" },
  { value: "ArchaicPetra", label: "Archaic Petra" },
  { value: "Berserker", label: "Berserker" },
  { value: "BlizzardStrayer", label: "Blizzard Strayer" },
  { value: "BloodstainedChivalry", label: "Bloodstained Chivalry" },
  { value: "BraveHeart", label: "Brave Heart" },
  { value: "CrimsonWitchOfFlames", label: "Crimson Witch of Flames" },
  { value: "DefendersWill", label: "Defender's Will" },
  { value: "EmblemOfSeveredFate", label: "Emblem of Severed Fate" },
  { value: "Gambler", label: "Gambler" },
  { value: "GladiatorsFinale", label: "Gladiator's Finale" },
  { value: "HeartOfDepth", label: "Heart of Depth" },
  { value: "Instructor", label: "Instructor" },
  { value: "Lavawalker", label: "Lavawalker" },
  { value: "LuckyDog", label: "Lucky Dog" },
  { value: "MaidenBeloved", label: "Maiden Beloved" },
  { value: "MartialArtist", label: "Martial Artist" },
  { value: "NoblesseOblige", label: "Noblesse Oblige" },
  { value: "PaleFlame", label: "Pale Flame" },
  { value: "PrayersForDestiny", label: "Prayers for Destiny" },
  { value: "PrayersForIllumination", label: "Prayers for Illumination" },
  { value: "PrayersForWisdom", label: "Prayers for Wisdom" },
  { value: "PrayersToSpringtime", label: "Prayers to Springtime" },
  { value: "ResolutionOfSojourner", label: "Resolution of Sojourner" },
  { value: "RetracingBolide", label: "Retracing Bolide" },
  { value: "Scholar", label: "Scholar" },
  { value: "ShimenawasReminiscence", label: "Shimenawa's Reminiscence" },
  { value: "TenacityOfTheMillelith", label: "Tenacity of the Millelith" },
  { value: "TheExile", label: "The Exile" },
  { value: "ThunderingFury", label: "Thundering Fury" },
  { value: "Thundersoother", label: "Thundersoother" },
  { value: "TinyMiracle", label: "Tiny Miracle" },
  { value: "TravelingDoctor", label: "Traveling Doctor" },
  { value: "ViridescentVenerer", label: "Viridescent Venerer" },
  { value: "WanderersTroupe", label: "Wanderer's Troupe" },
];

export default function EditArtifactModal({
  inArtifact,
}: //   handleChange,
{
  inArtifact: Artifact;
  //   handleChange: (slot: SlotKey | "") => void;
}) {
  let artifact = JSON.parse(JSON.stringify(inArtifact));
  console.log("pepegamundo");
  //   export let artifact = {
  //     setKey: "", //e.g. "GladiatorsFinale"
  //     slotKey: "", //e.g. "plume"
  //     icon: "",
  //     level: 0, //0-20 inclusive
  //     rarity: 5, //1-5 inclusive
  //     mainStatKey: "hp",
  //     location: "", //where "" means not equipped.
  //     lock: false, //Whether the artifact is locked in game.
  //     substats: [],
  //   };

  //   let sets = genshindb.artifacts("4", { matchCategories: true });

  // let subs = [
  //   { key: "hp", label: "HP%/HP", val_: 0, val: 0, icon: IconHP },
  //   { key: "atk", label: "Atk%/Atk", val_: 0, val: 0, icon: IconAttack },
  //   { key: "def", label: "Def%/Def", val_: 0, val: 0, icon: IconDefense },
  //   { key: "eleMas", label: "EM", val_: 0, val: 0, icon: IconEM },
  //   { key: "enerRech_", label: "ER", val_: 0, val: 0, icon: IconER },
  //   { key: "critRate_", label: "CR", val_: 0, val: 0, icon: IconCR },
  //   { key: "critDMG_", label: "CD", val_: 0, val: 0, icon: IconCD },
  // ];
  let subs = artifact.substats.slice();

  // //   calculate sub values
  //     for (let i = 0; i < subs.length; i++) {
  //       subs[i].val = 0;
  //       subs[i].val_ = 0;

  //       artifact.substats.forEach((v) => {
  //         //check if key matches

  //         if (!v.key.includes(subs[i].key)) {
  //           return;
  //         }

  //         //grab value
  //         let val = 0;
  //         let val_ = 0;
  //         if (v.key.includes("_")) {
  //           val_ = v.value;
  //         } else {
  //           val = v.value;
  //         }
  //         // console.log(
  //         //   subs[i].key,
  //         //   " found ok: ",
  //         //   v,
  //         //   " values: ",
  //         //   val,
  //         //   " %: ",
  //         //   val_
  //         // );
  //         //stick it in
  //         subs[i].val += val;
  //         subs[i].val_ += val_;
  //         // console.log(subs[i]);
  //       });
  //     }
  console.log(subs);
  subs = subs;

  var regDec = new RegExp(/^(\d+)?(\.)?\d+$/);

  const onChange = () => {
    // handleChange("");
  };

  // const onSubsChange = () => {
  //   //just build a new sub tree
  //   let next = [];
  //   subs.forEach((sub) => {
  //     //if hp/atk/def
  //     if (sub.key.includes("/")) {
  //       if (sub.val > 0) {
  //         next.push({
  //           key: sub.key,
  //           value: sub.val,
  //         });
  //       }
  //       if (sub.val_ > 0) {
  //         next.push({
  //           key: sub.key + "_",
  //           value: sub.val_,
  //         });
  //       }
  //       return;
  //     }
  //     //for the rest
  //     if (sub.key.includes("_")) {
  //       if (sub.val_ > 0) {
  //         next.push({
  //           key: sub.key,
  //           value: sub.val_,
  //         });
  //       }
  //     } else if (sub.val > 0) {
  //       next.push({
  //         key: sub.key,
  //         value: sub.val,
  //       });
  //     }
  //   });
  //   artifact.substats = next;
  // //   handleChange(artifact);
  // };
  return (
    <div>
      {artifact && (
        <div className="flex flex-col edit-content bg-gray-700 p-4 rounded-md shadow edit-content">
          <div className="h-10 flex flex-row items-center">
            <div className="font-medium text-lg rounded-md capitalize">
              {artifact.slotKey}
            </div>
            {artifact.icon !== "" ? (
              <img
                src={artifact.icon}
                alt="artifact"
                // name={artifact.slotKey}
                className="h-10 w-auto"
              />
            ) : (
              <></>
            )}
          </div>
          <div>
            <div className="flex flex-col gap-2 p-4 text-sm w-full">
              <div className="w-full rounded-md flex flex-row focus-within:ring focus-within:border-blue-300">
                <select
                  className="p-2 w-full rounded-md bg-gray-800"
                  onChange={(e) => {
                    let key = toKey(e.target.value);
                    artifact.setKey = key;
                    artifact.icon = `${staticPath.artifacts}/${key}_${artifact.slotKey}.png`;
                    onChange();
                  }}
                >
                  <option selected={artifact.setKey === ""}>
                    Choose an artifact set
                  </option>
                  {allsets.map((set) => (
                    <option value={set.value}>{set.label}</option>
                  ))}
                </select>
              </div>
              <div className="w-full rounded-md flex flex-row gap-2 items-center">
                <div className="ml-2 w-40">Main Stat</div>
                {/* <select
          className="p-2 w-full rounded-md bg-gray-800"
          onChange={(e) => {
            artifact.mainStatKey = e.target.value;
            onChange();
          }}
        >
          <option disabled="disabled" selected="selected"
            >Choose main stat</option
          >
          {#each slotMainStat(artifact.slotKey) as s, index (index)}
            <option selected={artifact.mainStatKey === s} value={s}
              >{statToString(s)}</option
            >
          {/each}
        </select> */}
              </div>
              <div className="w-full rounded-md flex flex-row gap-2 items-center">
                <div className="ml-2 w-40">Level {artifact.level}</div>
                <input
                  type="range"
                  className="range p-1 mt-2"
                  min={0}
                  max={20}
                  value={artifact.level}
                  //   on:input={(e) => {
                  //     artifact.level = parseInt(e.target.value);
                  //     onChange();
                  //   }}
                  onChange={(e) => {
                    artifact.level = parseInt(e.target.value);
                    onChange();
                  }}
                />
              </div>
            </div>

            {/* <div className="flex flex-col w-full text-sm">
      <div className="flex flex-row">
        <div className="font-medium text-md">Substats</div>
      </div>
      {#each subs as sub, index (index)}
        <div className="flex flex-row ml-2 p-1">
          <div className="flex-grow flex flex-row items-center">
            <div className="w-5 mr-2">
              <svelte:component this={sub.icon} />
            </div>
            <div>{sub.label}</div>
          </div>
          {#if sub.key.includes("_") || sub.label.includes("/")}
            <div
              className="ml-4 mr-4 rounded-md flex flex-row focus-within:ring focus-within:border-blue-300"
            >
              <input
                type="number"
                step="any"
                placeholder="enter percentage"
                className="w-40 p-2 rounded-l-md bg-gray-800 text-right focus:outline-none invalid:text-red-500"
                value={sub.val_}
                on:input={(e) => {
                  const val = e.target.value;
                  //first we need to sanitize the value
                  if (regDec.test(val)) {
                    e.target.setCustomValidity("");
                    sub.val_ = parseFloat(val);
                    onSubsChange();
                    return;
                  }
                  e.target.setCustomValidity("invalid input");
                }}
              />
              <div
                className="p-1 pr-3 w-6 rounded-r-md bg-gray-800 items-center flex"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="percent"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  ><path
                    fill="currentColor"
                    d="M374.6 73.39c-12.5-12.5-32.75-12.5-45.25 0l-320 320c-12.5 12.5-12.5 32.75 0 45.25C15.63 444.9 23.81 448 32 448s16.38-3.125 22.62-9.375l320-320C387.1 106.1 387.1 85.89 374.6 73.39zM64 192c35.3 0 64-28.72 64-64S99.3 64.01 64 64.01S0 92.73 0 128S28.7 192 64 192zM320 320c-35.3 0-64 28.72-64 64s28.7 64 64 64s64-28.72 64-64S355.3 320 320 320z"
                  /></svg
                >
              </div>
            </div>
          {/if}
          {#if !sub.key.includes("_") || sub.label.includes("/")}
            <div
              className="ml-4 mr-4 rounded-md flex flex-row focus-within:ring focus-within:border-blue-300"
            >
              <input
                type="number"
                step="any"
                placeholder="enter amount"
                className="w-40 p-2 rounded-l-md bg-gray-800 text-right focus:outline-none invalid:text-red-500"
                value={sub.val}
                on:input={(e) => {
                  const val = e.target.value;
                  //first we need to sanitize the value
                  if (regDec.test(val)) {
                    sub.val = parseFloat(val);
                    e.target.setCustomValidity("");
                    onSubsChange();
                    return;
                  }
                  e.target.setCustomValidity("invalid input");
                }}
              />
              <div className="p-1 w-6 rounded-r-md bg-gray-800 items-center flex" />
            </div>
          {:else}
            <div className="ml-4 mr-4 w-40 " />
            <div className="p-1 w-6" />
          {/if}
        </div>
      {/each}
    </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
