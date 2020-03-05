import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GroupService } from 'src/app/services/group.service';

@Injectable({
  providedIn: 'root'
})
export class AddMemberGuardGuard implements CanActivate {

  constructor(private groupService: GroupService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const groupRef = next.paramMap.get('ref');
    return this.groupService.addMember(groupRef)
      .pipe(
        map(group => this.router.createUrlTree(['groups', group.id])),
        catchError(err => {
          if (err.status === 404) {
            return of(true);
          }
          throw err;
        })
      );
  }

}
