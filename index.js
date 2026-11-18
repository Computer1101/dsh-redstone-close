/**
 * Host half intentionally does nothing.
 *
 * All UI, audio, particles and the close request live in the browser Client
 * half (`client.js`). Keeping this module side-effect free means installing or
 * enabling the bundle never spawns a helper process or opens a port.
 */
export function apply() {}
