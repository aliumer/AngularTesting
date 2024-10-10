import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from "@angular/core/testing"
import { HeroDetailComponent } from "./hero-detail.component"
import { HeroService } from "../hero.service";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {

    let mockHeroService, mockActivatedRoute, mockLocation;
    let fixture: ComponentFixture<HeroDetailComponent>;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => { return '3' } } }
        }

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        })
        mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'Super dude', strength: 11 }));
        fixture = TestBed.createComponent(HeroDetailComponent);
    })

    it('should render hero name in h2 tag', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toContain('SUPER DUDE');
    })

    // it('should call updateHero when save is called', fakeAsync(() => {

    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
    //     // tick(250);
    //     flush();
    //     expect(mockHeroService.updateHero).toHaveBeenCalled();

    // }))

    it('should call updateHero when save is called', waitForAsync(() => {

        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();
        
        fixture.componentInstance.save();

        // when all the promises has been resolved
        // this is only for promises
        fixture.whenStable().then(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
        })

    }))
})