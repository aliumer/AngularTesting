import { TestBed, inject } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController  } from "@angular/common/http/testing";
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service"

describe('HeroService', () => {
    let mockMessageService = jasmine.createSpyObj(['add']);
    let service: HeroService;

    // httpTestingController: we need a handle to mockHttpClientService so that we can adjust it and control it inside our test.
    let controller: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService}
            ]

        })
        controller = TestBed.inject(HttpTestingController);
        service = TestBed.inject(HeroService);
    })

    describe('getHero', () => {
        it('should call get with the correct URL', () => {
            service.getHero(4).subscribe(hero => {
                expect(hero.id).toBe(4);
            });
            const req = controller.expectOne('api/heroes/4');
            req.flush({id: 4, name: 'Super dude', strength: 100});
            expect(req.request.method).toBe('GET');
            controller.verify();
        })

        it('should call get with the correct URL', 
                inject([HeroService, HttpTestingController], 
                (service: HeroService, controller: HttpTestingController) => {

                    // don't need declare and instantiate the following controller and service in beforeEach using TestBed
                    // cause it will be injected with inject method.

                    // httpTestingController = TestBed.inject(HttpTestingController);
                    // service = TestBed.inject(HeroService);
            
                    // call the getHero method on the service
                    service.getHero(4).subscribe(hero => {
                        expect(hero.id).toBe(4);
                    });

                    // verify that it was call with correct url
                    const req = controller.expectOne('api/heroes/4');

                    req.flush({id: 4, name: 'Super dude', strength: 100});
                    expect(req.request.method).toBe('GET');
                    controller.verify();
        }))
    })
})

// 