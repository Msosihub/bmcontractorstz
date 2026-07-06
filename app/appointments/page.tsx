/**
 * Appointment Page
 * ----------------
 * Future integration page for booking BM Contractors appointments.
 *
 * Planned uses:
 * - Site visits
 * - Installation appointments
 * - Maintenance visits
 * - Product consultation
 */

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-950 sm:px-6">
      <section className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-bold text-red-600">Appointments</p>
        <h1 className="mt-3 text-4xl font-black">Book an appointment</h1>
        <p className="mt-4 leading-7 text-slate-600">
          Appointment booking will be added here for site visits, installation
          scheduling, maintenance, and consultations.
        </p>
      </section>
    </main>
  );
}
