# AGENTS.md

Vite + React 18 + TypeScript SPA that builds a resume in a multi-step form and renders it to PDF via `@react-pdf/renderer`. No router, no tests.

## Commands

- Use **pnpm** (workspace file + `packageManager` pins pnpm@11.5.0). Never npm/yarn.
- `pnpm dev` — Vite dev server (port 5173)
- `pnpm build` — `tsc -b && vite build`; this **is** the typecheck. For typecheck alone: `npx tsc -b`
- `pnpm lint` — eslint (baseline is 0 errors / 3 `react-refresh/only-export-components` warnings in context/barrel files; don't chase those)
- No test framework exists — don't invent test commands.
- After React edits, run `npx react-doctor@latest --verbose --diff` (skill: `.agents/skills/react-doctor/SKILL.md`, script: `pnpm doctor`) and fix regressions before committing.
- Add shadcn components with `pnpm dlx shadcn add <name>` (`components.json`: style `radix-mira`).

## Architecture

- Entry: `src/main.tsx` → `App.tsx` → `ResumeFormProvider` wraps `MainForm` + lazy `Previewer`.
- **All state** lives in `src/hooks/useResume.ts` (form, preview, export/import, persistence), exposed via context; components consume `useResumeForm()` from `src/contexts/resume-form-context.tsx`. Keep state logic there, not in components.
- Two parallel render trees that must stay in sync with `src/schema.ts`:
  - Forms: react-hook-form + `zodResolver`, in `src/components/forms/` (barrel `index.ts`).
  - PDF: separate `@react-pdf/renderer` tree in `src/components/pdf/`. `<Resume>` takes the whole resume as props; always pass data through `prepareResumeForPdf` first.
- Data flow: form values → `persistResumeValues` (serializes files, trims) → `useLocalStorage` under key `linkedInResumeFormatData` (autosaved via `form.watch`, 500 ms debounce) and/or `prepareResumeForPdf` (drops empty entries) → Previewer/PDF.
- `src/schema.ts` (Zod) is the single source of truth; types are `z.infer` in `src/types.ts`. Editing a field means editing schema + form + PDF component. `importedResumeSchema` validates imported JSON — schema changes can break older exports and stored localStorage data.

## Gotchas

- File uploads (`header.profilePicture`, `experience.companyLogo`) are `File | string(data URL) | undefined`. They must go through `serializeFileField` (`src/utils.ts`) before persisting or rendering to PDF.
- `@react-pdf/renderer` must be **dynamically imported** (`await import('@react-pdf/renderer')`) when generating blobs (see `Previewer.tsx`). Fonts are registered in `src/components/pdf/styles.ts` via `?url` asset imports (imported once in `main.tsx`).
- Dates are enforced as `YYYY-MM-DD` (`src/date-validation.ts` regex + `date-fns` `isValid`); display formatting lives in `src/utils.ts` (`formatDateRange`).
- Icons: `@hugeicons/react` through wrappers in `src/components/icons/` (barrel `index.ts`, `createIcon` helper). Do not add lucide-react; new shadcn components default to lucide icons — swap them for the local wrappers.
- Path alias `@/*` → `src/*` (vite + tsconfig); always use `@/` imports.
- Theme is next-themes (`class` strategy, localStorage key `theme` — see inline script in `index.html`).
- Deploy is Vercel via `vercel.json` (corepack + pnpm, output `dist`). No CI workflows.
