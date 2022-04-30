// @ts-expect-error It doesn't *actually* exist in-game, so we have to assign it.
sc.MAP_EVENT.MAP_CHANGED = Math.max(...Object.values(sc.MAP_EVENT)) + 1;

// Dynamic™️ additional menu states
sc.MenuModel.inject({
  additionalStates: null,
  additionalStateGets: null,
  additionalStateSets: null,
  init() {
    this.parent();
    this.additionalStates = {};
    this.additionalStateGets = {};
    this.additionalStateSets = {};
  },

  registerAdditionalState(stateName, get, set, initialValue) {
    this.additionalStates[stateName] = initialValue;
    this.additionalStateGets[stateName] = get;
    this.additionalStateSets[stateName] = set;
  },

  getAS(key) {
    return this.additionalStateGets[key]
      ? this.additionalStateGets[key]?.()
      : this.additionalStates[key];
  },

  setAS(key, value) {
    if (this.additionalStateSets[key]) {
      this.additionalStateSets[key]?.(key);
    } else {
      this.additionalStates[key] = value;
    }
  },
});
