import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { HeroService } from "../hero.service";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('HeroesComponent (Shallow tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    let HEROES;
    @Component({
        selector: 'app-hero',
        template: '<div></div>'

    }) class fakeHeroComponent {
        @Input() hero: Hero
    }
    beforeEach(()=>{
        HEROES = [
            { id: 1, name: 'Mr. Nice', strength: 10 },
            { id: 2, name: 'Narco', strength: 5 },
            { id: 3, name: 'Bombasto', strength: 8 },
        ]
         TestBed.configureTestingModule({
            declarations: [HeroesComponent, fakeHeroComponent],
            providers: [ 
                // long hand provider syntax
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
         })
         fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should create the component', () => {
        expect(fixture.componentInstance).toBeTruthy();
    })

    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        // in order to fire up the ngOnInit we have to run the change detection. 
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    it('should create one li item for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        // in order to fire up the ngOnInit we have to run the change detection. 
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
})