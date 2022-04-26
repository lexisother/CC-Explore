import '../ui/components/map-switcher.js';

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

    for(const key in areaList) {
      let area = areaList[key]
      if ((!area.condition || (new ig.VarCondition(area.condition)).evaluate()) 
        && sc.map.getVisitedArea(key)
        // assume that a map is by default supposed to be on the croissant
        && (area.customMap || "croissant") === this.customMapIndex
      ) {
        if (area.altImg) {
          let varString = (this.customMapIndex === "croissant") ? `menu.circuit.start.${key}` : `menu.map.${area.customMap}.${key}.start`, 
            showOverlay = false;
          if(!(area.altImg.skipOverlay || ig.vars.get(varString))) {
            showOverlay = true;
            ig.vars.set(varString, true);
          }

          gui = new sc.CustomWorldMapExtra(area.altImg, showOverlay);
          this.addChildGui(gui);
          this.areaGuis.push(gui)
        }

        gui = this._addAreaButton(key, area);
        this.addChildGui(gui);
        this.areaGuis.push(gui);
      }
    }
  }
});

sc.CustomWorldMapExtra = ig.GuiElementBase.extend({
  gfx: null,
  image: null,
  overlay: null,
  init(imageData, showOverlay) {
    this.parent();
    this.setSize(imageData.w, imageData.h);
    this.setPos(imageData.x, imageData.y);
    this.gfx = new ig.Image(imageData.src);

    this.image = new ig.ImageGui(this.gfx, imageData.srcX, imageData.srcY, imageData.w, imageData.h);
    this.image.hook.transitions = {
      DEFAULT: {
        state: {},
        time: 0.2,
        timeFunction: KEY_SPLINES.LINEAR
      },
      HIDDEN: {
        state: {
            alpha: 0
        },
        time: 0.2,
        timeFunction: KEY_SPLINES.LINEAR
      }
    };
    this.addChildGui(this.image);
    if (showOverlay) {
      this.overlay = new ig.ImageGui(this.gfx, imageData.srcX + imageData.w, imageData.srcY, imageData.w, imageData.h);
      this.overlay.renderMode = "lighter";
      this.overlay.hook.transitions = {
        DEFAULT: {
          state: {},
          time: 0.3,
          timeFunction: KEY_SPLINES.LINEAR
        },
        HIDDEN: {
          state: {
              alpha: 0
          },
          time: 0.5,
          timeFunction: KEY_SPLINES.LINEAR
        }
      };
      this.addChildGui(this.overlay);
      this.image.doStateTransition("HIDDEN", true);
      this.overlay.doStateTransition("HIDDEN", true);
      this.overlay.doStateTransition("DEFAULT", false, false, () => {
        this.image.doStateTransition("DEFAULT", true);
        this.overlay.doStateTransition("HIDDEN", false, false, null, 0.2)
      }, 0.4)
    }
  }
});