# Security policy

## Supported versions

Security fixes are provided for the latest released major version.

## Reporting a vulnerability

Do not open a public issue for a vulnerability. Email `support@ltesocks.io` with a description, reproduction steps, affected versions, and potential impact. Avoid including active API tokens, webhook secrets, or customer data.

## Credential handling

Bearer tokens and webhook secrets belong only in trusted server environments. Rotate any credential that may have been exposed and remove it from Git history and build artifacts. Never embed an account token in browser or mobile application code.
