export {};

declare global {
  namespace sc {
    interface MapWorldMap extends ig.GuiElementBase {
      switcher: sc.TextCarousel;
      customMapIndex: string;
      customMaps: Record<string, ig.Image>;
      areaGuis: ig.GuiElementBase[];

      show(this: this): void;
      _addAreas(this: this): void;
      onMapSwitch(this: this, index: number): void;
      _addAreaButton(this: this, key: string, area: sc.MapModel.Area): sc.AreaButton;
    }

    interface WorldMapExtra extends ig.GuiElementBase {}
    interface WorldMapExtraConstructor extends ImpactClass<WorldMapExtra> {
      new (b: string, c: boolean): WorldMapExtra;
    }
    let WorldMapExtra: WorldMapExtraConstructor;

    namespace MapModel {
      interface Area {
        condition: string;
        customMap: string;
      }
    }
  }
}
