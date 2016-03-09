import {
  it,
  describe,
  fdescribe,
  expect,
  inject,
  injectAsync,
  fakeAsync,
  tick,
  afterEach,
  beforeEachProviders,
  TestComponentBuilder,
  ComponentFixture,
} from 'angular2/testing';
import { dispatchEvent } from 'angular2/testing_internal';
import { By } from 'angular2/platform/browser';

import { TagFormComponent } from '../app/tag-form';

describe('TagForm', () => {
  var _console;
  var fakeConsole;
  var el, input, form;

  beforeEach(() => {
    fakeConsole = {};
    fakeConsole._logs = [];
    fakeConsole.log = (...theArgs) => fakeConsole._logs.push(theArgs.join(' '));

    _console = window.console;
    window.console = fakeConsole;
  });

  afterAll(() => window.console = _console);

  function createComponent(tcb: TestComponentBuilder): Promise<ComponentFixture> {
    return tcb.createAsync(TagFormComponent).then((fixture) => {
      el = fixture.debugElement.nativeElement;
      input = fixture.debugElement.query(By.css("input")).nativeElement;
      form = fixture.debugElement.query(By.css("form")).nativeElement;

      fixture.detectChanges();

      return fixture;
    });
  }

  it('logs the submitted value', inject([TestComponentBuilder],
    fakeAsync((tcb) => {
      createComponent(tcb).then((fixture) => {

        input.value = '1000045';
        dispatchEvent(input, 'input');
        fixture.detectChanges();
        tick();

        fixture.detectChanges();
        dispatchEvent(form, 'submit');
        tick();

        expect(fakeConsole._logs).toContain('you submitted value: [object Object]');
      });
    })
  ));
});
