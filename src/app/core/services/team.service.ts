// T019 — TeamService
import { Injectable, signal } from '@angular/core';
import { TeamMember } from '../models/team.model';
import { TEAM_DATA } from '../data/team.data';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly _team = signal<TeamMember[]>(TEAM_DATA);
  readonly team = this._team.asReadonly();
}
