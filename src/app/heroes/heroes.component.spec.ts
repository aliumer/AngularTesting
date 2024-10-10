import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent', () => {
     
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'Mr. Nice', strength: 10 },
            { id: 2, name: 'Narco', strength: 5 },
            { id: 3, name: 'Bombasto', strength: 8 },
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService);
        component.heroes = HEROES;
        console.log(component.heroes);
    });

    describe('delete', () => {

        it('should remove the indicated hero from the heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(2);
        })

        // interaction test
        it('should call deleteHero from service', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            
            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);

        })

        // check we are subscribing to the result of the delete hero call.
      
    })
    


})