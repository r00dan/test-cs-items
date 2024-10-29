import { injectable } from "inversify";

@injectable()
export class HealthService {
  constructor() {}

  public checkHealth() {
    return { status: "ok", code: 200 };
  }
}
