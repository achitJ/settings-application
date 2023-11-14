import { CanActivate, ExecutionContext, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AccountService } from 'src/services/account.service';

@Injectable()
export class DoesAccountNameExist implements CanActivate {
    constructor(private readonly accountService: AccountService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const userExist = await this.accountService.findOneByName(request.body.name);
        if (userExist) {
            throw new ForbiddenException('This account name already exist');
        }
        return true;
    }
}

@Injectable()
export class DoesAccountIdExist implements CanActivate {
    constructor(private readonly accountService: AccountService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        let account_id;

        if(
            request.method == 'POST' || 
            request.method == 'PATCH' || 
            request.method == 'DELETE'
        ) {
            account_id = request.body.account_id;
        } else if(request.method == 'GET') {
            account_id = request.params.account_id;
        } else {
            throw new ForbiddenException('This request method is not allowed');
        }

        const userExist = await this.accountService.findOneById(account_id);
        if (!userExist) {
            throw new NotFoundException('This account id doesn\'t exist');
        }

        if(userExist.id !== request.user.account_id) {
            throw new ForbiddenException('You are not authorized to perform the operation');
        }

        return true;
    }
}