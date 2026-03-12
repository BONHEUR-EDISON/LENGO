//ue client";

export default function Newsletter() {
  return (
    <section className="mt-32 text-center py-20 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <h2 className="text-3xl font-bold">Recevez nos prochains articles</h2>
      <p className="mt-4 text-blue-100">Design, technologie et innovation directement dans votre inbox.</p>
      <div className="mt-8 flex justify-center gap-3">
        <input
          type="email"
          placeholder="Votre email"
          className="px-4 py-3 rounded-lg text-black w-64"
        />
        <button className="px-6 py-3 bg-black rounded-lg hover:bg-gray-900 transition">S'inscrire</button>
      </div>
    </section>
  );
}