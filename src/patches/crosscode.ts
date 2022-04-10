// @ts-expect-error It doesn't *actually* exist in-game, so we have to assign it.
sc.START_MODE.EXPLORE = 32789;

// Add our own start mode to the post-parallax transition callback
sc.CrossCode.inject({
  transitionEnded() {
    if (
      sc.model.currentSubState === sc.GAME_MODEL_SUBSTATE.NEWGAME &&
      this._startMode === sc.START_MODE.EXPLORE
    ) {
      this.teleport!('Playground', new ig.TeleportPosition('main'), 'NEW');
    } else {
      // @ts-expect-error `parent` always exists...
      this.parent();
    }
  },
});
