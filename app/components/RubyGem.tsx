"use client";

import { ruby } from "../lib/ruby-renderer";
import Gemstone from "./Gemstone";

// Retained for a future placement.
export default function RubyGem() {
  return <Gemstone spec={ruby} label="round brilliant ruby" />;
}
