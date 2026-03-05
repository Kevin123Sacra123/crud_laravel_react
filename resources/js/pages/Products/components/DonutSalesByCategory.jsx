export default function DonutSalesByCategory({ products }) {
  const salesByCategory = {};

  // 1. Agrupar ventas por categoría (S/)
  products.forEach(p => {
    const revenue = p.precio * p.sales;
    salesByCategory[p.categorias] =
      (salesByCategory[p.categorias] || 0) + revenue;
  });

  // 2. Total vendido
  const totalSales = Object.values(salesByCategory)
    .reduce((a, b) => a + b, 0);

  const radius = 60;
  const stroke = 15;
  const circumference = 2 * Math.PI * radius;

  const colors = ["#4CAF50", "#FF9800", "#2196F3", "#E91E63"];

  return (
    <div className="flex gap-8 flex-wrap" >
      {Object.entries(salesByCategory).map(
        ([categorias, sales], index) => {
          const percentage =
            totalSales > 0
              ? Math.round((sales / totalSales) * 100)
              : 0;

          const dash = (percentage / 100) * circumference;

          return (
            <div key={categorias} className="text-center" >
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

                {/* Porcentaje */}
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
              <p>S/ {sales.toFixed(2)}</p>
            </div>
          );
        }
      )}
    </div>
  );
}