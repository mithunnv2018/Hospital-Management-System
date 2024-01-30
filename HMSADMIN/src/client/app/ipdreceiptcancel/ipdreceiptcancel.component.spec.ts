import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { IpdreceiptcancelModule } from './ipdreceiptcancel.module';

export function main() {
   describe('country component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [IpdreceiptcancelModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let countryDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(countryDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-ipdreceiptcancel></sd-ipdreceiptcancel>'
})
class TestComponent {}
