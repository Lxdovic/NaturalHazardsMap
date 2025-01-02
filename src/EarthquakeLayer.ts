import L from "leaflet";
import { createLayerComponent, LayerProps } from "@react-leaflet/core";
import { ReactNode } from "react";
import { toQuadKey } from "./utils.ts";

interface EarthquakeProps extends LayerProps {
  children?: ReactNode;
  opacity: number;
}

class Earthquake extends L.TileLayer {
  getTileUrl(coords: L.Coords) {
    const key = toQuadKey(coords.x, coords.y, coords.z);

    return `https://maps.fmglobal.com/v1/tiles/bing/GlobalEQZones/${key}?apikey=0971BE67-574A-4DD8-8F30-A645916219CE`;
  }

  setOpacity(opacity: number) {
    this.options.opacity = opacity;

    return this;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createEarthquakeLayer = (props: EarthquakeProps, context: any) => {
  const instance = new Earthquake("placeholder", { ...props });
  return { instance, context };
};

export const EarthquakeLayer = createLayerComponent(createEarthquakeLayer);
