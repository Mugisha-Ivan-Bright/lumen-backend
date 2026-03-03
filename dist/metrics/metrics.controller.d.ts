import { MetricsService } from './metrics.service';
export declare class MetricsController {
    private readonly metricsService;
    constructor(metricsService: MetricsService);
    getUserStats(id: number): Promise<{
        userId: number;
        total_projects: number;
        total_skills: number;
        total_advisories: number;
    }>;
}
//# sourceMappingURL=metrics.controller.d.ts.map