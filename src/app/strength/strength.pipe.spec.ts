import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {

    it('should display week if the strength is less than 5', () => {
        // Arrange
        let pipe = new StrengthPipe();
        // Act 
        let value = pipe.transform(5);
        // Assert
        expect(value).toEqual('5 (weak)');
    });

    it('should display strong if the strength is 10', () => {
        // Arrange
        let pipe = new StrengthPipe();
        // Act 
        let value = pipe.transform(10);
        // Assert
        expect(value).toEqual('10 (strong)');
    });

    it('should display strong if the strength more than 20', () => {
        // Arrange
        let pipe = new StrengthPipe();
        // Act 
        let value = pipe.transform(20);
        // Assert
        expect(value).toEqual('20 (unbelievable)');
    });

})