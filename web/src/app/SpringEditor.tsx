"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import theme from "../../../src/theme";
import { cn } from "@/lib/utils";

export default function SpringEditor() {
  const [bounce, setBounce] = useState("60");
  const [perceptualDuration, setPerceptualDuration] = useState("300");

  return (
    <article className="flex flex-col justify-evenly gap-10 py-10 sm:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 font-mono text-xl sm:items-end">
        <div className="flex">
          <label className="">spring-bounce-</label>

          <Select value={bounce} onValueChange={setBounce}>
            <SelectTrigger className="h-8 w-[7ch] p-0 px-1 text-xl">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(theme.bounceValues).map(([key]) => (
                  <SelectItem
                    className="font-mono text-base"
                    key={key}
                    value={key}
                  >
                    {key}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex">
          <label htmlFor="spring-perceptual-duration">spring-duration-</label>
          <Select
            value={perceptualDuration}
            onValueChange={setPerceptualDuration}
          >
            <SelectTrigger className="h-8 w-[7ch] p-0 px-1 text-xl">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(theme.perceptualDurationValues).map(([key]) => (
                  <SelectItem
                    className="font-mono text-base"
                    key={key}
                    value={key}
                  >
                    {key}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <button
          className={cn(
            "hidden aspect-square w-24 cursor-pointer items-center justify-center rounded-md bg-red-500 text-white transition-transform hover:scale-150 active:scale-90 sm:flex",
            `spring-bounce-${bounce}`,
            `spring-duration-${perceptualDuration}`,
          )}
        >
          Hover me
        </button>
        <label
          className={cn(
            "flex aspect-square w-24 cursor-pointer items-center justify-center rounded-md bg-red-500 text-white transition-transform has-[:checked]:scale-150 sm:hidden",
            `spring-bounce-${bounce}`,
            `spring-duration-${perceptualDuration}`,
          )}
        >
          Touch me
          <input type="checkbox" className="hidden" />
        </label>
      </div>
    </article>
  );
}