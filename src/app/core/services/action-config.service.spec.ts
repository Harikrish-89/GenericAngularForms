import { TestBed } from "@angular/core/testing";

import { ActionConfigService } from "./action-config.service";

describe("ActionConfigService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ActionConfigService = TestBed.get(ActionConfigService);
    expect(service).toBeTruthy();
  });
});
