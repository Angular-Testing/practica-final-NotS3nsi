import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Launch } from 'src/app/models/launch';
import { LAUNCHES } from 'tests/assets/launches';
import { LaunchCardComponent } from './launch-card.component';

@Component({
  template: `<ab-launch-card
    [launch]="launch"
    [allowAddToFavorites]="allowAddToFavorites"
    [allowRemoveFromFavorites]="allowRemoveFromFavorites"
    (addToFavorites)="addToFavorites($event)"
    (removeFromFavorites)="removeFromFavorites($event)"
  ></ab-launch-card>`,
})
class LaunchCardHostComponent {
  public launch!: Launch;
  public allowAddToFavorites = false;
  public allowRemoveFromFavorites = false;
  constructor() {}

  public addToFavorites(slug: string) {}
  public removeFromFavorites(slug: string) {}
}

describe('GIVEN the LaunchCardComponent on a Host component', () => {
  // arrange
  let hostComponent: LaunchCardHostComponent;
  let hostFixture: ComponentFixture<LaunchCardHostComponent>;

  // selectors
  let addFavSelector = '[data-testid="add-fav-button"]';
  let removeFavSelector = '[data-testid="remove-fav-button"]';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaunchCardComponent, LaunchCardHostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(LaunchCardHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  describe('WHEN receives an input launch', () => {
    beforeEach(() => {
      hostComponent.launch = LAUNCHES[0];
      hostFixture.detectChanges();
    });
    it('THEN should display the launch name', () => {
      const actual = hostFixture.nativeElement.querySelector('#launch-name').textContent;
      const expected = 'LaunchName';
      expect(actual).toBe(expected);
    });
  });

  describe('WHEN receives an input allowAddToFavorites to true', () => {
    beforeEach(() => {
      hostComponent.launch = LAUNCHES[0];
      hostComponent.allowAddToFavorites = true;
      hostFixture.detectChanges();
    });
    it('THEN should display the `Add to favorites` button', () => {
      const actual = hostFixture.nativeElement.querySelector(addFavSelector);
      expect(actual).toBeTruthy();
    });
  });

  describe('WHEN receives an input allowRemoveFromFavorites to true', () => {
    beforeEach(() => {
      hostComponent.launch = LAUNCHES[0];
      hostComponent.allowRemoveFromFavorites = true;
      hostFixture.detectChanges();
    });
    it('THEN should display the `Remove from favorites` button', () => {
      const actual = hostFixture.nativeElement.querySelector(removeFavSelector);
      expect(actual).toBeTruthy();
    });
  });

  describe('WHEN user clicks on the button to add to favorites', () => {
    beforeEach(() => {
      spyOn(hostComponent, 'addToFavorites');
      hostComponent.launch = LAUNCHES[0];
      hostComponent.allowAddToFavorites = true;
      hostFixture.detectChanges();
      // Act
      hostFixture.nativeElement.querySelector(addFavSelector).click();
    });
    it('THEN should emit the addToFavorites event with the correct launch slug', () => {
      const expected = 'LaunchSlug'
      expect(hostComponent.addToFavorites).toHaveBeenCalledWith(expected)
    });
  });

  describe('WHEN user clicks on the button to remove from favorites', () => {
    beforeEach(() => {
      spyOn(hostComponent, 'removeFromFavorites');
      hostComponent.launch = LAUNCHES[0];
      hostComponent.allowRemoveFromFavorites = true;
      hostFixture.detectChanges();
      // Act
      hostFixture.nativeElement.querySelector(removeFavSelector).click();
    });
    it('THEN should emit the removeFromFavorites event with the correct launch slug', () => {
      const expected = 'LaunchSlug'
      expect(hostComponent.removeFromFavorites).toHaveBeenCalledWith(expected)
    });
  });
});
