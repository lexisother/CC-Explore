import '../ui/components/map-switcher.js';
import '../ui/components/text-carousel.js';

sc.CUSTOM_WORLD_MAPS = {
  explore: new ig.Image("media/gui/world-maps/explore.png")
}


sc.MapWorldMap.inject({
  switcher: null,
  customMapIndex: "croissant",
  areaGuis: [],
  customMaps: [],

  init() {
    this.parent();
    sc.map.getUnlockedAreas().forEach(area => {
      let map = sc.map.areas[area].customMap || "croissant";
      if(!this.customMaps.includes(map)) this.customMaps.push(map)
    })

    let currentMap = sc.map.areas[sc.map.currentArea.path].customMap || "croissant"
    this.customMapIndex = currentMap;

    if(this.customMaps.length > 1) {
      this.switcher = new sc.TextCarousel('sc.gui.menu.world.page', this.customMaps);
  
      this.switcher.setAlign(ig.GUI_ALIGN.X_RIGHT, ig.GUI_ALIGN.Y_TOP);
      this.switcher.setPos(25, 27);
      this.switcher.onChange = this.onMapSwitch.bind(this);

      this.switcher.updateStatusPage(this.customMaps.indexOf(currentMap))

      this.addChildGui(this.switcher);
    }
    this._addAreas();
  },

  show() {
    this.parent();
    this.switcher?.show();
  },

  onMapSwitch(index) {
    this.customMapIndex = this.customMaps[index];
    this._addAreas();
  },

  updateDrawables(a) {
    if (this.customMapIndex === "croissant") this.parent(a);
    else a.addGfx(sc.CUSTOM_WORLD_MAPS[this.customMapIndex], 0, 0, 0, 0, this.hook.size.x, this.hook.size.y)
  },

  // unfortunately, i don't think there is any better way to handle this.
  // copying vanilla code is bad practice, but it seems unavoidable unless you want
  // to do *very* messy things
  _addAreas() {
    let areaList = sc.map.areas;
    let gui: ig.GuiElementBase;
    
    this.cursor?.unfocus()

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
          let varString = (this.customMapIndex === "croissant") ? `menu.circuit.start.${key}` : `menu.map.${area.customMap}.${key}`, 
            showOverlay = false;
          if(!(area.altImg.skipOverlay || ig.vars.get(varString))) {
            showOverlay = true;
            ig.vars.set(varString, true);
          }

          gui = new sc.CustomWorldMapExtra(area, showOverlay);
          this.insertChildGui(gui, 0);
          this.areaGuis.push(gui)
        }

        gui = this._addAreaButton(key, area);
        this.insertChildGui(gui, 1);
        this.areaGuis.push(gui);
      }
    }
  }
});

sc.CustomWorldMapExtra = ig.GuiElementBase.extend({
  gfx: null,
  image: null,
  overlay: null,
  init(areaData, showOverlay) {
    this.parent();
    let imageData = areaData.altImg;
    if(!imageData) return;

    this.setSize(imageData.w, imageData.h);
    let {x, y} = imageData;
    if(imageData.positioning === "relative") {
      x += areaData.position.x;
      y += areaData.position.y;
    }
    this.setPos(x, y);
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