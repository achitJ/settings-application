import { Setting } from "src/entities/setting.entity";
import { SETTING_REPOSITORY } from "src/core/constants";

export const settingProvider = [
    {
        provide: SETTING_REPOSITORY,
        useValue: Setting,
    },
];