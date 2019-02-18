export interface IGetAvsRequest {
  start: number;
  end: number;
  userId: string;
  isTrainerView: TrainerView;
}

export enum TrainerView {
  TRUE = 'true',
  FALSE = 'false'
}
