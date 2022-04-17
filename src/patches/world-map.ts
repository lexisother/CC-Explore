import '../ui/components/map-switcher.js';

sc.MapWorldMap.inject({
  switcher: null,
  init() {
    this.parent();
    this.switcher = new sc.TextCarousel('sc.gui.menu.world.page', ['croissant', 'explore']);
    this.addChildGui(this.switcher);
  },
  show() {
    this.parent();
    this.switcher.show();
  },
});
