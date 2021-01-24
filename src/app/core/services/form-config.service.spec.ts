import { TestBed } from "@angular/core/testing";

import { FormConfigService } from "./form-config.service";

describe("InputConfigService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: FormConfigService = TestBed.get(FormConfigService);
    expect(service).toBeTruthy();
  });
});
