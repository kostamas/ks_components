import { MultipleSelectModule } from './multiple-select.module';

describe('MultipleSelectModule', () => {
  let multipleSelectModule: MultipleSelectModule;

  beforeEach(() => {
    multipleSelectModule = new MultipleSelectModule();
  });

  it('should create an instance', () => {
    expect(multipleSelectModule).toBeTruthy();
  });
});
