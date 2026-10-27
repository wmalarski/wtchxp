# Patches

`@kobalte__core@2.0.0-alpha.4.patch` wraps reads that happen during component
setup in Kobalte's text-field code. Solid 2 reports those reads as untracked
reactive values even though the affected values (the generated field id and
element refs) are intentionally snapshotted once.

The patch is development-only. Kobalte is a peer dependency, so the patched
files are not part of the published package. Apply the same patch in an app if
you want the text-field diagnostics gone before Kobalte ships a fix.
