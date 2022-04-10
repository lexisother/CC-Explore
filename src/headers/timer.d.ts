export {};

declare global {
  namespace ig {
    interface WeightTimer {
      actualTick: boolean;
      duration: number;
      mode: number;

      tick(): void;
      get(): number;
    }
    interface WeightTimerConstructor extends ImpactClass<WeightTimer> {
      new (actualTick: boolean, duration: number, mode: number): WeightTimer;
    }
    let WeightTimer: WeightTimerConstructor;
  }
}
