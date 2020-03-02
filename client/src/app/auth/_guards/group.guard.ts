import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupService } from 'src/app/services/group.service';

@Injectable({
  providedIn: 'root'
})
export class GroupGuard implements CanActivateChild {

  constructor(private groupService: GroupService) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const groupId = +next.paramMap.get('groupId');
    return this.groupService.checkUserAccessToGroup(groupId).pipe(map(checks => checks.canAccess));
  }

}
