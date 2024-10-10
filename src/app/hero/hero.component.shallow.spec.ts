import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
describe('HeroComponent (shallow tests)', () => {

    let fixture: ComponentFixture<HeroComponent>;
    // to test both comp and its template we need to use test bed and configure module for the component

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ HeroComponent ],
            schemas: [NO_ERRORS_SCHEMA]
            // NO_ERRORS_SCHEMA (Don't try to validate the template)
        });
        fixture = TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = { id: 1, name: 'Super dude', strength: 3};
        expect(fixture.componentInstance.hero.name).toEqual('Super dude');
    })

    it('should render hero name in an anchor tag', () => {
        fixture.componentInstance.hero = { id: 1, name: 'Super dude', strength: 3};
        fixture.detectChanges();
        let deA = fixture.debugElement.query(By.css('a'));
        expect(deA.nativeElement.textContent).toContain('Super dude');
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super dude');
    })
})