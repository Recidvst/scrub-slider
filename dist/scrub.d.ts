interface ScrubConfig {
  target: string;
  height?: string;
  handle?: boolean;
  src?: [string, string] | null;
  alt?: [string, string] | null;
}
declare function Scrub(scrubArg: string | ScrubConfig): void;
export default Scrub;
