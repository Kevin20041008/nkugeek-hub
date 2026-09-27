# Security Policy

NKUGeek Hub is a public open-source website. It does not store account,
application, or registration data. Please still report vulnerabilities privately.

## Supported Versions

The current `main` branch is the supported development target until the first
public release is tagged.

## Reporting a Vulnerability

Send a private report to the maintainers before opening a public issue. Include:

- A short description of the vulnerability.
- Steps to reproduce.
- Impacted pages, build scripts, dependencies, or repository workflows.
- Screenshots or logs when helpful.

Recommended temporary contact: `security@nkugeek.example`.

## Scope

High-priority issues include:

- Stored or reflected XSS in Markdown and project content.
- Dependency or build-pipeline compromise.
- Unsafe handling of engineering files opened by the browser viewer.
- Leaking unpublished research material or contributor contact details.

## Handling

Maintainers should acknowledge a report within 72 hours, triage severity, patch
privately when needed, and publish a security note after users are protected.
