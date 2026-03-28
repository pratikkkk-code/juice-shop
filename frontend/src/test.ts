/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

/**
 * Test Entry Point - loaded by karma.conf.js
 * Initializes the Angular testing environment and discovers all spec files.
 */

import 'zone.js/testing'
import { getTestBed } from '@angular/core/testing'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[]
    <T>(id: string): T
  }
}

// ─── 1. Initialize Angular Testing Environment ───────────────────────────────

try {
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
    {
      /**
       * destroyAfterEach: true — recommended for clean test isolation.
       * Each test gets a fresh TestBed, preventing state leakage between tests.
       * Set to false only if legacy tests rely on shared TestBed state.
       */
      teardown: { destroyAfterEach: true }
    }
  )
} catch (e) {
  // Ignore "Cannot configure testing module" errors thrown if the
  // environment has already been initialized (e.g., in watch mode).
  if (!(e instanceof Error) || !e.message.includes('Cannot configure testing module')) {
    throw e
  }
}

// ─── 2. Discover & Load All Spec Files ───────────────────────────────────────

/**
 * Recursively finds all files matching *.spec.ts under the current directory.
 * Excludes node_modules automatically via Webpack's require.context.
 */
const context = require.context(
  './',      // search root: project src/
  true,      // recursive
  /\.spec\.ts$/  // only *.spec.ts files
)

// Load every discovered spec module so Karma/Jasmine can register the suites.
context.keys().forEach(context)

// ─── 3. Dev Diagnostics (stripped in production builds) ──────────────────────

if (typeof console !== 'undefined') {
  const specFiles = context.keys()
  console.info(`[Test Setup] Discovered ${specFiles.length} spec file(s):`)
  specFiles.forEach((file) => console.debug(`  → ${file}`))
}
