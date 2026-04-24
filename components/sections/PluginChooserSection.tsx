"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import type { PluginChooserEntry } from "@/lib/sheet-schema";

interface PluginChooserSectionProps {
  title: string;
  entries: PluginChooserEntry[];
}

const instrumentOptions = [
  "Bass",
  "Guitar",
  "Kick",
  "Snare",
  "Toms",
  "Overheads",
  "Room Mic",
  "Vocals",
  "Drums",
  "Synths",
  "Keys",
  "Mix Bus",
  "Master Bus",
];

function matchesInstrument(bestOn: string, instrument: string): boolean {
  const value = bestOn.toLowerCase();

  const aliases: Record<string, string[]> = {
    Bass: ["bass", "sub"],
    Guitar: ["guitar", "guitars"],
    Kick: ["kick"],
    Snare: ["snare"],
    Toms: ["tom", "toms"],
    Overheads: ["overhead", "overheads"],
    "Room Mic": ["room mic", "room mics", "room"],
    Vocals: ["vocal", "vocals", "voice", "voiceover"],
    Drums: ["drum", "drums"],
    Synths: ["synth", "synths"],
    Keys: ["keys", "piano", "keyboard"],
    "Mix Bus": ["mix bus", "bus", "buses", "full mix"],
    "Master Bus": ["master bus", "mastering"],
  };

  const tokens = aliases[instrument] ?? [instrument.toLowerCase()];
  return tokens.some((token) => value.includes(token));
}

export function PluginChooserSection({ title, entries }: PluginChooserSectionProps) {
  const [instrument, setInstrument] = useState("All");
  const [pluginType, setPluginType] = useState("All");

  const pluginTypeOptions = useMemo(() => {
    return ["All", ...new Set(entries.map((item) => item.type).sort((a, b) => a.localeCompare(b)))];
  }, [entries]);

  const filtered = useMemo(() => {
    return entries
      .filter((entry) => {
        if (instrument === "All") {
          return true;
        }

        return matchesInstrument(entry.bestOn, instrument);
      })
      .filter((entry) => {
        if (pluginType === "All") {
          return true;
        }

        return entry.type === pluginType;
      })
      .sort((a, b) => b.popularity - a.popularity || a.name.localeCompare(b.name));
  }, [entries, instrument, pluginType]);

  return (
    <section className="sheetSection">
      <h2 className="sectionHeading">
        <FontAwesomeIcon icon={faSliders} className="sectionHeadingIcon" />
        {title}
      </h2>

      <div className="chooserControls">
        <label className="chooserLabel">
          Instrument / Bus
          <select value={instrument} onChange={(event) => setInstrument(event.target.value)}>
            <option value="All">All</option>
            {instrumentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="chooserLabel">
          Plugin Type
          <select value={pluginType} onChange={(event) => setPluginType(event.target.value)}>
            {pluginTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="chooserResults">
        Showing {filtered.length} plugin{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Plugin</th>
              <th>Type</th>
              <th>Popularity (1-10)</th>
              <th>Hardware / Mode</th>
              <th>Best On</th>
              <th>Known For</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((plugin) => (
              <tr key={plugin.name}>
                <td>{plugin.name}</td>
                <td>{plugin.type}</td>
                <td>{plugin.popularity}</td>
                <td>{plugin.emulation}</td>
                <td>{plugin.bestOn}</td>
                <td>{plugin.knownFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
