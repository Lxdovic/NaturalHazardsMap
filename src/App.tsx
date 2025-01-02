import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { EarthquakeLayer } from "./EarthquakeLayer.ts";
import { FreezeLayer } from "./FreezeLayer.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

const position: LatLngExpression = [51.505, -0.09];

enum Tile {
  Population = "Population",
  Freeze = "Freeze",
  Earthquake = "Earthquake",
}

export const App = () => {
  const [selectedTile, setSelectedTile] = useState<Tile>(Tile.Population);

  return (
    <div className="relative w-screen h-screen flex">
      <div className=" absolute p-6 top-0 left-0 z-[401]">
        <Select onValueChange={(value) => setSelectedTile(value as Tile)}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>

          <SelectContent className="z-[401]">
            <SelectItem value={Tile.Population}>Population</SelectItem>
            <SelectItem value={Tile.Freeze}>Freeze</SelectItem>
            <SelectItem value={Tile.Earthquake}>Earthquake</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <MapContainer center={position} zoom={1} zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {selectedTile === "Population" && (
          <WMSTileLayer
            layers="gpw-v4:gpw-v4-population-count_2015"
            format="image/png"
            transparent={true}
            opacity={0.5}
            url="https://sedac.ciesin.columbia.edu/geoserver/wms"
          />
        )}
        {selectedTile === "Freeze" && <FreezeLayer opacity={0.5} />}
        {selectedTile === "Earthquake" && <EarthquakeLayer opacity={0.5} />}
      </MapContainer>
    </div>
  );
};
