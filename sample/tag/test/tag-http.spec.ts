import {provide} from 'angular2/core';
import {
  it,
  describe,
  expect,
  inject,
  injectAsync,
  afterEach,
  beforeEachProviders,
  TestComponentBuilder,
} from 'angular2/testing';
import {MockBackend} from 'angular2/http/testing';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestMethod,
} from 'angular2/http';

import { TagHTTPRequests } from '../app/components/tag-http';

beforeEachProviders(() => {
  return [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
    }, deps: [MockBackend, BaseRequestOptions]}),
  ]
});

describe('TagHTTPRequests', () => {

  it('get',
    injectAsync([TestComponentBuilder, MockBackend], (tcb, backend) => {
      return tcb.createAsync(TagHTTPRequests).then((fixture) => {
        let comp = fixture.debugElement.componentInstance;

        backend.connections.subscribe(c => {
          c.mockRespond(new Response(<any>{body: '{"status": "bad"}'}));
        });

        comp.getFields();
        expect(comp.data).toEqual({'status': 'ok'});
      });
    })
  );
});
