import '../ui/components/map-switcher.js';

const dlcAreas = {
  beach: {
      x: 227,
      y: 262,
      w: 29,
      h: 22,
      sx: 0,
      sy: 0
  },
  "final-dng": {
      x: 45,
      y: 74,
      w: 31,
      h: 51,
      sx: 58,
      sy: 0
  }
}

sc.MapWorldMap.inject({
  switcher: null,
  // TODO: Use an indexing system that isn't hardcoded
  customMaps: {
    explore: new ig.Image("media/gui/world-maps/explore.png")
  },
  // ...also possibly make this global? 
  customMapIndex: "croissant",
  areaGuis: [],

  init() {
    
    this.parent();
    this.switcher = new sc.TextCarousel('sc.gui.menu.world.page', ['croissant', 'explore']);
    
    this.switcher.setAlign(ig.GUI_ALIGN.X_RIGHT, ig.GUI_ALIGN.Y_TOP);
    this.switcher.setPos(25, 27);
    this.switcher.onChange = this.onMapSwitch.bind(this)
    
    this.addChildGui(this.switcher);
  },
  show() {
    this.parent();
    this.switcher.show();
  },

  onMapSwitch(index) {
    // TODO: in the future, make this not be hardcoded
    this.customMapIndex = index === 0 ? "croissant" : "explore";
    this._addAreas();
  },

  updateDrawables(a) {
    if (this.customMapIndex === "croissant") this.parent(a);
    else a.addGfx(this.customMaps[this.customMapIndex], 0, 0, 0, 0, this.hook.size.x, this.hook.size.y)
  },

  // unfortunately, i don't think there is any better way to handle this.
  // copying vanilla code is bad practice, but it seems unavoidable unless you want
  // to do *very* messy things
  _addAreas() {
    let areaList = sc.map.areas;
    let gui: ig.GuiElementBase;
    
    for(const areaIcon of this.areaGuis) {
      this.removeChildGui(areaIcon)
    }
    this.areaGuis.length = 0;

    // in the future, perhaps some way of allowing custom maps to add "map extensions"
    // of their own. but for now, just hardcoding the DLC ones as vanilla does.
    if(this.customMapIndex === "croissant") {
      for(const key in dlcAreas) {
        if (sc.map.getVisitedArea(key)) {
          if (ig.vars.get(`menu.circuit.start.${key}`)) {
            gui = new sc.WorldMapExtra(key, false);
          } else {
            ig.vars.set(`menu.circuit.start.${key}`, true); 
            gui = new sc.WorldMapExtra(key, true);
          }
          this.addChildGui(gui);
          this.areaGuis.push(gui)
        }
      }
    }

    for(const key in areaList) {
      let area = areaList[key]
      if ((!area.condition || (new ig.VarCondition(area.condition)).evaluate()) 
        && sc.map.getVisitedArea(key)
        // assume that a map is by default supposed to be on the croissant
        && (area.customMap || "croissant") === this.customMapIndex
      ) {
        gui = this._addAreaButton(key, area);
        this.addChildGui(gui);
        this.areaGuis.push(gui);
      }
    }
  }
});
