import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeInfoPage } from './recipe-info.page';

describe('RecipeInfoPage', () => {
  let component: RecipeInfoPage;
  let fixture: ComponentFixture<RecipeInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
