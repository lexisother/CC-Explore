import '../ui/components/map-switcher.js';

sc.MapWorldMap.inject({
  switcher: null,
  init() {
    this.parent();
    this.switcher = new sc.TextCarousel('sc.gui.menu.world.page', ['croissant', 'explore']);
    
    this.switcher.setAlign(ig.GUI_ALIGN.X_RIGHT, ig.GUI_ALIGN.Y_TOP);
    this.switcher.setPos(25, 27);

    this.addChildGui(this.switcher);
  },
  show() {
    this.parent();
    this.switcher.show();
  },
});
