export {};

declare global {
  namespace ig {
    interface GuiElementBase {
      insertChildGui(this: this, guiElement: ig.GuiElementBase, index: number): void;
    }
  }

  namespace sc {
    interface MapWorldMap extends ig.GuiElementBase {
      cursor: sc.MapCursor;

      switcher: sc.TextCarousel;
      customMapIndex: string;
      customMaps: Record<string, ig.Image>;
      areaGuis: ig.GuiElementBase[];

      show(this: this): void;
      _addAreas(this: this): void;
      onMapSwitch(this: this, index: number): void;
      _addAreaButton(this: this, key: string, area: sc.MapModel.Area): sc.AreaButton;
    }

    interface CustomWorldMapExtra extends ig.GuiElementBase {
      image: ig.ImageGui;
      overlay: ig.ImageGui;
      gfx: ig.Image;
    }
    interface CustomWorldMapExtraConstructor extends ImpactClass<CustomWorldMapExtra> {
      new (areaData: MapModel.Area, showOverlay: boolean): CustomWorldMapExtra;
    }
    let CustomWorldMapExtra: CustomWorldMapExtraConstructor;

    namespace MapModel {
      interface AltImage {
        src: string;
        srcX: number;
        srcY: number;
        x: number;
        y: number;
        w: number;
        h: number;
        skipOverlay: boolean;
        positioning?: "absolute" | "relative";
      }

      interface Area {
        condition?: string;
        customMap?: string;
        altImg?: MapModel.AltImage;
      }
    }

    interface MapCursor extends ig.GuiElementBase {
      unfocus(this: this): void;
    }
    interface MapCursorConstructor extends ImpactClass<MapCursor> {
      new (worldmap: boolean): sc.MapCursor;
    }
    let MapCursor: MapCursorConstructor
  }
}
