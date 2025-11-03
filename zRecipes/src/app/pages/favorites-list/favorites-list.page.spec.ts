import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesListPage } from './favorites-list.page';

describe('FavoritesListPage', () => {
  let component: FavoritesListPage;
  let fixture: ComponentFixture<FavoritesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
