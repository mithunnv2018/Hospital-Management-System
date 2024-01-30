import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { HomeModule } from './home.module';

export function main() {
   describe('Home component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [HomeModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let homeDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(homeDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-home></sd-home>'
})
class TestComponent {}
