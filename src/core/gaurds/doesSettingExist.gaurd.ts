import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { SettingService } from 'src/services/setting.service';

@Injectable()
export class DoesSettingNameExist implements CanActivate {
    constructor(private readonly settingService: SettingService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const userExist = await this.settingService.findOneByAccountAndName(request.body.account_id, request.body.name);
        if (userExist) {
            throw new ForbiddenException('This setting already exists on this account');
        }
        return true;
    }
}

@Injectable()
export class CanSettingBeDeleted implements CanActivate {
    constructor(private readonly settingService: SettingService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const setting = await this.settingService.findOneByAccountAndName(request.body.account_id, request.body.name);

        if(!setting) {
            throw new ForbiddenException('This setting doesn\'t exist on this account');
        }

        if (setting.deletedAt) {
            throw new ForbiddenException('This setting has already been deleted');
        }
        return true;
    }
}