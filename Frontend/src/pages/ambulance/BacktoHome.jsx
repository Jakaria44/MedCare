import L from "leaflet";
import { useEffect } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import "./back-to-home-button.css";

const BacktoHome = ({ center }) => {
  const map = useMap();
  useMapEvent({
    dragend() {
      const { lat: latD, lng: lngD } = map.getCenter();
      const { lat, lng } = map.getCenter();

      const tolerance = 1e-5; // Define a small tolerance value for comparison

      const checkEqualCoordinates =
        Math.abs(lat - latD.toFixed(5) * 1) < tolerance &&
        Math.abs(lng - lngD.toFixed(5) * 1) < tolerance;

      document.body.classList[checkEqualCoordinates ? "add" : "remove"](
        "show-button-home"
      );
    },
  });

  useEffect(() => {
    if (!map) return;

    const customControler = L.Control.extend({
      options: {
        position: "topleft",
      },

      onAdd: function () {
        const btn = L.DomUtil.create("button", "back-to-home");
        btn.title = "pooooooooooooop rotation";
        btn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.451L16 6.031 0 18.451v-5.064L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z"></path></svg>';

        btn.onclick = function () {
          map.flyToBounds([center]);
          document.body.classList.remove("show-button-home");
        };

        return btn;
      },
    });

    map.addControl(new customControler());
  }, [map]);

  return null;
};
export default BacktoHome;
