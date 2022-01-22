import React, { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { Character, ascLvlMin, charAscLvlCap } from "../../util";
import { setCharacter } from "features/team/teamSlice";

type EditCharacterProps = {
  char: Character;
  consImg: string[];
  index: number;
};

export default function EditCharacterModal({
  char,
  consImg,
  index,
}: EditCharacterProps) {
  let lvl = char.level;
  let asc = char.ascension;
  let cons = char.constellation;
  let tal = {
    auto: char.talent.auto,
    skill: char.talent.skill,
    burst: char.talent.burst,
  };

  const dispatch = useAppDispatch();

  const [minLvl, setMinLvl] = useState(ascLvlMin(asc));
  const [maxLvl, setMaxLvl] = useState(charAscLvlCap(asc));

  function handleChange() {
    console.log(
      `lvl: ${lvl} \n asc: ${asc} \n cons: ${cons} \n tal \n auto: ${tal.auto} \n skill: ${tal.skill} \n burst ${tal.burst}`
    );
    let newCharData: Character = {
      key: char.key,
      name: char.name,
      element: char.element,
      icon: char.icon,
      level: lvl,
      constellation: cons,
      ascension: asc,
      talent: { auto: tal.auto, skill: tal.skill, burst: tal.burst },
      weapontype: char.weapontype,
      weapon: char.weapon,
      artifact: {
        flower: char.artifact.flower,
        plume: char.artifact.plume,
        sands: char.artifact.sands,
        goblet: char.artifact.goblet,
        circlet: char.artifact.circlet,
      },
    };
    dispatch(setCharacter({ index: index, data: newCharData }));
  }
  let cloneChar = JSON.parse(JSON.stringify(char));

  return (
    <>
      <div className="font-medium text-lg rounded-md mb-2">{char.name}</div>
      <div className="ml-2">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <span className="flex-grow">Level </span>
            <div className="flex flex-row">
              {Array(6)
                .fill(0)
                .map((e, i) => {
                  return (
                    <span
                      key={i}
                      className={
                        i < asc
                          ? "fill-current text-yellow-400 hover:bg-gray-500 p-1 rounded-md"
                          : "hover:bg-gray-500 p-1 rounded-md"
                      }
                      onClick={() => {
                        asc = asc == i + 1 ? i : i + 1;
                        const min = ascLvlMin(asc);
                        const max = charAscLvlCap(asc);
                        if (lvl > max) {
                          lvl = max;
                          console.log("lvl set to: ", lvl);
                        }
                        if (lvl < min) {
                          lvl = min;
                          console.log("lvl set to: ", lvl);
                        }
                        cloneChar["ascension"] = asc;
                        dispatch(
                          setCharacter({ index: index, data: cloneChar })
                        );
                        handleChange();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
        <label>
          <input
            type="range"
            className="range p-1 mt-2"
            min={minLvl}
            max={maxLvl}
            value={lvl}
            onInput={(e) => {
              //unable to access event value for some reason, need to figure it out
              //lvl = parseInt(e.target.value)
              //handleChange();
            }}
            onChange={(e) => {
              //lvl = parseInt(e.target.value)
              //handleChange();
            }}
          />
        </label>
      </div>
      <div className="flex flex-col mt-4">
        <div className="grid grid-cols-6 gap-2">
          {consImg.map((url, i) => {
            //console.log(url)
            return (
              <div
                className={
                  cons > i
                    ? "rounded-md flex items-center justify-center border-2 border-gray-100 opacity-100 hover:bg-gray-500"
                    : "rounded-md flex items-center justify-center border-2 border-transparent opacity-25 hover:bg-gray-500"
                }
                onClick={() => {
                  cons = cons == i + 1 ? i : i + 1;
                  cloneChar["constellation"] = cons;

                  dispatch(setCharacter({ index: index, data: cloneChar }));
                  handleChange();
                }}
              >
                <img src={url} alt="" className="w-12 h-12" />
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-3 mt-4">
          <div className="flex flex-col ml-2 mt-1 items-center">
            <span>Normal</span>
            <div className="flex flex-row items-center">
              <div className="flex flex-col justify-center text-center rounded-full bg-gray-600 h-10 w-10">
                {tal.auto}
              </div>
              <div className="flex flex-col">
                <div
                  className="rounded-full hover:bg-gray-600"
                  onClick={() => {
                    if (tal.auto < 10) {
                      tal.auto++;
                    }
                    handleChange();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
                <div
                  className="rounded-full hover:bg-gray-600"
                  onClick={() => {
                    if (tal.auto > 0) {
                      tal.auto--;
                    }
                    handleChange();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-2 mt-1 items-center">
            <span>Skill</span>
            <div className="flex flex-row items-center">
              <div className="flex flex-col justify-center text-center rounded-full bg-gray-600 h-10 w-10">
                {tal.skill}
              </div>
              <div className="flex flex-col">
                <div
                  className="rounded-full hover:bg-gray-600"
                  onClick={() => {
                    if (tal.skill < 10) {
                      tal.skill++;
                    }
                    handleChange();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
                <div
                  className="rounded-full hover:bg-gray-600"
                  onClick={() => {
                    if (tal.skill > 0) {
                      tal.skill--;
                    }
                    handleChange();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-2 mt-1 items-center">
            <span>Burst</span>
            <div className="flex flex-row items-center">
              <div className="flex flex-col justify-center text-center rounded-full bg-gray-600 h-10 w-10">
                {tal.burst}
              </div>
              <div className="flex flex-col">
                <div
                  className="rounded-full hover:bg-gray-600"
                  onClick={() => {
                    if (tal.burst < 10) {
                      tal.burst++;
                    }
                    //handleChange();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
                <div
                  className="rounded-full hover:bg-gray-600"
                  onClick={() => {
                    if (tal.burst > 0) {
                      tal.burst--;
                    }
                    //handleChange();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
