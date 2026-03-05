export default function DonutCategoryChart({ products }) {
  // Agrupar por categoría
  const categories = {};

  products.forEach(p => {
    categories[p.categorias] = (categories[p.categorias] || 0) + 1;
  });

  const total = products.length;

  const radius = 60;
  const stroke = 15;
  const circumference = 2 * Math.PI * radius;

  const colors = ["#4CAF50", "#FF9800", "#2196F3", "#E91E63"];

  let offset = 0;

  return (
    <div className="flex gap-8 flex-wrap" >
      {Object.entries(categories).map(([categorias, count], index) => {
        const percentage = Math.round((count / total) * 100);
        const dash = (percentage / 100) * circumference;

        return (
          <div className="text-center"  key={categorias} >
            <svg width="160" height="160">
              {/* Fondo */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#eee"
                strokeWidth={stroke}
              />

              {/* Dona */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={colors[index % colors.length]}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circumference}`}
                strokeDashoffset="0"
                transform="rotate(-90 80 80)"
              />

              {/* Texto central */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="20"
                fontWeight="bold"
              >
                {percentage}%
              </text>
            </svg>

            <strong>{categorias}</strong>
            <p>{count} productos</p>
          </div>
        );
      })}
    </div>
  );
}