"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import type { PluginChooserEntry } from "@/lib/sheet-schema";

interface PluginChooserSectionProps {
  id?: string;
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

function StarRating({ popularity }: { popularity: number }) {
  const rating = popularity / 2;

  return (
    <span className="starRating" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const starNumber = index + 1;
        const className = rating >= starNumber ? "full" : rating >= starNumber - 0.5 ? "half" : "empty";

        return (
          <span key={starNumber} className={`starIcon ${className}`} aria-hidden="true">
            ★
          </span>
        );
      })}
    </span>
  );
}

export function PluginChooserSection({ id, title, entries }: PluginChooserSectionProps) {
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
    <section id={id} className="sheetSection">
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
        Showing {filtered.length} recommended plugin{filtered.length === 1 ? "" : "s"}
        {instrument !== "All" ? ` for ${instrument}` : ""}
        {pluginType !== "All" ? ` in ${pluginType}` : ""}
      </p>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Plugin</th>
              <th>Type</th>
              <th>Rating</th>
              <th>Hardware / Mode</th>
              <th>{instrument === "All" ? "Best On" : `${instrument} Context`}</th>
              <th>Known For</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((plugin) => (
              <tr key={plugin.name}>
                <td data-label="Plugin">{plugin.name}</td>
                <td data-label="Type">{plugin.type}</td>
                <td data-label="Rating">
                  <StarRating popularity={plugin.popularity} />
                </td>
                <td data-label="Hardware / Mode">{plugin.emulation}</td>
                <td data-label={instrument === "All" ? "Best On" : `${instrument} Context`}>{plugin.bestOn}</td>
                <td data-label="Known For">{plugin.knownFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
