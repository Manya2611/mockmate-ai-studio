/// <reference types="vite/client" />

// ElevenLabs custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id': string;
      };
    }
  }
}
