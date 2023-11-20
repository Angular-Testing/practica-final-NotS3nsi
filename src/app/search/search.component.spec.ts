import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { SpaceService } from '../core/space.service';
import { Launch } from '../models/launch';
import { SearchComponent } from './search.component';
import { setValue, findNativeEl } from '../../../tests/utils/forms';

describe('GIVEN the SearchComponent form', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  type searchMethod = { getSearchedLaunches$: Observable<Launch[]> };
  let spaceServiceSpy: jasmine.SpyObj<searchMethod>;

  // input data
  const inputSearchTerm = 'Falcon';
  const inputNumberOfLaunches = '7';
  // selectors
  const searchTermSelector = 'input[name="searchTerm"]';
  const numberOfLaunchesSelector = 'input[name="numberOfLaunches"]';
  const submitSelector = 'button[type="submit"]';

  beforeEach(async () => {
    spaceServiceSpy = jasmine.createSpyObj<searchMethod>('SpaceService', {
      getSearchedLaunches$: of([]),
    });

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [SearchComponent],
      providers: [{ provide: SpaceService, useValue: spaceServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('WHEN user submits the form after fill it', () => {
    beforeEach(async () => {
      // Act
      setValue(fixture, searchTermSelector, inputSearchTerm);
      setValue(fixture, numberOfLaunchesSelector, inputNumberOfLaunches);

      const submitButton = findNativeEl(fixture, submitSelector);
      submitButton?.click();
      fixture.detectChanges();
    });

    it('THEN should call expected method with the correct arguments', () => {
      const expected = {
        searchTerm: inputSearchTerm,
        limit: Number(inputNumberOfLaunches),
      };
      expect(spaceServiceSpy.getSearchedLaunches$).toHaveBeenCalledWith(expected);
    });
  });
});
