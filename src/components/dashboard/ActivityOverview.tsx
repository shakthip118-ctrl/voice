import DentalHealthOverview from "./DentalHealthOverview";
import NextAppointment from "./NextAppointment";

/**
 * Renders a responsive activity overview grid containing dental health and next-appointment widgets.
 *
 * @returns A div element with grid layout classes that contains the `DentalHealthOverview` and `NextAppointment` components.
 */
function ActivityOverview() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <DentalHealthOverview />
      <NextAppointment />
    </div>
  );
}
export default ActivityOverview;