import "@testing-library/jest-dom/vitest";
import "@solidjs/diagnostics/vitest";
import { cleanup } from "@solidjs/testing-library";
import { afterEach } from "vite-plus/test";

afterEach(cleanup);
