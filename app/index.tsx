import React from "react";
import { ExpoRoot } from "expo-router";

const ctx = require.context("../apps/mobile/app", true, /\\.(js|jsx|ts|tsx)$/);

export default function App() {
  return <ExpoRoot context={ctx} />;
}
