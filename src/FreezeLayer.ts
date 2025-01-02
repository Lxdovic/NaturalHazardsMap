import L from "leaflet";
import { createLayerComponent, LayerProps } from "@react-leaflet/core";
import { ReactNode } from "react";
import { toQuadKey } from "./utils.ts";

interface FreezeProps extends LayerProps {
  children?: ReactNode;
  opacity: number;
}

class Freeze extends L.TileLayer {
  getTileUrl(coords: L.Coords) {
    const key = toQuadKey(coords.x, coords.y, coords.z);

    return `https://maps.fmglobal.com/v1/tiles/bing/OneHundredYearDailyMinTemp/${key}?apikey=58CF4769-FD86-43B9-B344-4DFA44609125`;
  }

  setOpacity(opacity: number) {
    this.options.opacity = opacity;

    return this;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createFreezeLayer = (props: FreezeProps, context: any) => {
  const instance = new Freeze("placeholder", { ...props });
  return { instance, context };
};

export const FreezeLayer = createLayerComponent(createFreezeLayer);
