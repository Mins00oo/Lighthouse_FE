import { CONFIG } from 'src/global-config';

import { MonitoringDashboardView } from 'src/sections/monitoring/view';

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function OverviewAppPage() {
  return (
    <>
      <title>{metadata.title}</title>

      <MonitoringDashboardView />
    </>
  );
}
