import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { HeroService } from "../hero.service";
import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";


@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;
    onClick() {
        console.log('calling::', this.linkParams);
        this.navigatedTo = this.linkParams;
    }
}


describe('HeroesComponent (Deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    let HEROES;

    beforeEach(()=>{
        HEROES = [
            { id: 1, name: 'Mr. Nice', strength: 10 },
            { id: 2, name: 'Narco', strength: 5 },
            { id: 3, name: 'Bombasto', strength: 8 },
        ]
         TestBed.configureTestingModule({
            declarations: [
                HeroesComponent, 
                HeroComponent, 
                RouterLinkDirectiveStub
            ],
            providers: [ 
                // long hand provider syntax
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
         })

         mockHeroService.getHeroes.and.returnValue(of(HEROES));
         fixture = TestBed.createComponent(HeroesComponent);
         fixture.detectChanges();

    })

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    })

    it('should render each hero as a hero component', () => {
        // run ngOninit
        fixture.detectChanges();
        const childComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(childComponents.length).toBe(3);
        for(let i=0; i < childComponents.length; i++) {
            expect(childComponents[i].componentInstance.hero).toBe(HEROES[i]);
        }
    })

    it(`should call heroService deleteHero method when the hero component's delete button is clicked.`, () => {
        spyOn(fixture.componentInstance, 'delete');
        // run ngOninit
        fixture.detectChanges();
        const childComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // childComponents[0].query(By.css('button'))
        //     .triggerEventHandler('click', { stopPropagation: () => {}})

        // or we can raise the click event from child component
        (<HeroComponent>childComponents[0].componentInstance).delete.emit(undefined);

        // or we can raise the click event from child component
        // childComponents[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

    it('should add a new hero in the hero list when the add button click', () => {
        // run ngOninit
        fixture.detectChanges();
        const newHeroName = 'Mr. Ice';
        let ourHero = { id: 1, name: newHeroName, strength: 10 };
        mockHeroService.addHero.and.returnValue(of(ourHero));
      
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
        inputElement.value = newHeroName;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent
        expect(heroText).toContain(newHeroName);
    })

    it('should have the correct route for the first hero', () => {
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        
        let routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    })

})