// level.enum.ts
export enum Level {
  LEVEL_1_AWARENESS = 1,
  LEVEL_2_FOUNDATION = 2,
  LEVEL_3_APPLICATION = 3,
  LEVEL_4_INTEGRATION = 4,
  LEVEL_5_INNOVATION = 5,
  LEVEL_6_LEADERSHIP = 6,
  LEVEL_7_MASTERY = 7,
}

export function getLevelNumber(levelName: string): number | undefined {
  if (levelName in Level) {
    return Level[levelName as keyof typeof Level] as number;
  }
  return undefined;
}
