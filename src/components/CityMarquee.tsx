const cities = [
  "Nairobi", "Kampala", "Accra", "Lagos", "Kigali",
  "Dar es Salaam", "Addis Ababa", "Lusaka", "Dakar",
  "Johannesburg", "Maputo", "Kinshasa", "Abidjan", "Douala",
];

const CityMarquee = ({ large = false }: { large?: boolean }) => {
  const textClass = large
    ? "text-lg md:text-xl font-display font-medium"
    : "text-sm font-body";

  return (
    <div className="overflow-hidden whitespace-nowrap" aria-hidden="true">
      <div className="animate-marquee inline-flex">
        {[...cities, ...cities].map((city, i) => (
          <span key={i} className={`${textClass} mx-4 md:mx-6 opacity-40`}>
            {city} ·
          </span>
        ))}
      </div>
    </div>
  );
};

export default CityMarquee;
