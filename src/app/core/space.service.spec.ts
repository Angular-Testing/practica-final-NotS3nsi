import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SpaceService } from './space.service';

describe('GIVEN the SpaceService isolated from remote server', () => {
  let service: SpaceService;
  let controller: HttpTestingController;

  const baseUrl = 'https://lldev.thespacedevs.com/2.0.0/launch/upcoming/';

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule],
      providers: [SpaceService],
    });
    service = TestBed.inject(SpaceService);
    controller = TestBed.inject(HttpTestingController);
  });

  describe('WHEN getUpcomingLaunches$ is called without arguments', () => {
    // let testRequest: TestRequest;
    beforeEach(() => {
      service.getUpcomingLaunches$().subscribe();
    });
    it('THEN should make a GET request to the correct URL', () => {
      const expected = `${baseUrl}?limit=10&mode=list`;
      controller.expectOne(r => {
        return r.url === expected && r.method === 'GET';
      });
      // Alternativa:
      // testRequest = controller.expectOne(expected);
      // expect(testRequest.request.method).toBe('GET');
    });
  });
  describe('WHEN getUpcomingLaunches$ is called with an argument', () => {
    // let testRequest: TestRequest;
    const input = 4;
    beforeEach(() => {
      service.getUpcomingLaunches$(input).subscribe();
    });
    it('THEN should make a GET request to the correct URL with the provided argument', () => {
      const expected = `${baseUrl}?limit=${input}&mode=list`;
      controller.expectOne(r => {
        return r.url === expected && r.method === 'GET';
      });
      // Alternativa:
      // testRequest = controller.expectOne(expected);
      // expect(testRequest.request.method).toBe('GET');
    });
  });
});
