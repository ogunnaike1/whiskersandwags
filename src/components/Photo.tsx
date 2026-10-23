import Image from "next/image";
import type { Photo as P } from "@/lib/images";

/** Fills its (positioned) parent with a cropped photo. */
export default function Photo({ photo, sizes, priority = false }: { photo: P; sizes: string; priority?: boolean }) {
  return <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover", objectPosition: photo.pos ?? "50% 50%" }} />;
}
