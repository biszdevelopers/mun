"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import styles from "./ThemeSelect.module.css";

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const labelId = useId();
  useEffect(() => setMounted(true), []);

  return (
    <div className={styles.field}>
      <span id={labelId}>Appearance</span>
      <Select value={mounted ? theme : "system"} onValueChange={setTheme} disabled={!mounted}>
        <SelectTrigger aria-labelledby={labelId}><SelectValue /></SelectTrigger>
        <SelectContent side="top" align="end">
          <SelectItem value="system">System</SelectItem>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
