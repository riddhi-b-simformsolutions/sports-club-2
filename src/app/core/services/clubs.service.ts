// T018 — ClubsService
import { Injectable, signal } from '@angular/core';
import { Club } from '../models/club.model';
import { CLUBS_DATA } from '../data/clubs.data';

@Injectable({ providedIn: 'root' })
export class ClubsService {
  private readonly _clubs = signal<Club[]>(CLUBS_DATA);
  readonly clubs = this._clubs.asReadonly();

  getById(id: string): Club | undefined {
    return this._clubs().find((c) => c.id === id);
  }
}
